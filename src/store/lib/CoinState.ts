import { makeAutoObservable } from 'mobx';
import { BigNumberState } from '../standard/BigNumberState';

export class CoinState {
  address: string;
  symbol: string;
  decimals: number;
  balance = new BigNumberState({});
  constructor(args: Partial<CoinState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
}
