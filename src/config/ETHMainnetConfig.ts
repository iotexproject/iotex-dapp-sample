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
  Coin: new CoinState({
    symbol: 'ETH',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 13,
    multicallAddr: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    multicall2Addr: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    theme: {
      bgGradient: 'linear(to-r, #84ABF5, #CFC6F9)'
    }
  }
});
