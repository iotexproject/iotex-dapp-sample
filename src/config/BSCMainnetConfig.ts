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
    multicallAddr: '0xe21a5b299756ee452a6a871ff29852862fc99be9',
    multicall2Addr: '0x4c6bb7c24b6f3dfdfb548e54b7c5ea4cb52a0069',
    theme: {
      bgGradient: 'linear(to-r, #F6851B, #F5B638)'
    }
  }
});
