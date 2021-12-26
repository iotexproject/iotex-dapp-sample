import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { CallParams } from '../../../type';
import { rootStore } from '../index';
import { BooleanState } from '../standard/base';
import { helper } from '../../lib/helper';
import { TransactionReceipt } from '@ethersproject/providers';

export interface ContractState {
  address: string;
  abi: any;
}

export class ReadFunction<V> {
  name: string;
  value: V;
  contract: ContractState;
  autoLoad: boolean = true;
  constructor(args: Partial<ReadFunction<V>>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
}

export class WriteFunction<T> {
  name: string;
  contract: ContractState;
  loading = new BooleanState();
  onAfterCall: (call: { args: Partial<CallParams<T>>; receipt: TransactionReceipt }) => void;
  constructor(args: Partial<WriteFunction<T>>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  get network() {
    return rootStore.god.currentNetwork;
  }

  async call(args: Partial<CallParams<T>>) {
    try {
      console.log('开始try', this);
      this.loading.setValue(true);
      //@ts-ignore
      const res = await this.network.execContract(Object.assign({ address: this.contract.address, abi: this.contract.abi, method: this.name }, args));
      res.wait().then(async (receipt) => {
        this.loading.setValue(false);
        if (this.onAfterCall) {
          this.onAfterCall({ args, receipt });
        }
      });
      return res;
    } catch (error) {
      console.log(error);
      this.loading.setValue(false);
      helper.toast({ title: error.data?.message || error.message, status: 'error' });
      throw new Error(error.message);
    }
  }
}
