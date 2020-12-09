import { AntennaUtils } from "../../common/utils/antanna";
import { eventBus } from "../../common/utils/eventBus";
import { rootStore } from "../../common/store/index";
import { IAccount } from "iotex-antenna/lib/account/account";

export const hooks = {
  async waitAccount() {
    return new Promise<IAccount>((res, rej) => {
      if (AntennaUtils.getAntenna().iotx.accounts[0]) {
        res(AntennaUtils.getAntenna().iotx.accounts[0]);
      } else {
        eventBus.once("client.wallet.onAccount", () => {
          res(AntennaUtils.getAntenna().iotx.accounts[0]);
        });
      }
    });
  },
  async waitIotxBalance() {
    return new Promise<string>((res, rej) => {
      if (rootStore.wallet.account.balance) {
        res(rootStore.wallet.account.balance);
      } else {
        eventBus.once("client.wallet.iotx.onBalance", () => {
          res(rootStore.wallet.account.balance);
        });
      }
    });
  },
};
