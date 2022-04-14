import { SmartGraph } from '@smartgraph/core';
import { booleanArg, extendType, stringArg, objectType, intArg, floatArg, inputObjectType, arg } from 'nexus';
import { BigNumber } from 'bignumber.js';
import _ from 'lodash';

const SwapArgsType = inputObjectType({
  name: 'SwapArgsType',
  definition(t) {
    t.field('sellToken', { type: 'String' });
    t.field('buyToken', { type: 'String' });

    t.field('sellAmount', { type: 'String' });

    t.field('buyAmount', { type: 'String' });
    t.field('recipient', { type: 'String' });
    t.field('maxDelay', { type: 'Int', default: 120 });
    t.field('slippagePercentage', { type: 'Float', default: '0.005' });
    t.field('offlinePrice', { type: 'Boolean', default: false });
  }
});

const SwapResponseType = objectType({
  name: 'amount',
  definition(t) {
    //@ts-ignore
    t.field('amount', { type: 'String', nullable: true });
    t.field('path', {
      type: 'ERC20',
      //@ts-ignore
      list: true,
      resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context'], info) => {
        return Promise.all(
          root.path.map((i) =>
            ctx.smartGraph.parseInfo({
              info,
              ctx,
              _contractAddress: i.address,
              _contractName: 'ERC20',
              chainId: root.chainId
            })
          )
        );
      }
    });
    t.field('from', { type: 'String' });
    t.field('to', { type: 'String' });
    t.field('router', { type: 'String' });
    t.field('data', { type: 'String' });
    t.field('value', { type: 'String' });
    t.field('slippagePercentage', { type: 'Float' });
    t.field('sellToken', {
      type: 'ERC20',
      resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context'], info) => {
        return ctx.smartGraph.parseInfo({
          info,
          ctx,
          _contractAddress: root.sellTokenAddress,
          _contractName: 'ERC20',
          chainId: root.chainId,
          parent: root
        });
      }
    });
    t.field('buyToken', {
      type: 'ERC20',
      resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context'], info) => {
        return ctx.smartGraph.parseInfo({
          info,
          ctx,
          _contractAddress: root.buyTokenAddress,
          _contractName: 'ERC20',
          chainId: root.chainId,
          parent: root
        });
      }
    });
  }
});

export const UniswapPlugin = SmartGraph.Plugin(({ RouterType = 'UniswapRouter', FactoryType = 'UniswapFactory', PairType = 'LPToken' }) => {
  return {
    name: 'UniswapPlugin',
    types: [
      extendType({
        type: RouterType,
        definition(t) {
          t.field('swap', {
            type: SwapResponseType,
            args: {
              args: arg({ type: SwapArgsType })
            },
            resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context']) => {
              const { sellToken, buyToken, sellAmount, buyAmount, noDecimals, recipient, maxDelay, slippagePercentage, offlinePrice } = args.args;
              const { eTokens } = UniswapService.config[root.chainId];

              const isSell = sellAmount ? true : false;
              let amount = new BigNumber(isSell ? sellAmount : buyAmount);

              const sellTokenAddress = eTokens.map[sellToken]?.address || sellToken;
              const buyTokenAddress = eTokens.map[buyToken]?.address || buyToken;

              if (noDecimals) {
                const [sellDecimals, buyDecimals] = await SmartGraph.load({ ctx, root }, [
                  {
                    contractName: 'ERC20',
                    method: 'decimals',
                    params: [],
                    address: sellTokenAddress,
                    cache: { ttl: 86400 }
                  },
                  {
                    contractName: 'ERC20',
                    method: 'decimals',
                    params: [],
                    address: buyTokenAddress,
                    cache: { ttl: 86400 }
                  }
                ]);
                amount = amount.times(10 ** (isSell ? Number(sellDecimals) : Number(buyDecimals)));
              }

              const path = [sellTokenAddress, buyTokenAddress];
              const method = isSell ? 'getAmountsOut' : 'getAmountsIn';
              let pairs = [
                { path, amount: '0' },
                ...eTokens.set.map((i) => ({
                  path: _.uniq([path[0], i.address, path[1]]),
                  amount: 0
                }))
              ];
              let prices = null;
              if (offlinePrice) {
                prices = await Promise.all(
                  pairs.map((i) =>
                    UniswapService[method]({
                      root,
                      ctx,
                      amount: amount.toFixed(0, 1),
                      path: i.path,
                      address: root.address
                    })
                  )
                );
              } else {
                prices = await SmartGraph.load(
                  { ctx, root },
                  pairs.map((i) => ({
                    contractName: RouterType,
                    method: method,
                    params: [amount.toFixed(0, 1), i.path],
                    address: root.address
                  }))
                );
              }
              prices.filter((i) => Array.isArray(i) && i.every((i) => Number(i) > 1)).forEach((i, index) => (pairs[index].amount = Number(isSell ? i[i.length - 1].toString() : i[0].toString())));

              pairs = pairs.filter((i) => i.amount > 1);
              // console.log(prices.filter((i) => Array.isArray(i) && i.every((i) => Number(i) > 1)));
              // console.log(pairs);
              let bestPair;
              if (isSell) {
                bestPair = _.maxBy(pairs, (i) => i.amount);
              } else {
                bestPair = _.minBy(pairs, (i) => i.amount);
              }

              const deadline = Math.floor(Date.now() / 1000) + maxDelay;
              const safetyAmount = isSell
                ? new BigNumber(bestPair.amount).multipliedBy(1 - slippagePercentage).toFixed(0, 1)
                : new BigNumber(bestPair.amount).multipliedBy(1 + slippagePercentage).toFixed(0, 1);

              const amountIn = isSell ? sellAmount : safetyAmount;
              const amountOut = isSell ? safetyAmount : buyAmount;
              const bestPath = bestPair.path;

              let swapMethod = isSell ? 'swapExactTokensForTokens' : 'swapTokensForExactTokens';
              let swapParams = isSell ? [amountIn, amountOut, bestPath, recipient, deadline] : [amountOut, amountIn, bestPath, recipient, deadline];
              if (eTokens.map[sellToken]?.isNativeToken) {
                swapMethod = isSell ? 'swapExactETHForTokens' : 'swapETHForExactTokens';
                swapParams = isSell ? [amountOut, bestPath, recipient, deadline] : [amountOut, bestPath, recipient, deadline];
              }
              if (eTokens.map[buyToken]?.isNativeToken) {
                swapMethod = isSell ? 'swapExactTokensForETH' : 'swapTokensForExactETH';
                swapParams = isSell ? [amountIn, amountOut, bestPath, recipient, deadline] : [amountOut, amountIn, bestPath, recipient, deadline];
              }
              const data = ctx.smartGraph.encodeFunction({
                contract: root.contractName,
                method: swapMethod,
                params: swapParams
              });
              return {
                chainId: root.chainId,
                amount: safetyAmount,
                path: bestPath.map((i) => ({
                  address: i,
                  chainId: root.chainId
                })),
                sellTokenAddress,
                buyTokenAddress,
                from: recipient,
                to: root.address,
                router: root.address,
                data,
                value: eTokens.map[sellToken]?.isNativeToken ? amountIn : '0',
                slippagePercentage
              };
            }
          });
        }
      }),
      SwapArgsType
    ]
  };
});

export class MapSet<T> {
  map: Record<string, T>;
  set: T[];
  constructor(args: T[], key: string) {
    this.set = args;
    this.map = _.keyBy(args, key);
  }
}

export class UniswapService {
  Config: {
    eTokens: MapSet<{
      name: string;
      symbol: string;
      address: string;
      isNativeToken?: boolean;
    }>;
    provider: MapSet<{
      name: string;
      address: string;
    }>;
  };
  static config: Record<number, UniswapService['Config']> = {
    4689: {
      provider: new MapSet(
        [
          {
            name: 'mimoswap',
            address: '0x95cB18889B968AbABb9104f30aF5b310bD007Fd8'
          }
        ],
        'name'
      ),
      eTokens: new MapSet(
        [
          {
            name: 'IOTX',
            symbol: 'IOTX',
            address: '0xa00744882684c3e4747faefd68d283ea44099d03',
            isNativeToken: true
          },
          {
            name: 'Wrapped IOTX',
            symbol: 'WIOTX',
            address: '0xa00744882684c3e4747faefd68d283ea44099d03'
          },
          {
            name: 'IoTeX Binance USD',
            symbol: 'BUSD_b',
            address: '0x84abcb2832be606341a50128aeb1db43aa017449'
          },
          {
            name: 'Crosschain IOTX',
            symbol: 'CIOTX',
            address: '0x99b2b0efb56e62e36960c20cd5ca8ec6abd5557a'
          },
          {
            name: 'IoTeX Binance BTC',
            symbol: 'WBTC',
            address: '0xc7b93720f73b037394ce00f954f849ed484a3dea'
          },
          {
            name: 'IoTeX Tether USD',
            symbol: 'USDT',
            address: '0x6fbcdc1169b5130c59e72e51ed68a84841c98cd1'
          },
          {
            name: 'IoTeX Ethereum Token',
            symbol: 'ETH',
            address: '0x0258866edaf84d6081df17660357ab20a07d0c80'
          },
          {
            name: 'IoTeX USDC',
            symbol: 'USDC',
            address: '0x3b2bf2b523f54c4e454f08aa286d03115aff326c'
          },
          {
            name: 'IoTeX BNB',
            symbol: 'BNB',
            address: '0x97e6c48867fdc391a8dfe9d169ecd005d1d90283'
          }
        ],
        'symbol'
      )
    }
  };
  static sortToken(tokenA, tokenB) {
    return tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];
  }
  static async getReserves({ ctx, root, address, ttl = 20, path }: { ctx: SmartGraph['Context']; address: string; root: any; ttl?: number; path: string[] }) {
    const [token0] = this.sortToken(path[0], path[1]);
    const [factoryAddress] = await SmartGraph.load({ ctx, root }, [
      {
        address,
        contractName: 'UniswapRouter',
        method: 'factory',
        cache: { ttl: 31536000 }
      }
    ]);
    const [lpAddress] = await SmartGraph.load({ ctx, root }, [
      {
        address: factoryAddress,
        contractName: 'UniswapFactory',
        method: 'getPair',
        params: path,
        cache: { ttl: 31536000 }
      }
    ]);
    if (lpAddress == '0x0000000000000000000000000000000000000000') return null;
    const [reserves] = await SmartGraph.load({ ctx, root }, [
      {
        address: lpAddress,
        contractName: 'LPToken',
        method: 'getReserves',
        cache: { ttl: 20 }
      }
    ]);
    const reserve0 = reserves[0].toString();
    const reserve1 = reserves[1].toString();
    return path[0] == token0 ? [reserve0, reserve1] : [reserve1, reserve0];
  }
  static async getAmountIn(amountOut: string, reserveIn: BigNumber, reserveOut: BigNumber) {
    const numerator = new BigNumber(reserveIn).multipliedBy(amountOut).multipliedBy(1000);
    const denominator = new BigNumber(reserveOut).minus(amountOut).multipliedBy(997);
    return numerator.dividedBy(denominator).plus(1).toFixed(0, 1);
  }

  static async getAmountOut(amountIn: string, reserveIn: BigNumber, reserveOut: BigNumber) {
    const amountInWithFee = new BigNumber(amountIn).multipliedBy(997);
    const numerator = amountInWithFee.multipliedBy(reserveOut);
    const denominator = new BigNumber(reserveIn).multipliedBy(1000).plus(amountInWithFee);
    return numerator.dividedBy(denominator).toFixed(0, 1);
  }
  static async getAmountsOut({ ctx, root, address, ttl = 20, path, amount }: { ctx: SmartGraph['Context']; address: string; root: any; ttl?: number; path: string[]; amount: string }) {
    const amounts = new Array(path.length).fill(0);
    amounts[0] = amount;
    for (let i = 0; i < path.length - 1; i++) {
      const reserve = await UniswapService.getReserves({
        ctx,
        root,
        address,
        ttl,
        path: [path[i], path[i + 1]]
      });
      if (!reserve) return null;
      amounts[i + 1] = await UniswapService.getAmountOut(amounts[i], reserve[0], reserve[1]);
    }
    // console.log(amounts, path);
    return amounts;
  }
  static async getAmountsIn({ ctx, root, address, ttl = 20, path, amount }: { ctx: SmartGraph['Context']; address: string; root: any; ttl?: number; path: string[]; amount: string }) {
    const amounts = new Array(path.length).fill(0);
    amounts[amounts.length - 1] = amount;
    for (let i = path.length - 1; i > 0; i--) {
      const reserve = await UniswapService.getReserves({
        ctx,
        root,
        address,
        ttl,
        path: [path[i - 1], path[i]]
      });
      if (!reserve) return null;
      amounts[i - 1] = await UniswapService.getAmountIn(amounts[i], reserve[0], reserve[1]);
    }
    // console.log(amounts, path);
    return amounts;
  }
}
