import { ChainState } from '@/store/lib/ChainState';
import { CoinState } from '@/store/lib/CoinState';
import { RPC_URLS } from '../lib/web3-react';

export const IotexTestnetConfig = new ChainState({
  name: 'IoTeX Testnet',
  chainId: 4690,
  networkKey: 'iotex',
  rpcUrl: RPC_URLS[4690],
  logoUrl: '/images/iotex.svg',
  explorerURL: 'https://testnest.iotexscan.io',
  explorerName: 'IotexScan',
  Coin: new CoinState({
    symbol: 'IOTX',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 5,
    multicallAddr: '0xe980c6BC4ff99e3E8431b680a58344B8e0170bE0',
    multicall2Addr: '0x6AACfED704A1E5E57602f843ceBBfd107aE44077',
    theme: {
      bgGradient: 'linear(to-r, #0BDAD5, #44FEB2)'
    }
  }
});
