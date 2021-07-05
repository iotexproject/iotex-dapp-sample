import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';

export const IotexTestnetConfig = new ChainState({
  name: 'IoTeX Testnet',
  chainId: 4690,
  networkKey: 'iotex',
  rpcUrl: `https://babel-api.testnet.iotex.io`,
  logoUrl: '/images/iotex.svg',
  explorerURL: 'https://testnest.iotexscan.io',
  explorerName: 'IotexScan',
  Coin: new TokenState({
    symbol: 'IOTX',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 5,
    multicallAddr: '0xe980c6BC4ff99e3E8431b680a58344B8e0170bE0',
    theme: {
      bgGradient: 'linear(to-r, #0BDAD5, #44FEB2)'
    }
  }
});