import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { CoinState } from './CoinState';

export class ChainState {
  name: string;
  network: NetworkState;
  networkKey: string;
  chainId: number;
  logoUrl: string;
  rpcUrl: string;
  explorerName: string;
  explorerURL: string;
  Coin: CoinState;
  info: {
    blockPerSeconds: number;
    multicallAddr?: string;
    multicall2Addr?: string;
    zeroRouterAddr?: string;
    theme?: {
      bgGradient: string;
    };
  };
  constructor(args: Partial<ChainState>) {
    Object.assign(this, args);
    makeAutoObservable(this, { network: false });
  }
}
