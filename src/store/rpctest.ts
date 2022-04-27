import { Expose, Transform, Type } from 'class-transformer';
import { IUniswapRouter, IErc20, IAmount } from '../lib/__generated/typing';
import { computed, makeObservable, observable } from 'mobx';

export class ERC20 extends IErc20 {
  @Expose()
  get logo() {
    return `https://iotexproject.iotex.io/iotex-token-metadata/master/images/${this.address}.png`;
  }
  test() {
    console.log('test');
  }
  parent: Swap = null;
  constructor() {
    super();
    makeObservable(this, {
      logo: computed,
      parent: observable
    });
  }
}

export class Swap extends IAmount {
  foo = 123;
  @Type(() => ERC20)
  path: ERC20[] = [];
  @Expose()
  get bar() {
    return 456;
  }
  parent: UniswapRouter = null;

  constructor() {
    super();
    setTimeout(() => {
      this.path.forEach((i) => {
        i.parent = this;
      });
    });
  }
}

export class UniswapRouter extends IUniswapRouter {
  @Type(() => Swap)
  swap: Swap = null;

  constructor() {
    super();
    setTimeout(() => {
      this.swap.parent = this;
    });
  }
}
