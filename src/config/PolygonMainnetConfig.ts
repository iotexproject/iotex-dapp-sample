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
    multicallAddr: '0x35e4aa226ce52e1e59e5e5ec24766007bcbe2e7d',
    multicall2Addr: '0xf43a7be1b284aa908cdfed8b3e286961956b4d2c',
    theme: {
      bgGradient: 'linear(to-r, #7A4FDD, #B874D0)'
    }
  }
});
