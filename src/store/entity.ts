import { Expose, Transform, Type } from 'class-transformer';
import { IUniswapRouter, IErc20, IAmount } from '../lib/__generated/typing';
import { PromiseState } from './standard/PromiseState';
import { helper } from '../lib/helper';

export class ERC20Entity extends IErc20 {
  @Expose()
  get logo() {
    return `https://iotexproject.iotex.io/iotex-token-metadata/master/images/${this.address}.png`;
  }
  test() {
    console.log('test');
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
}

export class UniswapRouterEntity extends IUniswapRouter {
  @Type(() => SwapEntity)
  swap: SwapEntity = null;

  _swap = new PromiseState({
    function: async () => {
      const { data, value } = this.swap;
      await helper.c
        .sendTx({
          address: this.address,
          chainId: this.chainId,
          data,
          value
        })
        .finally(() => {
          this.swap = null;
        });
    }
  });
}
