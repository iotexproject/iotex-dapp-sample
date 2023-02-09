import { makeAutoObservable } from 'mobx';
import RootStore from '@/store/root';
import { NumberState } from './standard/base';
import { eventBus } from '../lib/event';

export class TestStore {
  rootStore: RootStore;
  count = new NumberState();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    eventBus.on('c2.onClick', () => {
      this.count.setValue(this.count.value + 1);
    });
  }
}
