import { makeAutoObservable } from 'mobx';
import { BigNumberInputState } from '../standard/BigNumberInputState';
import { StringState, BooleanState } from '../standard/base';
import TokenState from '../lib/TokenState';
import { rootStore } from '../index';

export class TransferTokenStore {
  amount = new BigNumberInputState({});
  receiverAdderss = new StringState();
  curToken = null as TokenState;
  isOpenTokenList = new BooleanState();
  constructor(args: Partial<TransferTokenStore>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  get state() {
    if (!rootStore.god.isConnect) {
      return { valid: true, msg: rootStore.lang.t('connect.wallet'), msgApprove: '', connectWallet: true };
    }
    const valid = this.curToken && this.amount.value && this.receiverAdderss.value;
    return {
      valid,
      msg: valid ? rootStore.lang.t('transfer') : rootStore.lang.t('invalid.input')
    };
  }
}
