import { TokenState } from '@/store/lib/TokenState';
import { ChainState } from '../store/lib/ChainState';

export const IotexMainnetConfig = new ChainState({
  name: 'IoteX',
  chainId: 4689,
  networkKey: 'iotex',
  rpcUrl: 'https://babel-api.mainnet.iotex.io/',
  logoUrl: '/images/iotex.svg',
  explorerURL: 'https://iotexscan.com',
  explorerName: 'IotexScan',
  info: {
    blockPerSeconds: 5,
    multicallAddr: ''
  },
  Coin: new TokenState({
    symbol: 'IOTX',
    decimals: 18
  })
});
