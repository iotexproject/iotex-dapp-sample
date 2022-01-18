import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { cacheStorage } from '../../lib/localforage';
import { helper } from '../../lib/helper';

export class CacheState {
  id: string;
  enable = true;
  cacher = cacheStorage;
  onSet: (value: any) => void;

  constructor(args: Partial<CacheState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
    this.get();
  }
  set(val) {
    this.cacher.setItem(this.id, val);
    this.onSet(val);
  }
  async get() {
    const val = await this.cacher.getItem(this.id);
    if (val) {
      this.onSet(val);
    }
  }
}
