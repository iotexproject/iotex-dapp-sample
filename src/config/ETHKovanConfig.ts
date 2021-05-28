import { publicCOnfig } from './public';
import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';

export const ETHKovanConfig = new ChainState({
  name: 'ETH Kovan',
  chainId: 42,
  networkKey: 'eth',
  rpcUrl: `https://kovan.infura.io/v3/${publicCOnfig.infuraId}`,
  logoUrl: '/images/eth_logo.svg',
  explorerURL: 'https://kovan.etherscan.io',
  explorerName: 'EtherScan',
  Coin: new TokenState({
    symbol: 'ETH',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 13,
    multicallAddr: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a'
  }
});
