import BigNumber from 'bignumber.js';
import { makeAutoObservable } from 'mobx';

export class StorageState<T> {
  key: string;
  value: T | any = null;
  default: T | any = null;
  constructor(args: Partial<StorageState<T>>) {
    Object.assign(this, args);
    makeAutoObservable(this);
    this.load();
  }

  static safeParse(val: any) {
    try {
      return JSON.parse(val);
    } catch (error) {
      return val;
    }
  }

  load() {
    const value = global?.localStorage?.getItem(this.key);
    this.value = StorageState.safeParse(value);
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
