import { makeAutoObservable } from 'mobx';
import { NetworkState } from '../lib/NetworkState';
import { CallParams } from '../../../type';
import { WriteFunction } from './ContractState';
import { NumberState } from '../standard/base';
import { BigNumberState } from '../standard/BigNumberState';

export class MintState {
  address: string;
  abi = '';
  network: NetworkState;

  balance = new NumberState();
  stampCost = new BigNumberState({});
  maxTokens = new NumberState();

  constructor(args: Partial<MintState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  claim = new WriteFunction<[string, string]>({ name: 'claim', contract: this });

  autoMulticall(): Partial<CallParams>[] {
    return [{}].map((i) => ({ ...i, address: this.address, abi: this.abi }));
  }

  preMulticall(args: Partial<CallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}
