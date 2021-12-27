import { makeAutoObservable } from 'mobx';
import { BooleanState } from './base';
import { helper } from '../../lib/helper';

export class PromiseState<T, U> {
  loading = new BooleanState();
  function: (args: T) => Promise<U>;
  constructor(args: Partial<PromiseState<T, U>> = {}) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  async call(args?: T): Promise<U> {
    try {
      this.loading.setValue(true);
      const res = await this.function(args);
      return res;
    } catch (error) {
      console.log(error);
      helper.toast({ title: error.data?.message || error.message, status: 'error' });
      throw new Error(error.message);
    } finally {
      this.loading.setValue(false);
    }
  }
}
