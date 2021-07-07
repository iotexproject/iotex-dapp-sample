import { RPC_URLS } from '@/lib/web3-react';
import { ChainState } from '@/store/lib/ChainState';
import { CoinState } from '../store/lib/CoinState';

export const BSCMainnetConfig = new ChainState({
  name: 'BSC',
  chainId: 56,
  networkKey: 'bsc',
  rpcUrl: RPC_URLS[56],
  logoUrl: '/images/bsc.svg',
  explorerURL: 'https://bscscan.com',
  explorerName: 'BscScan',
  Coin: new CoinState({
    symbol: 'BNB',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 3,
    multicallAddr: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
    theme: {
      bgGradient: 'linear(to-r, #F6851B, #F5B638)'
    }
  }
});
