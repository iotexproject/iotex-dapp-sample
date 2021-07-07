import { ChainState } from '@/store/lib/ChainState';
import { CoinState } from '@/store/lib/CoinState';
import { RPC_URLS } from '../lib/web3-react';

export const PolygonMainnetConfig = new ChainState({
  name: 'Polygon',
  chainId: 137,
  networkKey: 'polygon',
  logoUrl: '/images/polygon.svg',
  rpcUrl: RPC_URLS[137],
  explorerURL: 'https://explorer-mainnet.maticvigil.com/',
  explorerName: 'PolygonScan',
  Coin: new CoinState({
    symbol: 'MATIC',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 3,
    multicallAddr: '0x95028e5b8a734bb7e2071f96de89babe75be9c8e',
    theme: {
      bgGradient: 'linear(to-r, #7A4FDD, #B874D0)'
    }
  }
});
