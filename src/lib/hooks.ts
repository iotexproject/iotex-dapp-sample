import { rootStore } from '../store/index';
import { eventBus } from './event';

export const hooks = {
  async waitAccount(timeout?) {
    return new Promise<void>((res, rej) => {
      if (rootStore.god.currentNetwork.account) {
        res();
      } else {
        eventBus.once('wallet.onAccount', () => {
          res();
        });
        if (timeout) {
          setTimeout(() => {
            rej();
          }, timeout);
        }
      }
    });
  }
};
