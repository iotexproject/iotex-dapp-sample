import Antenna from "iotex-antenna";
import { WsSignerPlugin } from "./ws-plugin";
import { utils } from "./index";
import { publicConfig } from "../../../configs/public";
import { IAccount } from "iotex-antenna/lib/account/account";
import { privateConfig } from "../../../configs/private";
import { JsBridgeSignerMobile } from "./js-plugin";
import { eventBus } from "./eventBus";

export class AntennaUtils {
  public static defaultContractOptions = {
    gasLimit: "20000000",
    gasPrice: "1000000000000",
  };
  public static antenna: Antenna | null = null;
  public static wsSigner: WsSignerPlugin | null = null;
  public static jsSigner = null;
  private static _defaultAccount: IAccount;

  public static get account() {
    return this.antenna?.iotx?.accounts[0];
  }

  static getAntenna(): Antenna {
    if (this.antenna) {
      return this.antenna;
    }
    if (utils.env.isBrowser() && !utils.env.isIoPayMobile()) {
      this.wsSigner = new WsSignerPlugin({
        options: {
          packMessage: (data) => JSON.stringify(data),
          //@ts-ignore
          unpackMessage: (data) => JSON.parse(data),
          attachRequestId: (data, requestId) => Object.assign({ reqId: requestId }, data),
          extractRequestId: (data) => data && data.reqId,
        },
      });
      const antenna = new Antenna(publicConfig.IOTEX_CORE_ENDPOPINT, {
        signer: this.wsSigner.start(),
      });
      //@ts-ignore
      this.antenna = antenna;
      return antenna;
    }
    if (utils.env.isIoPayMobile()) {
      this.jsSigner = new JsBridgeSignerMobile();
      const antenna = new Antenna(publicConfig.IOTEX_CORE_ENDPOPINT, {
        signer: this.jsSigner,
      });
      //@ts-ignore
      this.antenna = antenna;
      return antenna;
    }

    if (utils.env.isSSR()) {
      const antenna = new Antenna(publicConfig.IOTEX_CORE_ENDPOPINT);
      //@ts-ignore
      this.antenna = antenna;
      return antenna;
    }
  }

  static async getIoPayAddress(): Promise<string> {
    if (!AntennaUtils.antenna) {
      AntennaUtils.antenna = AntennaUtils.getAntenna();
    }
    if (utils.env.isIoPayMobile()) {
      const address = await AntennaUtils.jsSigner.getIoAddressFromIoPay();
      AntennaUtils.antenna.iotx.accounts[0] = await AntennaUtils.jsSigner.getAccount(address);
      return address;
    }
    if (utils.env.isBrowser()) {
      const accounts = await AntennaUtils.wsSigner.getAccounts();
      if (accounts[0]) {
        AntennaUtils.antenna.iotx.accounts[0] = await AntennaUtils.wsSigner.getAccount(accounts[0].address);
      }
      return (accounts && accounts[0] && accounts[0].address) || "";
    }
  }

  static async getIotxBalance(address: string): Promise<number> {
    const antenna = AntennaUtils.getAntenna();
    const { accountMeta } = await antenna.iotx.getAccount({ address });
    // @ts-ignore
    return Number(fromRau(accountMeta.balance, "Iotx"));
  }

  static async signMessage(message: string): Promise<string> {
    const antenna = AntennaUtils.getAntenna();
    if (antenna.iotx.signer && antenna.iotx.signer.signMessage) {
      const signed = await antenna.iotx.signer.signMessage(message);
      if (typeof signed === "object") {
        return Buffer.from(signed).toString("hex");
      }
      return signed;
    }
    const account = antenna.iotx.accounts[0];
    const sig = account && (await account.sign(message));
    return (sig && sig.toString("hex")) || "";
  }
}
