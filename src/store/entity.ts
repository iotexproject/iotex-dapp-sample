import { Expose, Transform, Type } from 'class-transformer';
import { IUniswapRouter, IErc20, IAmount } from '../lib/__generated/typing';
import { computed, makeObservable, observable } from 'mobx';

export class ERC20Entity extends IErc20 {
  @Expose()
  get logo() {
    return `https://iotexproject.iotex.io/iotex-token-metadata/master/images/${this.address}.png`;
  }
  test() {
    console.log('test');
  }
  parent: SwapEntity = null;
  constructor() {
    super();
    makeObservable(this, {
      logo: computed,
      parent: observable
    });
  }
}

export class SwapEntity extends IAmount {
  foo = 123;
  @Type(() => ERC20Entity)
  path: ERC20Entity[] = [];
  @Expose()
  get bar() {
    return 456;
  }
  parent: UniswapRouterEntity = null;

  constructor() {
    super();
    setTimeout(() => {
      this.path.forEach((i) => {
        i.parent = this;
      });
    });
  }
}

export class UniswapRouterEntity extends IUniswapRouter {
  @Type(() => SwapEntity)
  swap: SwapEntity = null;

  constructor() {
    super();
    setTimeout(() => {
      this.swap.parent = this;
    });
  }
}
