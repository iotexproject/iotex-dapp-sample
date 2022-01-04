import { ChainState } from '@/store/lib/ChainState';
import { RPC_URLS } from '../lib/web3-react';
import { CoinState } from '@/store/lib/CoinState';

export const ETHMainnetConfig = new ChainState({
  name: 'ETH',
  chainId: 1,
  networkKey: 'eth',
  rpcUrl: RPC_URLS[1],
  logoUrl: '/images/eth.svg',
  explorerURL: 'https://etherscan.io',
  explorerName: 'EtherScan',
  zeroAPI: 'https://api.0x.org/',
  coingeckoAPI: ({ from, to }: { from: number; to: number }) => `https://api.coingecko.com/api/v3/coins/ethereum/contract/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
  Coin: new CoinState({
    symbol: 'ETH',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 13,
    multicallAddr: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    multicall2Addr: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    zeroRouterAddr: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
    theme: {
      bgGradient: 'linear(to-r, #84ABF5, #CFC6F9)'
    }
  }
});
