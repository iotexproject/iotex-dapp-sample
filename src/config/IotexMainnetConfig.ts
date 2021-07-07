import { ChainState } from '../store/lib/ChainState';
import { RPC_URLS } from '../lib/web3-react';
import { CoinState } from '@/store/lib/CoinState';

export const IotexMainnetConfig = new ChainState({
  name: 'IoTeX',
  chainId: 4689,
  networkKey: 'iotex',
  rpcUrl: RPC_URLS[4689],
  logoUrl: '/images/iotex.svg',
  explorerURL: 'https://iotexscan.io',
  explorerName: 'IoTeXScan',
  Coin: new CoinState({
    symbol: 'IOTX',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 5,
    multicallAddr: '0xACCE294bf7D25Fe8C5C64Ae45197d3878F68403b',
    theme: {
      bgGradient: 'linear(to-r, #0BDAD5, #44FEB2)'
    }
  }
});
