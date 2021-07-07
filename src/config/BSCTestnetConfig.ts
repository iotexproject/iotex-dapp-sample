import { ChainState } from '@/store/lib/ChainState';
import { CoinState } from '@/store/lib/CoinState';
import { RPC_URLS } from '../lib/web3-react';

export const BSCTestnetConfig = new ChainState({
  name: 'BSC Testnet',
  chainId: 97,
  networkKey: 'bsc',
  rpcUrl: RPC_URLS[97],
  logoUrl: '/images/bsc.svg',
  explorerURL: 'https://testnet.bscscan.com',
  explorerName: 'BscScan',
  Coin: new CoinState({
    symbol: 'BNB',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 3,
    multicallAddr: '0xe348b292e8eA5FAB54340656f3D374b259D658b8',
    theme: {
      bgGradient: 'linear(to-r, #F6851B, #F5B638)'
    }
  }
});
