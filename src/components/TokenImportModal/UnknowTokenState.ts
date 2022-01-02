import { makeAutoObservable } from 'mobx';

import erc20Abi from '@/constants/abi/erc20.json';
import { rootStore } from '../../store';
import { BooleanState, StringState, NumberState } from '../../store/standard/base';

export class UnknowTokenState {
  name = new StringState();
  symbol = new StringState();
  decimals = new NumberState({ value: 18 })
  address: string = '';
  abi = erc20Abi;
  loaded = new BooleanState({ value: false });
  promise: Promise<void>
  constructor(args: Partial<UnknowTokenState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
    this.promise = this.start();
  }
  private async start() {
    this.loaded.setValue(false);
    await rootStore.god.currentNetwork.multicall([
      { method: 'name', address: this.address, abi: this.abi, handler: this.name },
      { method: 'symbol', address: this.address, abi: this.abi, handler: this.symbol },
      { method: 'decimals', address: this.address, abi: this.abi, handler: this.symbol }
    ]);
    this.loaded.setValue(true);
  }
}
