//@flow
import { Buffer } from 'buffer';
// @ts-ignore
import document from 'global/document';
// @ts-ignore
import window from 'global/window';
import { Account } from 'iotex-antenna/lib/account/account';
import { Envelop } from 'iotex-antenna/lib/action/envelop';
import { SignerPlugin } from 'iotex-antenna/lib/action/method';
import sleepPromise from 'sleep-promise';

// tslint:disable-next-line:insecure-random
let reqId = Math.round(Math.random() * 10000);
let timer = null;

interface IRequest {
  reqId: number;
  type: 'SIGN_AND_SEND' | 'GET_ACCOUNTS' | 'SIGN';
  envelop?: string; // serialized proto string
  message?: string | Buffer | Uint8Array; // serialized proto string
}

export class JsBridgeSignerMobile implements SignerPlugin {
  constructor() {
    this.init();
    this.getAccounts();
  }

  setupWebViewJavascriptBridge(callback: Function): void {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        () => {
          callback(window.WebViewJavascriptBridge);
        },
        false
      );
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      const WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://bridge-loaded';
      if (document.documentElement) {
        document.documentElement.appendChild(WVJBIframe);
        window.setTimeout(() => {
          if (document.documentElement) {
            document.documentElement.removeChild(WVJBIframe);
          }
        }, 0);
      }
    }
  }

  init(): void {
    // tslint:disable-next-line:no-any
    this.setupWebViewJavascriptBridge((bridge: any) => {
      try {
        bridge.init((message: string, responseCallback: Function) => {
          window.console.log('JS got a message', message);
          const data = {
            'Javascript Responds': '测试中文!'
          };
          window.console.log('JS responding with', data.toString());
          responseCallback(data);
        });
      } catch (e) {
        window.console.log('data error from android: = ', e.toString());
      }

      bridge.registerHandler('signAndSendJsFunction', (data: string, responseCallback: Function) => {
        window.console.log('data from signAndSendJsFunction register handler: = ', String(data));
        responseCallback('responseData signAndSendJsFunction test');
      });
    });
  }

  async signAndSend(envelop: Envelop): Promise<string> {
    const id = reqId++;
    const req: IRequest = {
      reqId: id,
      envelop: Buffer.from(envelop.bytestream()).toString('hex'),
      type: 'SIGN_AND_SEND'
    };

    return new Promise<string>((resolve) =>
      window.WebViewJavascriptBridge.callHandler('sign_and_send', JSON.stringify(req), (responseData: string) => {
        let resp = { reqId: -1, actionHash: '' };
        try {
          resp = JSON.parse(responseData);
        } catch (_) {
          return;
        }
        if (resp.reqId === id) {
          resolve(resp.actionHash);
        }
      })
    );
  }

  // eslint-disable-next-line no-unused-vars
  async getAccount(address: string): Promise<Account> {
    const account = new Account();
    account.address = address;
    window.console.log('getAccount account ', account);
    return account;
  }

  async getAccounts(): Promise<Account[]> {
    const id = reqId++;
    const req = {
      reqId: id,
      type: 'GET_ACCOUNTS'
    };

    window.console.log(JSON.stringify(req));
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      window.location.reload();
    }, 5000);
    // tslint:disable-next-line:promise-must-complete
    return new Promise<Account[]>((resolve) =>
      // @ts-ignore
      window.WebViewJavascriptBridge.callHandler('get_account', JSON.stringify(req), async (responseData: string) => {
        clearTimeout(timer);
        window.console.log('getIoAddressFromIoPay get_account responseData: ', responseData);
        let resp = { reqId: -1, address: '' };
        try {
          resp = JSON.parse(responseData);
        } catch (_) {
          return;
        }
        if (resp.reqId === id) {
          const account = await this.getAccount(resp.address);
          console.log(123, { account });
          resolve([account]);
        }
      })
    );
  }

  signMessage(message: string | Buffer | Uint8Array): Promise<Buffer> {
    window.console.log(`signMessage start`);
    const id = reqId++;
    const req: IRequest = {
      reqId: id,
      type: 'SIGN',
      message
    };
    return new Promise<Buffer>((resolve) =>
      window.WebViewJavascriptBridge.callHandler('sign', JSON.stringify(req), (responseData: string) => {
        window.console.log('signMessage sign responseData: ', responseData);
        let resp = { reqId: -1, signature: new Buffer('') };
        try {
          resp = JSON.parse(responseData);
        } catch (e) {
          window.console.log('signMessage: Error when parse responseData', e);
          return;
        }
        if (resp.reqId === id) {
          resolve(resp.signature);
        }
      })
    );
  }

  async getIoAddressFromIoPay(): Promise<string> {
    window.console.log('getIoAddressFromIoPay start');
    const id = reqId++;
    const req: IRequest = {
      reqId: id,
      type: 'GET_ACCOUNTS'
    };
    let sec = 1;
    // @ts-ignore
    while (!window.WebViewJavascriptBridge) {
      window.console.log('getIoAddressFromIoPay get_account sleepPromise sec: ', sec);
      await sleepPromise(sec * 200);
      sec = sec * 1.6;
      if (sec >= 48) {
        sec = 48;
      }
    }
    const timer = setTimeout(() => {
      window.location.reload();
    }, 5000);
    return new Promise<string>((resolve) =>
      // @ts-ignore
      window.WebViewJavascriptBridge.callHandler('get_account', JSON.stringify(req), (responseData: string) => {
        clearTimeout(timer);
        window.console.log('getIoAddressFromIoPay get_account responseData: ', responseData);
        let resp = { reqId: -1, address: '' };
        try {
          resp = JSON.parse(responseData);
        } catch (_) {
          return;
        }
        if (resp.reqId === id) {
          resolve(resp.address);
        }
      })
    );
  }
}
