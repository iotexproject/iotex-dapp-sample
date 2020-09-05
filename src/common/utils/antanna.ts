import Antenna from "iotex-antenna";
import { WsSignerPlugin } from "./ws-plugin";
import { utils } from "./index";
import { publicConfig } from "../../../configs/public";
import { JsBridgeSigner } from "./js-plugin";
import { SignerPlugin } from "iotex-antenna/lib/action/method";

export class AntennaUtils {
  public static defaultContractOptions = {
    gasLimit: "20000000",
    gasPrice: "1000000000000",
  };
  public static antenna: Antenna | null = null;
  public static signerPlugin: SignerPlugin | null = null;

  static getAntenna(): Antenna {
    if (this.antenna) {
      return this.antenna;
    }
    if (utils.env.isBrowser()) {
      const isIoPayMobile = utils.env.isIoPayMobile();
      const wsSigner = isIoPayMobile
        ? new JsBridgeSigner()
        : new WsSignerPlugin({
            options: {
              packMessage: (data) => JSON.stringify(data),
              //@ts-ignore
              unpackMessage: (data) => JSON.parse(data),
              attachRequestId: (data, requestId) => Object.assign({ reqId: requestId }, data),
              extractRequestId: (data) => data && data.reqId,
            },
          });
      this.signerPlugin = wsSigner instanceof WsSignerPlugin ? wsSigner.start() : wsSigner;

      const antenna = new Antenna(publicConfig.IOTEX_CORE_ENDPOPINT, {
        signer: this.signerPlugin,
      });
      this.antenna = antenna;
      return antenna;
    }
    if (utils.env.isIoPayMobile()) {
      const antenna = new Antenna(publicConfig.IOTEX_CORE_ENDPOPINT, {
        signer: new JsBridgeSigner(),
      });
      //@ts-ignore
      this.antenna = antenna;
      return antenna;
    }

    if (utils.env.isSSR()) {
      const antenna = new Antenna(publicConfig.IOTEX_CORE_ENDPOPINT);
      this.antenna = antenna;
      return antenna;
    }
  }

  static async getAccounts() {
    return this.signerPlugin ? this.signerPlugin.getAccounts() : [];
  }
}
