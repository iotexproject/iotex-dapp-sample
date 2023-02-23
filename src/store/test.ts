import { makeAutoObservable } from 'mobx';
import RootStore from '@/store/root';
import { NumberState } from './standard/base';
import { eventBus } from '../lib/event';
import { rootStore } from './index';

export class TestStore {
  // rootStore: RootStore;

  get rootStore() {
    return rootStore;
  }

  store = {};

  datas = {
    query1: {
      value: 123
    }
  };

  constructor(rootStore: RootStore) {
    // this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });

    // Object.keys(this.events).map((i) => {
    //   eventBus.on(i, this.events[i].handle.bind(this));
    // });
  }
}
