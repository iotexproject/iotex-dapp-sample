import { makeAutoObservable, reaction } from 'mobx';
import { NetworkState } from './NetworkState';
import { CallParams } from '../../../type';
import { rootStore } from '../index';
import { BooleanState } from '../standard/base';
import { helper } from '../../lib/helper';
import { TransactionReceipt } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { CacheState } from '../standard/CacheState';

export interface ContractState {
  address: string;
  abi: any;
}

export class ReadFunction<T = any[]> {
  name: string;
  value: string = '';
  contract: ContractState;
  autoLoad: boolean = false;
  cache?: CacheState;
  constructor(args: Partial<ReadFunction<T>>) {
    Object.assign(this, args);
    if (this.cache) {
      this.cache.onSet = (value) => {
        this.value = value;
      };
    }
    makeAutoObservable(this);
  }
  preMulticall(args: Partial<CallParams<T>>): Partial<CallParams<T>> {
    if (this.value) return null;
    return Object.assign({ address: this.contract.address, abi: this.contract.abi, method: this.name, handler: this }, args);
  }

  setValue(value: any) {
    if (this.cache) {
      this.cache.set(value);
    } else {
      this.value = value;
    }
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
