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

export class ValueState<T> {
  _value: T = null;
  constructor(args: Partial<ValueState<T>> = {}) {
    Object.assign(this, args);
    makeAutoObservable(this);
  }

  get value() {
    return this.getValue ? this.getValue(this._value) : this._value;
  }
  set value(value) {
    this._value = value;
  }

  getValue: (value: T) => T;

  setValue(value: T) {
    this._value = value;
  }
}
