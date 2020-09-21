import WebSocket from "websocket-as-promised";
import { Account } from "iotex-antenna/lib/account/account";
import { Envelop } from "iotex-antenna/lib/action/envelop";
import { SignerPlugin } from "iotex-antenna/lib/action/method";
import Options from "websocket-as-promised/types/options";
import { utils } from ".";

interface IRequest {
  reqId?: number;
  type: "SIGN_AND_SEND" | "GET_ACCOUNTS" | "SIGN_MSG" | "SIGN_ACTION";
  envelop?: string; // serialized proto string
  origin?: string;
  msg?: string;
}

export interface WsRequest {
  // tslint:disable-next-line: no-any
  [key: string]: any;
}

export class WsSignerPlugin implements SignerPlugin {
  ws: WebSocket | undefined;

  readonly provider: string;

  readonly options: Options;

  constructor({ provider = "wss://local.iotex.io:64102", options = { timeout: 5000 } }: { provider?: string; options: Options }) {
    this.provider = provider;
    this.options = options;
  }

  start() {
    this.init();
    return this;
  }

  private async init() {
    this.ws = new WebSocket(this.provider, this.options);
    this.ws.onOpen.addListener(() => {
      utils.eventBus.emit("client.iopay.connected");
    });

    this.ws.onClose.addListener = () => {
      console.log("close");
      utils.eventBus.emit("client.iopay.close");
    };
    this.ws.onError.addListener = () => {
      utils.eventBus.emit("client.iopay.connectError");
    };
    await this.ws.open();
    return this;
  }

  private async wait() {
    while (!this.ws?.isOpened) {
      await utils.helper.promise.sleep(500);
      if (!this.ws?.isOpened) await this.init();
    }
    return Promise.resolve(true);
  }

  public async signAndSend(envelop: Envelop): Promise<string> {
    await this.wait();
    const envelopString = Buffer.from(envelop.bytestream()).toString("hex");

    const req: IRequest = {
      envelop: envelopString,
      type: "SIGN_AND_SEND",
      origin: this.getOrigin(),
    };
    const res = await this.ws.sendRequest(req);
    return res.actionHash ? res.actionHash : res;
  }

  public async getAccount(address: string): Promise<Account> {
    const acct = new Account();
    acct.address = address;
    return acct;
  }

  public async getAccounts(): Promise<Array<Account>> {
    await this.wait();
    const req = {
      type: "GET_ACCOUNTS",
    };
    const res = await this.ws.sendRequest(req);
    return res.accounts;
  }

  public getOrigin(plugin: string = ""): string {
    let origin: string = "";
    if (location !== undefined && location.hasOwnProperty("hostname") && location.hostname.length) {
      origin = location.hostname;
    } else {
      origin = plugin;
    }

    if (origin.substr(0, 4) === "www.") {
      origin = origin.replace("www.", "");
    }
    return origin;
  }
}
