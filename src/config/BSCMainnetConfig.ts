import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';

export const BSCMainnetConfig = new ChainState({
  name: 'BSC',
  chainId: 56,
  networkKey: 'bsc',
  rpcUrl: 'https://bsc-dataseed.binance.org',
  logoUrl: '/images/bsc_logo.svg',
  explorerURL: 'https://bscscan.com',
  explorerName: 'BscScan',
  Coin: new TokenState({
    symbol: 'BNB',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 3,
    multicallAddr: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb'
  }
});
