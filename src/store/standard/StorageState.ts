import BigNumber from 'bignumber.js';
import { makeAutoObservable } from 'mobx';
import { helper } from '@/lib/helper';

export class StorageState<T> {
  key: string;
  value: T | any = null;
  default: T | any = null;
  constructor(args: Partial<StorageState<T>>) {
    Object.assign(this, args);
    makeAutoObservable(this);
    this.load();
  }

  load() {
    const value = global?.localStorage?.getItem(this.key);
    this.value = helper.json.safeParse(value);
    if (this.value == null) {
      this.value = this.default;
    }
    return this.value;
  }

  save(value?: any) {
    if (value) {
      this.value = value;
    }
    global?.localStorage.setItem(this.key, JSON.stringify(value));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
