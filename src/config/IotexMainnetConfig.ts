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
    multicallAddr: '0xACCE294bf7D25Fe8C5C64Ae45197d3878F68403b'
  },
  Coin: new TokenState({
    symbol: 'IOTX',
    decimals: 18
  })
});
