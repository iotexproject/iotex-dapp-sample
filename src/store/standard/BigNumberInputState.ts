import BigNumber from 'bignumber.js';
import { makeAutoObservable } from 'mobx';
import { helper } from '../../lib/helper';
export class BigNumberInputState {
  value = new BigNumber(0);
  format = null;
  loading = false;
  decimals = 18;
  formatter?: Function;
  constructor(args: Partial<BigNumberInputState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  setValue(value: BigNumber) {
    this.value = value;
    this.format = helper.number.toPrecisionFloor(new BigNumber(this.value).dividedBy(10 ** this.decimals).toFixed());
    this.setLoading(false);
  }
  setFormat(val: any) {
    this.format = val;
    this.value = new BigNumber(val).multipliedBy(10 ** this.decimals);
  }
  setLoading(val: boolean) {
    this.loading = val;
  }
}
