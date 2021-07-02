import { makeAutoObservable } from 'mobx';

export class TemplateState {
  constructor(args: Partial<TemplateState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
}
