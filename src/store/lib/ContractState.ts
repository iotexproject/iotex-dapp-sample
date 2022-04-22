import { makeAutoObservable, reaction } from 'mobx';
import { NetworkState } from './NetworkState';
import { CallParams } from '../../../type';
import { rootStore } from '../index';
import { BooleanState } from '../standard/base';
import { helper } from '../../lib/helper';
import { TransactionReceipt } from '@ethersproject/providers';
import { CacheState } from '../standard/CacheState';
import { showNotification } from '@mantine/notifications';

export interface ContractState {
  address: string;
  abi: any;
  chainId?: number;
  cache?: CacheState;
}

export class ReadFunction<T = any[], V = ReturnType<any>> {
  name: string;
  //@ts-ignore
  value?: V = '...';
  contract: ContractState;
  autoLoad: boolean = false;
  cacheAble: boolean = false;
  cacheLoaded: boolean = false;
  onSet?: (value: any) => V;
  constructor(args: Partial<ReadFunction<T, V>>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
  preMulticall(args: Partial<CallParams<T>>): Partial<CallParams<T>> {
    return Object.assign({ address: this.contract.address, abi: this.contract.abi, method: this.name, handler: this, chainId: this.contract.chainId }, args);
  }

  setValue(value: any) {
    if (this.contract.cache && this.cacheAble) {
      this.contract.cache.setValue(this.name, value);
    }
    if (this.onSet) {
      return (this.value = this.onSet(value));
    }
    //@ts-ignore
    if (this.value.setValue) {
      //@ts-ignore
      this.value.setValue(value);
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
  autoRefresh = true;
  constructor(args: Partial<WriteFunction<T>>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  get god() {
    return rootStore.god;
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
        if (this.autoRefresh) {
          this.god.pollingData();
        }
        if (this.onAfterCall) {
          this.onAfterCall({ args, receipt });
        }
      });
      return res;
    } catch (error) {
      console.log(error);
      this.loading.setValue(false);
      showNotification({
        title: 'Error',
        message: error.data?.message || error.message,
        color: 'red'
      });
      throw new Error(error.message);
    }
  }
}
