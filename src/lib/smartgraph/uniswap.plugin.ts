import { SmartGraph } from '@smartgraph/core';
import { extendType, stringArg, objectType, intArg, floatArg, inputObjectType, arg, list } from 'nexus';
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
    t.field('isFeeToken', { type: 'Boolean', default: false });
    t.field('chainId', { type: 'Int', default: 4689 });
  }
});

const GetPairsArgsType = inputObjectType({
  name: 'SwapArgsType',
  definition(t) {
    t.field('address', { type: 'String' });
  }
});

const ProviderResponseType = objectType({
  name: 'ProviderResponseType',
  definition(t) {
    //@ts-ignore
    t.field('name', { type: 'String', nullable: true });
    //@ts-ignore
    t.field('address', { type: 'String', nullable: true });
    //@ts-ignore
    t.field('chainId', { type: 'Int', nullable: true });
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
    t.field('provider', {
      type: ProviderResponseType,
      resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context'], info) => {
        return root.provider;
      }
    });
    t.field('allProvider', {
      type: ProviderResponseType,
      //@ts-ignore
      list: true,
      resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context'], info) => {
        return root.allProvider;
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
              const { sellToken, buyToken, sellAmount, buyAmount, noDecimals, recipient, maxDelay, slippagePercentage, offlinePrice, lpFee, isFeeToken } = args.args;
              console.log(args);
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

              const bestPair = await UniswapService.getBestTrade({ ctx, root, isSell, offlinePrice, amount: amount.toFixed(0, 1), pairs, swapAddress: root.address });
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
                //For special treatment requiring fee like ioShib
                if (isFeeToken) {
                  swapMethod = isSell ? 'swapExactTokensForETHSupportingFeeOnTransferTokens' : 'swapTokensForExactETH';
                }
              }
              console.log(swapMethod, swapParams);
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
              console.log(midPrice.toString(), exactQuote.toString(), priceImpact);
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
          t.field('preload', {
            type: 'Boolean',
            args: {
              address: arg({
                type: 'String',
                //@ts-ignore
                list: true
              })
            },
            resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context']) => {
              let pairs = [];
              const eTokensSet = UniswapService.config[root.chainId].eTokens.set.filter((i) => !i.isNativeToken);
              pairs = eTokensSet.map((i) => args.address.map((t) => [t, i.address]));
              let pairsArray = _.flatMap(pairs);
              console.log(root.address, 'root.address');
              const [factoryAddress] = await SmartGraph.load({ ctx, root }, [
                {
                  address: root.address,
                  contractName: 'UniswapRouter', //todo: support other swap protocol
                  method: 'factory',
                  cache: { ttl: 31536000 }
                }
              ]);
              console.log(factoryAddress, 'factoryAddress');

              let hasPairAddress = await Promise.all(pairsArray.map((i) => UniswapService.getPair({ root, ctx, address: factoryAddress, token0Address: i[1], token1Address: i[0] }))).then((i) =>
                i.filter((i) => i !== '0x0000000000000000000000000000000000000000')
              );
              // console.log(hasPairAddress, 'hasPairAddress');

              const call = [];

              for (let i = 0; i < pairsArray.length - 1; i++) {
                let pair = pairsArray[i];
                call.push(
                  UniswapService.getReserves({
                    ctx,
                    root,
                    address: root.address,
                    ttl: 20,
                    path: [pair[0], pair[1]]
                  }).then(async (reserve) => {
                    // console.log(reserve, 'reserve1');
                  })
                );
              }

              await Promise.all(call);
              return true;
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
              preload: arg({
                type: 'Boolean'
              }),
              token0Address: arg({
                type: 'String'
              }),
              token1Address: arg({
                type: 'String'
              }),
              cache: arg({ type: 'CacheInputType' })
            },
            resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context'], info) => {
              try {
                const { token0Address, token1Address, preload } = args;
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
                // console.log(pairsArray.map(i=>{}),'pairsArray')
                let TokenAddress = await Promise.all(
                  pairsArray.map((i) => UniswapService.getPair({ root, ctx, address: root.address, token0Address: i[0], token1Address: i[1], cache: args.cache }))
                ).then((t) => t.filter((z) => z !== '0x0000000000000000000000000000000000000000'));

                if (TokenAddress.length == 0) return null;
                const res = _.uniq(TokenAddress).map((address, index) => {
                  return {
                    poolId: index,
                    chainId: root.chainId,
                    address,
                    parentContract: root.contractName,
                    parentAddress: root.address
                  };
                });
                return res;
              } catch (error) {
                console.log(error);
                return null;
              }
            }
          });
        }
      }),
      extendType({
        type: 'Query',
        definition(t) {
          t.field('swap', {
            type: SwapResponseType,
            args: {
              args: arg({ type: SwapArgsType })
            },
            resolve: async (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context']) => {
              const { sellToken, buyToken, sellAmount, buyAmount, noDecimals, recipient, maxDelay, slippagePercentage, offlinePrice, lpFee, isFeeToken, chainId } = args.args;
              if (!chainId) return 'You need to provide the chainId field';
              const { eTokens, provider } = UniswapService.config[chainId];
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

              let bestPair: pair;

              const bestPairs = await Promise.all(
                provider.set.map((i) =>
                  UniswapService.getBestTrade({ ctx, root: { ...root, chainId }, provider: i, isSell, offlinePrice, amount: amount.toFixed(0, 1), pairs, swapAddress: i.address })
                )
              );

              if (isSell) {
                bestPair = _.maxBy(bestPairs, (i) => i.amount);
              } else {
                bestPair = _.minBy(bestPairs, (i) => i.amount);
              }
              console.log(bestPairs, 'bestPairs');
              console.log(bestPair, 'bestPair');

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
                //For special treatment requiring fee like ioShib
                if (isFeeToken) {
                  swapMethod = isSell ? 'swapExactTokensForETHSupportingFeeOnTransferTokens' : 'swapTokensForExactETH';
                }
              }
              // console.log(swapMethod, swapParams);
              const data = ctx.smartGraph.encodeFunction({
                contract: 'UniswapRouter',
                method: swapMethod,
                params: swapParams
              });

              const midPrice = await UniswapService.getMidPrice({ ctx, root: { ...root, chainId }, address: bestPair.provider.address, path: bestPair.path });

              const exactQuote = midPrice.multipliedBy(isSell ? sellAmount : originAmount);
              const priceImpact = exactQuote
                .minus(isSell ? originAmount : buyAmount)
                .div(exactQuote)
                .minus(lpFee)
                .toFixed(5);

              // console.log(midPrice.toString(), exactQuote.toString(), priceImpact);
              console.log(chainId, 'chainId');
              return {
                chainId,
                provider: { ...bestPair.provider, chainId },
                allProvider: bestPairs.map((i) => {
                  return { ...i.provider, chainId };
                }),
                amount: originAmount,
                withSlippageAmount: safetyAmount,
                path: bestPath.map((i) => ({
                  address: i,
                  chainId
                })),
                priceImpact,
                sellTokenAddress,
                buyTokenAddress,
                from: recipient,
                to: bestPair.provider.address,
                router: bestPair.provider.address,
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

interface provider {
  name: string;
  address: string;
}

interface pair {
  amount: string;
  path: string[];
  provider?: provider;
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
    provider: MapSet<provider>;
  };
  static config: Record<number, UniswapService['Config']> = {
    1: {
      provider: new MapSet(
        [
          {
            name: 'Uniswap',
            address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
          },
          {
            name: 'SushiSwap',
            address: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F'
          }
        ],
        'name'
      ),
      eTokens: new MapSet(
        [
          {
            name: 'Ether',
            symbol: 'ETH',
            address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            isNativeToken: true
          },
          {
            name: 'Wrapped Ether',
            symbol: 'WETH',
            address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
          },
          {
            name: 'USDCoin',
            symbol: 'USDC',
            address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
          },
          {
            name: 'Tether USD',
            symbol: 'USDT',
            address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
          },
          {
            name: 'Dai Stablecoin',
            address: '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
            symbol: 'DAI'
          },
          {
            name: 'Wrapped BTC',
            address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
            symbol: 'WBTC'
          }
        ],
        'symbol'
      )
    },
    42: {
      provider: new MapSet(
        [
          {
            name: 'uniswap',
            address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
          }
        ],
        'name'
      ),
      eTokens: new MapSet(
        [
          {
            name: 'Ether',
            symbol: 'ETH',
            address: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
            isNativeToken: true
          },
          {
            name: 'Wrapped Ether',
            symbol: 'WETH',
            address: '0xd0a1e359811322d97991e03f863a0c30c2cf029c'
          },
          {
            name: 'USDCoin',
            symbol: 'USDC',
            address: '0x88E9D0155725A34D2834D90edfeb18a1249308bC'
          },
          {
            name: 'Tether USD',
            symbol: 'USDT',
            address: '0xc05e19Bf3a5f3DD85CE9C1352e261dEA8e2bce29'
          }
        ],
        'symbol'
      )
    },
    56: {
      provider: new MapSet(
        [
          {
            name: 'PancakeSwap',
            address: '0x10ED43C718714eb63d5aA57B78B54704E256024E'
          },
          {
            name: 'SushiSwap',
            address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
          }
        ],
        'name'
      ),
      eTokens: new MapSet(
        [
          {
            name: 'Binance Coin',
            symbol: 'BNB',
            address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
            isNativeToken: true
          },
          {
            name: 'WBNB Token',
            symbol: 'WBNB',
            address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
          },
          {
            name: 'USDCoin',
            symbol: 'USDC',
            address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
          },
          {
            name: 'Tether USD',
            symbol: 'USDT',
            address: '0x55d398326f99059fF775485246999027B3197955'
          },
          {
            name: 'Binance Pegged BUSD',
            symbol: 'BUSD',
            address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
          },
          {
            name: 'PancakeSwap Token',
            symbol: 'Cake',
            address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'
          },
          {
            name: 'Binance Pegged ETH',
            symbol: 'ETH',
            address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
          }
        ],
        'symbol'
      )
    },
    137: {
      provider: new MapSet(
        [
          {
            name: 'polygonRouter',
            address: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'
          },
          {
            name: 'SushiSwap',
            address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
          }
        ],
        'name'
      ),
      eTokens: new MapSet(
        [
          {
            name: 'MATIC Coin',
            symbol: 'MATIC',
            address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
            isNativeToken: true
          },
          {
            name: 'Wrapped Matic',
            symbol: 'WMATIC',
            address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
          },
          {
            name: 'USDCoin',
            symbol: 'USDC',
            address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
          },
          {
            name: 'Tether USD',
            symbol: 'USDT',
            address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f'
          },
          {
            name: 'Binance Pegged ETH',
            symbol: 'ETH',
            address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'
          }
        ],
        'symbol'
      )
    },
    4689: {
      provider: new MapSet(
        [
          {
            name: 'MimoSwap',
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
    // const [lpAddress] = await SmartGraph.load({ ctx, root }, [
    //   {
    //     address: factoryAddress,
    //     contractName: 'UniswapFactory',
    //     method: 'getPair',
    //     params: path,
    //     cache: { ttl: 31536000 }
    //   }
    // ]);
    const lpAddress = await UniswapService.getPair({ ctx, root, address: factoryAddress, token0Address: path[0], token1Address: path[1] });
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

  static getAmountIn(amountOut: string, reserveIn: BigNumber, reserveOut: BigNumber) {
    const numerator = new BigNumber(reserveIn).multipliedBy(amountOut).multipliedBy(1000);
    const denominator = new BigNumber(reserveOut).minus(amountOut).multipliedBy(997);
    return numerator.dividedBy(denominator).plus(1).toFixed(0);
  }

  static getAmountOut(amountIn: string, reserveIn: BigNumber, reserveOut: BigNumber) {
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
          amounts[i + 1] = UniswapService.getAmountOut(amounts[i], reserve[0], reserve[1]);
        })
      );
    }
    await Promise.all(call);
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
          amounts[i - 1] = UniswapService.getAmountIn(amounts[i], reserve[0], reserve[1]);
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
    return amounts.reduce((p, c) => p.multipliedBy(c.reserve1).dividedBy(c.reserve0), new BigNumber(1));
  }

  static async getPair({
    ctx,
    root,
    address,
    token0Address,
    token1Address
  }: {
    ctx: SmartGraph['Context'];
    address: string;
    root: any;
    ttl?: number;
    token0Address: string;
    token1Address: string;
    cache?: any;
  }) {
    const [tokenAddress] = await SmartGraph.load({ ctx, root }, [
      {
        contractName: 'UniswapFactory',
        method: 'getPair',
        params: [token0Address, token1Address],
        address: address,
        cache: { ttl: 60, key: `${root.chainId}-uniswap.getPair-${address}-${token0Address}-${token1Address}` }
      }
    ]);
    return tokenAddress;
  }

  static async getBestTrade({
    ctx,
    root,
    isSell,
    amount,
    offlinePrice,
    pairs,
    swapAddress,
    provider = null
  }: {
    ctx: SmartGraph['Context'];
    root: SmartGraph['ROOT'];
    amount: string;
    offlinePrice: string;
    isSell: boolean;
    provider?: provider;
    pairs: { amount?: any; path: string[] }[];
    swapAddress: string;
  }): Promise<{ amount: string; path: string[]; provider?: provider }> {
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
            address: swapAddress
          })
        )
      );
      // console.log(prices, pairs, 'prices-offline');
    } else {
      prices = await SmartGraph.load(
        { ctx, root },
        pairs.map((i) => ({
          contractName: 'UniswapRouter',
          method,
          params: [amount, i.path],
          address: swapAddress
        }))
      );
      // console.log(prices, 'prices-online');
    }
    prices.forEach((i, index) => {
      const valid = Array.isArray(i) && i.every((i) => Number(i) > 1);
      pairs[index].amount = valid ? Number(isSell ? i[i.length - 1].toString() : i[0].toString()) : 0;
    });
    pairs = pairs.filter((i) => Number(i.amount) > 1);
    let bestPair;
    if (isSell) {
      bestPair = _.maxBy(pairs, (i) => i.amount);
    } else {
      bestPair = _.minBy(pairs, (i) => i.amount);
    }
    return { ...bestPair, provider };
  }

  static async getNativeTokenValue({ ctx, root, tokenAddress, tokenAmount, offlinePrice }) {
    const nativeToken = this.config[137].eTokens.set.filter((i) => !!i.isNativeToken);
    const amount = new BigNumber(1e18).toFixed(0, 1);
    const price = nativeToken.map((i) => i.address).includes(tokenAddress)
      ? new BigNumber(1)
      : await this.getBestTrade({
          ctx,
          root,

          offlinePrice,
          isSell: true,
          amount,
          swapAddress: root.address,
          pairs: nativeToken.map((i) => ({
            path: [tokenAddress, i.address]
          }))
        }).then((i) => new BigNumber(i.amount).div(1e18));
    if (!price) return 0;
    return price.multipliedBy(tokenAmount).div(1e18);
  }
}
