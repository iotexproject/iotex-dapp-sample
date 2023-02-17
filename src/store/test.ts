import { makeAutoObservable } from 'mobx';
import RootStore from '@/store/root';
import { NumberState } from './standard/base';
import { eventBus } from '../lib/event';

export class TestStore {
  rootStore: RootStore;

  store = {};

  events = {
    action1: {
      handle() {
        this.store['c1-1'].text += this.store['c1-1'].text;
      }
    },
    action2: {
      handle() {
        this.store['c1-2'].text += this.store['c1-2'].text;
      }
    }
  };

  datas = [{ title: '1' }, { title: '2' }, { title: '3' }];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    Object.keys(this.events).map((i) => {
      eventBus.on(i, this.events[i].handle.bind(this));
    });
  }
}
