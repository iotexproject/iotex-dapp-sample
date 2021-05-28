import { makeAutoObservable } from 'mobx';

export class BaseStore {
  constructor() {
    makeAutoObservable(this);
  }
}
