import { makeAutoObservable } from 'mobx';
import RootStore from '@/store/root';
import { NumberState } from './standard/base';
import { eventBus } from '../lib/event';

export class TestStore {
  rootStore: RootStore;
  count = new NumberState();
  count1 = new NumberState();

  events = {
    action1: {
      handle() {
        this.count.setValue(this.count.value + 1);
      }
    },
    action2: {
      handle() {
        this.count.setValue(this.count.value + 1);
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
