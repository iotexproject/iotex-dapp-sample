import { makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { CoinState } from './CoinState';
import { PromiseState } from '../standard/PromiseState';
import axios from 'axios';
import { ZeroQuoteRes } from '../../../type';

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
  zeroAPI: string = '';
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

  quote0x = new PromiseState({
    function: ({ params }: { params: { sellToken?: string; buyToken?: string; sellAmount?: string | number; buyAmount?: string | number, slippage?: string | number } }) => {
      return axios.request<ZeroQuoteRes>({ baseURL: this.zeroAPI, url: '/swap/v1/quote', method: 'GET', params });
    }
  });
}
