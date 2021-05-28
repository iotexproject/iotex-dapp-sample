import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { TokenState } from './TokenState';

export class ChainState {
  name: string;
  network: NetworkState;
  networkKey: string;
  chainId: number;
  logoUrl: string;
  rpcUrl: string;
  explorerName: string;
  explorerURL: string;
  Coin: TokenState;
  info: {
    blockPerSeconds: number;
    multicallAddr?: string;
  };
  constructor(args: Partial<ChainState>) {
    Object.assign(this, args);
    makeAutoObservable(this, { network: false });
  }
}
