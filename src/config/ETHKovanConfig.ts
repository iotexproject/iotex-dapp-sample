import { publicCOnfig } from './public';
import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';
import { RPC_URLS } from '../lib/web3-react';

export const ETHKovanConfig = new ChainState({
  name: 'ETH Kovan',
  chainId: 42,
  networkKey: 'eth',
  rpcUrl: RPC_URLS[42],
  logoUrl: '/images/eth.svg',
  explorerURL: 'https://kovan.etherscan.io',
  explorerName: 'EtherScan',
  Coin: new TokenState({
    symbol: 'ETH',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 13,
    multicallAddr: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
    theme: {
      bgGradient: 'linear(to-r, #84ABF5, #CFC6F9)'
    }
  }
});
