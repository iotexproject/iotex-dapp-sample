import { ChainState } from '@/store/lib/ChainState';
import { CoinState } from '@/store/lib/CoinState';
import { RPC_URLS } from '../lib/web3-react';

export const ETHKovanConfig = new ChainState({
  name: 'ETH Kovan',
  chainId: 42,
  networkKey: 'eth',
  rpcUrl: RPC_URLS[42],
  logoUrl: '/images/eth.svg',
  explorerURL: 'https://kovan.etherscan.io',
  explorerName: 'EtherScan',
  zeroAPI: 'https://kovan.api.0x.org/',
  Coin: new CoinState({
    symbol: 'ETH',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 13,
    multicallAddr: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
    multicall2Addr: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    zeroRouterAddr: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
    theme: {
      bgGradient: 'linear(to-r, #84ABF5, #CFC6F9)'
    }
  }
});
