import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { CoinState } from './CoinState';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Provider as MulticallProvider } from 'ethcall';

export class ChainState {
  name: string;
  smartGraphName: string;
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
    theme?: {
      bgGradient: string;
    };
  };
  provider?: JsonRpcProvider;
  multiCall?: MulticallProvider;
  constructor(args: Partial<ChainState>) {
    Object.assign(this, args);
    makeAutoObservable(this, { network: false });
  }
}
