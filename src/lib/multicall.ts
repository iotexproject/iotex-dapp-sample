import { Contract } from 'iotex-antenna/lib/contract/contract';
import Antenna from 'iotex-antenna';
import { Interface } from '@ethersproject/abi';
import { fromString } from 'iotex-antenna/lib/crypto/address';

export interface Call {
  target: string;
  callData: string;
}
export interface CallInput {
  abi: any;
  address: string;
  method: string;
  params?: any[];
}

export class IotexMulticall {
  contract: Contract;
  multicall: Interface;
  constructor(args: Partial<IotexMulticall>) {
    Object.assign(this, args);
    this.multicall = new Interface(this.abi);
  }

  get iotex() {
    return this.contract.provider as Antenna['iotx'];
  }

  get abi() {
    return JSON.stringify(Object.values(this.contract.getABI()!));
  }

  get contractAddress() {
    return this.contract.getAddress();
  }

  async batch(inputs: CallInput[]) {
    let calls: string[][] = [];
    let contracts: Interface[] = [];
    inputs.forEach((i, index) => {
      let { abi, address, method, params } = i;
      contracts[index] = new Interface(abi);
      address = fromString(address).stringEth();
      if (params) {
        params = params.map((i) => {
          return String(i).startsWith('io') ? fromString(i).stringEth() : i;
        });
      }
      const callData = contracts[index].encodeFunctionData(method, params);
      calls.push([address, callData]);
    });
    let data = this.multicall.encodeFunctionData('batch', [calls]);
    const result = await this.contract.provider?.readContract({
      execution: {
        contract: this.contractAddress!,
        amount: '0',
        data: Buffer.from(data.substr(2), 'hex')
      },
      callerAddress: this.contract.getAddress()!
    });
    const batchResult = this.multicall.decodeFunctionResult('batch', `0x${result?.data}`);

    return batchResult[2].map((i, index) => {
      const res = contracts[index].decodeFunctionResult(inputs[index].method, i);
      return res[0];
    });
  }
}
