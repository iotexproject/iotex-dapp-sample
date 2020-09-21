import { AntennaUtils } from "../../common/utils/antanna";
import { eventBus } from "../../common/utils/eventBus";
import { rootStore } from "../../common/store/index";

export const hooks = {
  async waitAccount() {
    return new Promise((res, rej) => {
      if (AntennaUtils.getAntenna().iotx.accounts[0]) {
        res();
      } else {
        eventBus.once("client.wallet.onAccount", () => {
          res();
        });
      }
    });
  },
  async waitIotxBalance() {
    return new Promise((res, rej) => {
      if (rootStore.wallet.account.balance) {
        res();
      } else {
        eventBus.once("client.wallet.iotx.onBalance", () => {
          res();
        });
      }
    });
  },
};
