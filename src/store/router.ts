import { Expose, Transform, Type } from 'class-transformer';
import { IUniswapRouter, IErc20, IAmount } from '../lib/__generated/typing';

export class ERC20 extends IErc20 {
  @Expose()
  get logo() {
    return `https://iotexproject.iotex.io/iotex-token-metadata/master/images/${this.address}.png`;
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
}

export class UniswapRouter extends IUniswapRouter {
  @Type(() => Swap)
  swap: Swap = null;
}
