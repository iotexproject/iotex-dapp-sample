import { rootStore } from '../store/index';
import { eventBus } from './event';

export const hooks = {
  async waitAccount(timeout?) {
    return new Promise<void>((res, rej) => {
      if (rootStore.god.currentNetwork.account) {
        res();
      } else {
        rootStore.god.setShowConnecter(true);
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
  },
  async waitJWT(timeout?) {
    return new Promise<void>((res, rej) => {
      if (rootStore.user.token.value) {
        res();
      } else {
        eventBus.emit('wallet.login');
        eventBus.once('wallet.onToken', () => {
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
