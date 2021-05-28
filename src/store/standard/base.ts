import { makeAutoObservable } from 'mobx';

export class StringState {
  value: string = '';
  constructor(args: Partial<StringState> = {}) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
  setValue(value: string) {
    this.value = value;
  }
}

export class BooleanState {
  value: boolean = false;
  constructor(args: Partial<BooleanState> = {}) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
  setValue(value: boolean) {
    this.value = value;
  }
}

export class NumberState {
  value: number = 0;
  constructor(args: Partial<NumberState> = {}) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }
  setValue(value: number) {
    this.value = value;
  }
}
