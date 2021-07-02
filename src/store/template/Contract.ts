import { makeAutoObservable } from 'mobx';
import { NetworkState } from '../lib/NetworkState';
import { CallParams } from '../../../type';

export class RouterState {
  address: string;
  abi = '';
  network: NetworkState;
  constructor(args: Partial<RouterState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  test(args: Partial<CallParams<[number, string]>>) {
    return this.network.execContract(Object.assign({ address: this.address, abi: this.abi, method: 'test' }, args));
  }
  preMulticall(args: Partial<CallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}
