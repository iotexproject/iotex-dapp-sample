import { makeAutoObservable } from 'mobx';
import { BooleanState } from './base';
import { helper } from '../../lib/helper';
import { showNotification } from '@mantine/notifications';

export class PromiseState<T extends (...args: any[]) => Promise<any>, U = ReturnType<T>> {
  loading = new BooleanState();
  value?: Awaited<U> = null;
  function: T;

  context: any = undefined;

  constructor(args: Partial<PromiseState<T, U>> = {}) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  async call(...args: Parameters<T>): Promise<Awaited<U>> {
    try {
      this.loading.setValue(true);
      const res = await this.function.apply(this.context, args);
      this.value = res;
      return res;
    } catch (error) {
      console.log(error);
      showNotification({
        title: 'Error',
        message: error.data?.message || error.message,
        color: 'red'
      });
      throw new Error(error.message);
    } finally {
      this.loading.setValue(false);
    }
  }
}
