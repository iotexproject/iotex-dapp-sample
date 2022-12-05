import { Account } from 'iotex-antenna/lib/account/account';
import { Envelop, SealedEnvelop } from 'iotex-antenna/lib/action/envelop';
import { SignerPlugin } from 'iotex-antenna/lib/action/method';
// @ts-ignore
import type Transport from '@ledgerhq/hw-transport';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
// @ts-ignore
import TransportWebHID from '@ledgerhq/hw-transport-webhid';

// add ledger dependencies
// pnpm i iotex-antenna @ledgerhq/hw-transport @ledgerhq/hw-transport-webusb @ledgerhq/hw-transport-webhid

const isWebHIDSupported = async (): Promise<boolean> => {
  return await TransportWebHID.isSupported();
};

export const createTransport = async (): Promise<Transport> => {
  try {
    if (await isWebHIDSupported()) {
      return await TransportWebHID.create();
    } else {
      return await TransportWebUSB.create();
    }
  } catch (e) {
    try {
      return await TransportWebUSB.create();
    } catch (eu) {
      console.log(`create WebUSB transport error ${eu}`);
      throw e;
    }
  }
};

export class LedgerPlugin implements SignerPlugin {
  public ledger: IoTeXApp;
  public initialed: boolean;
  private address: { returnCode: number; publicKey: string; address: string } | undefined;

  constructor(ledger: IoTeXApp) {
    this.ledger = ledger;
  }

  public async init() {
    if (!this.initialed) {
      const address = await this.ledger.getAddress("44'/304'/0'/0/0");
      if (address.returnCode != 0x9000) {
        throw new Error(`fetch address error ${address}`);
      }
      this.address = address;
      this.initialed = true;
    }
  }

  public async getAccounts(): Promise<Array<Account>> {
    if (!this.initialed) {
      throw new Error('plugin not initial');
    }
    // TODO how to process different path?
    const account = new Account();
    account.address = this.address!.address;
    return [account];
  }

  public async signOnly(envelop: Envelop): Promise<SealedEnvelop> {
    if (!this.initialed) {
      throw new Error('plugin not initial');
    }
    const signed = await this.ledger.signTransaction("44'/304'/0'/0/0", Buffer.from(envelop.bytestream()));
    if (signed.code !== 36864) {
      throw new Error(signed.message || 'ledger error');
    }
    return new SealedEnvelop(envelop, Buffer.from(this.address!.publicKey, 'hex'), signed.signature!);
  }
}

//@ts-ignore
import type Transport from '@ledgerhq/hw-transport';

import { publicKeyToAddress } from 'iotex-antenna/lib/crypto/crypto';
import { v4 as uuid } from 'uuid';

export class ConcurrentState<T> {
  value: T;
  pending = false;
  promiseHooks: { resolve: Function; reject: Function }[] = [];
  wait() {
    return new Promise<T>((resolve, reject) => {
      this.promiseHooks.push({
        resolve,
        reject
      });
    });
  }
  releaseLock(res?: T) {
    if (res) {
      this.value = res;
    }
    this.promiseHooks.forEach(({ resolve }) => {
      resolve(res);
    });
    this.pending = false;
  }
  releaseErrorLock(error: Error) {
    this.promiseHooks.forEach(({ reject }) => {
      reject(error);
    });
  }
  lock() {
    this.pending = true;
  }
}

export const splitPath = (path: string): number[] => {
  const result: number[] = [];
  const components = path.split('/');
  components.forEach((element) => {
    let number = parseInt(element, 10);
    if (isNaN(number)) {
      return;
    }
    if (element.length > 1 && element[element.length - 1] === "'") {
      number |= 0x80000000;
    }
    result.push(number);
  });
  return result;
};

const CLA = 0x55;
const CHUNK_SIZE = 250;
const INS = {
  GET_VERSION: 0x00,
  PUBLIC_KEY_SECP256K1: 0x01,
  SIGN_SECP256K1: 0x02,
  SHOW_ADDR_SECP256K1: 0x03,
  GET_ADDR_SECP256K1: 0x04,
  SIGN_PERSONAL_MESSAGE: 0x05
};
const ERROR_DESCRIPTION = {
  1: 'U2F: Unknown',
  2: 'U2F: Bad request',
  3: 'U2F: Configuration unsupported',
  4: 'U2F: Device Ineligible',
  5: 'U2F: Timeout',
  14: 'Timeout',
  0x9000: 'No errors',
  0x9001: 'Device is busy',
  0x6400: 'Execution Error',
  0x6700: 'Wrong Length',
  0x6982: 'Empty Buffer',
  0x6983: 'Output buffer too small',
  0x6984: 'Data is invalid',
  0x6985: 'Conditions not satisfied',
  0x6986: 'Transaction rejected',
  0x6a80: 'Bad key handle',
  0x6b00: 'Invalid P1/P2',
  0x6d00: 'Instruction not supported',
  0x6e00: 'App does not seem to be open',
  0x6f00: 'Unknown error',
  0x6f01: 'Sign/verify error'
};

const errorCodeToString = (statusCode: number): string => {
  if (statusCode in ERROR_DESCRIPTION) {
    // @ts-ignore
    return ERROR_DESCRIPTION[statusCode];
  }
  return `Unknown Status Code: ${statusCode}`;
};

const processErrorResponse = (response: { statusCode: number }) => {
  return {
    code: response.statusCode,
    message: errorCodeToString(response.statusCode)
  };
};

export class IoTeXApp {
  private transport: Transport;
  private account: ConcurrentState<{
    returnCode: number;
    publicKey: string;
    address: string;
  }>;
  private pendingKey: string;
  private sendQueue: Array<() => any> = [];

  constructor(transport: Transport) {
    this.transport = transport;
    this.account = new ConcurrentState();
  }

  public async getAddress(path: string): Promise<{
    returnCode: number;
    publicKey: string;
    address: string;
  }> {
    console.log('direct getAccounts------------------');
    if (this.account.value) {
      return this.account.value;
    }
    if (this.account.pending) {
      return this.account.wait();
    } else {
      this.account.lock();
    }
    console.log('direct requestAccounts------------------');
    return this.transport.send(CLA, INS.PUBLIC_KEY_SECP256K1, 0x00, 0x00, this.serializePath(path)).then((response) => {
      const errorCodeData = response.slice(-2);
      const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
      const publicKey = Buffer.from(response.slice(0, 65)).toString('hex');
      this.account.releaseLock({
        returnCode,
        publicKey: publicKey,
        address: publicKeyToAddress(publicKey)
      });
      return {
        returnCode,
        publicKey: publicKey,
        address: publicKeyToAddress(publicKey)
      };
    });
  }

  private serializePath(path: string): Buffer {
    const paths = splitPath(path);
    const buf = Buffer.alloc(1 + 4 * paths.length);
    buf.writeUInt8(paths.length, 0);
    for (let i = 0; i < paths.length; i++) {
      buf.writeInt32LE(paths[i], 1 + i * 4);
    }
    return buf;
  }

  private signGetChunks(path: string, message: Buffer): Buffer[] {
    const chunks = [];
    // @ts-ignore
    chunks.push(this.serializePath(path));
    const buffer = Buffer.from(message);

    for (let i = 0; i < buffer.length; i += CHUNK_SIZE) {
      let end = i + CHUNK_SIZE;
      if (i > buffer.length) {
        end = buffer.length;
      }
      // @ts-ignore
      chunks.push(buffer.slice(i, end));
    }

    return chunks;
  }

  private async signSendChunk(
    reqId: string,
    type: number,
    chunkIdx: number,
    chunkNum: number,
    chunk: Buffer
  ): Promise<{
    signature?: Buffer;
    code: number;
    message: string;
  }> {
    const send = async (resolve) => {
      const res = await this.transport.send(CLA, type, chunkIdx, chunkNum, chunk, [0x9000, 0x6a80, 0x6986]).then((response) => {
        const errorCodeData = response.slice(-2);
        const returnCode = errorCodeData[0] * 256 + errorCodeData[1];

        let errorMessage = errorCodeToString(returnCode);

        if (returnCode === 0x6a80) {
          errorMessage = response.slice(0, response.length - 2).toString('ascii');
        }

        let signature = null;
        if (response.length > 2) {
          // @ts-ignore
          signature = response.slice(0, response.length - 2);
        }

        return {
          signature,
          code: returnCode,
          message: errorMessage
        };
      }, processErrorResponse);
      resolve(res);
      if (this.sendQueue.length) {
        this.sendQueue.shift()?.call(this);
      } else {
        this.pendingKey = '';
      }
    };
    return new Promise(async (resolve, reject) => {
      if (!this.pendingKey || this.pendingKey === reqId) {
        this.pendingKey = reqId;
        send(resolve);
      } else {
        this.sendQueue.push(() => send(resolve));
      }
    });
  }

  public async signTransaction(
    path: string,
    transaction: Buffer
  ): Promise<{
    signature?: Buffer;
    code: number;
    message: string;
  }> {
    console.log(`request sign transacton: ${transaction.toString('hex')}`);
    const chunks = this.signGetChunks(path, transaction);
    const reqId = uuid();
    // @ts-ignore
    return await this.signSendChunk(reqId, INS.SIGN_SECP256K1, 1, chunks.length, chunks[0]).then(async (response) => {
      let result = {
        code: response.code,
        message: response.message,
        signature: null
      };
      const reqId = uuid();
      for (let i = 1; i < chunks.length; i += 1) {
        // @ts-ignore
        result = await this.signSendChunk(reqId, INS.SIGN_SECP256K1, 1 + i, chunks.length, chunks[i]);
        if (result.code !== 0x9000) {
          break;
        }
      }

      return {
        code: result.code,
        message: result.message,
        signature: result.signature
      };
    }, processErrorResponse);
  }

  public async signMessage(
    path: string,
    message: Buffer
  ): Promise<{
    signature?: Buffer;
    code: number;
    message: string;
  }> {
    console.log(`request sign message: ${message.toString('hex')}`);
    const chunks = this.signGetChunks(path, message);
    const reqId = uuid();
    // @ts-ignore
    return await this.signSendChunk(reqId, INS.SIGN_PERSONAL_MESSAGE, 1, chunks.length, chunks[0]).then(async (response) => {
      let result = {
        code: response.code,
        message: response.message,
        signature: null
      };
      const reqId = uuid();
      for (let i = 1; i < chunks.length; i += 1) {
        // @ts-ignore
        result = await this.signSendChunk(reqId, INS.SIGN_PERSONAL_MESSAGE, 1 + i, chunks.length, chunks[i]);
        if (result.code !== 0x9000) {
          break;
        }
      }

      // return {
      //   code: result.code,
      //   message: result.message,
      //   signature: result.signature,
      // };

      return result.signature;
    }, processErrorResponse);
  }
}
