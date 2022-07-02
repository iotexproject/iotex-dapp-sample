import { SmartGraph } from '@smartgraph/core';
import { booleanArg, extendType, stringArg, objectType, intArg, floatArg, inputObjectType, arg, subscriptionType } from 'nexus';
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
    t.field('lpFee', { type: 'Float', default: '0.003' });
    t.field('slippagePercentage', { type: 'Float', default: '0.005' });
    t.field('offlinePrice', { type: 'Boolean', default: false });
  }
});

const GetPairsArgsType = inputObjectType({
  name: 'SwapArgsType',
  definition(t) {
    t.field('address', { type: 'String' });
  }
});

const SwapResponseType = objectType({
  name: 'amount',
  definition(t) {
    //@ts-ignore
    t.field('amount', { type: 'String', nullable: true });
    //@ts-ignore
    t.field('withSlippageAmount', { type: 'String', nullable: true });
    t.field('path', {
      type: 'ERC20',
      //@ts-ignore
      list: true,
      resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context'], info) => {
        return Promise.all(root.path.map((i) => ({ chainId: root.chainId, address: i.address, contractName: 'ERC20' })));
      }
    });
    t.field('from', { type: 'String' });
    t.field('to', { type: 'String' });
    t.field('router', { type: 'String' });
    t.field('data', { type: 'String' });
    t.field('value', { type: 'String' });
    t.field('slippagePercentage', { type: 'Float' });
    t.field('priceImpact', { type: 'Float' });
    t.field('sellToken', {
      type: 'ERC20',
      resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context'], info) => {
        return { chainId: root.chainId, address: root.sellTokenAddress, contractName: 'ERC20' };
      }
    });
    t.field('buyToken', {
      type: 'ERC20',
      resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context'], info) => {
        return { chainId: root.chainId, address: root.buyTokenAddress, contractName: 'ERC20' };
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
              const { sellToken, buyToken, sellAmount, buyAmount, noDecimals, recipient, maxDelay, slippagePercentage, offlinePrice, lpFee } = args.args;
              // console.log(args);
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
              let pairs = [
                { path },
                ...eTokens.set.map((i) => ({
                  path: _.uniq([path[0], i.address, path[1]])
                }))
              ];

              const bestPair = await UniswapService.getBestTrade({ ctx, root, isSell, offlinePrice, amount: amount.toFixed(0, 1), pairs });
              const deadline = Math.floor(Date.now() / 1000) + maxDelay;

              const safetyAmount = isSell
                ? new BigNumber(bestPair.amount).multipliedBy(1 - slippagePercentage).toFixed(0, 1)
                : new BigNumber(bestPair.amount).multipliedBy(1 + slippagePercentage).toFixed(0, 1);
              const originAmount = new BigNumber(bestPair.amount).toFixed(0, 1);

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

              // const [ValueInput, ValueOutput] = await Promise.all([
              //   UniswapService.getNativeTokenValue({ ctx, root, tokenAmount: isSell ? sellAmount : originAmount, tokenAddress: sellTokenAddress, offlinePrice }),
              //   UniswapService.getNativeTokenValue({ ctx, root, tokenAmount: isSell ? originAmount : buyAmount, tokenAddress: buyTokenAddress, offlinePrice })
              // ]);
              // const priceImpact = new BigNumber(ValueInput).minus(ValueOutput).div(ValueInput).toFixed(4);
              // const priceImpact = 0;
              const midPrice = await UniswapService.getMidPrice({ ctx, root, address: root.address, path: bestPair.path });
              const exactQuote = midPrice.multipliedBy(isSell ? sellAmount : originAmount);
              const priceImpact = exactQuote
                .minus(isSell ? originAmount : buyAmount)
                .div(exactQuote)
                .minus(lpFee)
                .toFixed(5);
              // console.log(midPrice.toString(), exactQuote.toString(), priceImpact);
              return {
                chainId: root.chainId,
                amount: originAmount,
                withSlippageAmount: safetyAmount,
                path: bestPath.map((i) => ({
                  address: i,
                  chainId: root.chainId
                })),
                priceImpact,
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
      extendType({
        type: FactoryType,
        definition(t) {
          t.field('getPairs', {
            type: 'LPToken',
            //@ts-ignore
            list: true,
            args: {
              //The arg "address" will checks all pairs and "token0Address" checks only the current token0 and token1 pair
              address: arg({
                type: 'String',
                //@ts-ignore
                list: true
              }),
              //addresses is local pairs param  ,for example ['0x00000,0x11111','0x22222,0x33333']
              addresses: arg({
                type: 'String',
                //@ts-ignore
                list: true
              }),
              token0Address: arg({
                type: 'String'
              }),
              token1Address: arg({
                type: 'String'
              })
            },
            resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context'], info) => {
              try {
                const { token0Address, token1Address } = args;
                const eTokensSet = UniswapService.config[root.chainId].eTokens.set.filter((i) => !i.isNativeToken);
                let pairs = [];
                if (args.address) {
                  pairs = eTokensSet.map((i) => args.address.map((t) => [t, i.address]));
                } else if (token0Address && token1Address) {
                  pairs = [[[token0Address, token1Address]]];
                } else if (args.addresses) {
                  pairs = [[...args.addresses.map((i) => i.split(','))]];
                }
                let pairsArray = _.flatMap(pairs);
                // console.log(root.address, pairsArray, 'pairsArray');
                let TokenAddress = await Promise.all(pairsArray.map((i) => UniswapService.getPair({ root, ctx, address: root.address, token0Address: i[0], token1Address: i[1] }))).then((i) =>
                  i.filter((i) => i !== '0x0000000000000000000000000000000000000000')
                );
                if (TokenAddress.length == 0) return null;
                return _.uniq(TokenAddress).map((address, index) => {
                  return {
                    poolId: index,
                    chainId: root.chainId,
                    address,
                    parentContract: root.contractName,
                    parentAddress: root.address
                  };
                });
              } catch (error) {
                console.log(error);
                return null;
              }
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
      isStableCoin?: boolean;
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
            address: '0x147CdAe2BF7e809b9789aD0765899c06B361C5cE'
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
            address: '0x84abcb2832be606341a50128aeb1db43aa017449',
            isStableCoin: true
          },
          {
            name: 'Crosschain IOTX',
            symbol: 'CIOTX',
            address: '0x99b2b0efb56e62e36960c20cd5ca8ec6abd5557a'
          },
          {
            name: 'IoTeX Tether USD',
            symbol: 'USDT',
            address: '0x6fbcdc1169b5130c59e72e51ed68a84841c98cd1'
          },
          {
            name: 'IoTeX USDC',
            symbol: 'USDC',
            address: '0x3b2bf2b523f54c4e454f08aa286d03115aff326c'
          }
        ],
        'symbol'
      )
    },
    4690: {
      provider: new MapSet(
        [
          {
            name: 'mimoswap',
            address: '0x147CdAe2BF7e809b9789aD0765899c06B361C5cE'
          }
        ],
        'name'
      ),
      eTokens: new MapSet(
        [
          {
            name: 'IOTX',
            symbol: 'IOTX',
            address: '0xff5Fae9FE685B90841275e32C348Dc4426190DB0',
            isNativeToken: true
          },
          {
            name: 'Wrapped Ether',
            symbol: 'ioETH',
            address: '0x93b59C5b2EF3bB6F525E608Df6b69bE9cf3284d6'
          },
          {
            name: 'Binance USD',
            symbol: 'ioBUSD',
            address: '0x9AEf5ADa7FcdcD49CFa7C89A1cE654C7e7255068'
          },
          {
            name: 'TKN',
            symbol: 'TKN',
            address: '0x51f5946372a6F08c8E2C35DD46F6Fa8f0e990950'
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
    return numerator.dividedBy(denominator).plus(1).toFixed(0);
  }

  static async getAmountOut(amountIn: string, reserveIn: BigNumber, reserveOut: BigNumber) {
    const amountInWithFee = new BigNumber(amountIn).multipliedBy(997);
    const numerator = amountInWithFee.multipliedBy(reserveOut);
    const denominator = new BigNumber(reserveIn).multipliedBy(1000).plus(amountInWithFee);
    return numerator.dividedBy(denominator).toFixed(0);
  }
  static async getAmountsOut({ ctx, root, address, ttl = 20, path, amount }: { ctx: SmartGraph['Context']; address: string; root: any; ttl?: number; path: string[]; amount: string }) {
    const amounts = new Array(path.length).fill(0);
    amounts[0] = amount;
    const call = [];
    for (let i = 0; i < path.length - 1; i++) {
      call.push(
        UniswapService.getReserves({
          ctx,
          root,
          address,
          ttl,
          path: [path[i], path[i + 1]]
        }).then(async (reserve) => {
          if (!reserve) return null;
          amounts[i + 1] = await UniswapService.getAmountOut(amounts[i], reserve[0], reserve[1]);
        })
      );
      await Promise.all(call);
    }
    return amounts;
  }
  static async getAmountsIn({ ctx, root, address, ttl = 20, path, amount }: { ctx: SmartGraph['Context']; address: string; root: any; ttl?: number; path: string[]; amount: string }) {
    const amounts = new Array(path.length).fill(0);
    amounts[amounts.length - 1] = amount;
    const call = [];

    for (let i = path.length - 1; i > 0; i--) {
      call.push(
        UniswapService.getReserves({
          ctx,
          root,
          address,
          ttl,
          path: [path[i - 1], path[i]]
        }).then(async (reserve) => {
          if (!reserve) return null;
          amounts[i - 1] = await UniswapService.getAmountIn(amounts[i], reserve[0], reserve[1]);
        })
      );
    }
    await Promise.all(call);
    return amounts;
  }

  static async getMidPrice({ ctx, root, address, path }: { ctx: SmartGraph['Context']; address: string; root: any; path: string[] }): Promise<BigNumber> {
    const call = [];

    for (let i = 0; i < path.length - 1; i++) {
      call.push(
        UniswapService.getReserves({
          ctx,
          root,
          address,
          path: [path[i], path[i + 1]]
        }).then((res) => ({ reserve0: res[0], reserve1: res[1] }))
      );
    }
    const amounts = await Promise.all(call);
    // console.log(amounts);
    return amounts.reduce((p, c) => p.multipliedBy(c.reserve1).dividedBy(c.reserve0), new BigNumber(1));
  }

  static async getPair({ ctx, root, address, token0Address, token1Address }: { ctx: SmartGraph['Context']; address: string; root: any; ttl?: number; token0Address: string; token1Address: string }) {
    return ctx.smartGraph.wrap<string>(
      `${root.chainId}-uniswap.getPair-${address}-${token0Address}-${token1Address}`,
      async () => {
        const [tokenAddress] = await SmartGraph.load({ ctx, root }, [
          { contractName: 'UniswapFactory', method: 'getPair', params: [token0Address, token1Address], address: root.address, cache: { ttl: 86400 } }
        ]);
        return tokenAddress;
      },
      { ttl: 86400 }
    );
  }

  static async getBestTrade({
    ctx,
    root,
    isSell,
    amount,
    offlinePrice,
    pairs
  }: {
    ctx: SmartGraph['Context'];
    root: SmartGraph['ROOT'];
    amount: string;
    offlinePrice: string;
    isSell: boolean;
    pairs: { amount?: any; path: string[] }[];
  }): Promise<{ amount: string; path: string[] }> {
    const method = isSell ? 'getAmountsOut' : 'getAmountsIn';
    let prices = null;
    if (offlinePrice) {
      prices = await Promise.all(
        pairs.map((i) =>
          UniswapService[method]({
            root,
            ctx,
            amount,
            path: i.path,
            address: root.address
          })
        )
      );
    } else {
      prices = await SmartGraph.load(
        { ctx, root },
        pairs.map((i) => ({
          contractName: 'UniswapRouter',
          method,
          params: [amount, i.path],
          address: root.address
        }))
      );
    }
    prices.forEach((i, index) => {
      const valid = Array.isArray(i) && i.every((i) => Number(i) > 1);
      pairs[index].amount = valid ? Number(isSell ? i[i.length - 1].toString() : i[0].toString()) : 0;
    });
    pairs = pairs.filter((i) => Number(i.amount) > 1);
    // console.log(pairs);
    let bestPair;
    if (isSell) {
      bestPair = _.maxBy(pairs, (i) => i.amount);
    } else {
      bestPair = _.minBy(pairs, (i) => i.amount);
    }
    return bestPair;
  }

  static async getNativeTokenValue({ ctx, root, tokenAddress, tokenAmount, offlinePrice }) {
    const nativeToken = this.config[root.chainId].eTokens.set.filter((i) => !!i.isNativeToken);
    const amount = new BigNumber(1e18).toFixed(0, 1);
    const price = nativeToken.map((i) => i.address).includes(tokenAddress)
      ? new BigNumber(1)
      : await this.getBestTrade({
          ctx,
          root,
          offlinePrice,
          isSell: true,
          amount,
          pairs: nativeToken.map((i) => ({
            path: [tokenAddress, i.address]
          }))
        }).then((i) => new BigNumber(i.amount).div(1e18));
    if (!price) return 0;
    return price.multipliedBy(tokenAmount).div(1e18);
  }
}
