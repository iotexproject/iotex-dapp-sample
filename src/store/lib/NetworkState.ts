import { ChainState } from './ChainState';
import { MappingState } from '../standard/MappingState';
import { StorageState } from '../standard/StorageState';
import { TransactionResponse } from '@ethersproject/providers';
import { GodStore } from '../god';
import { CallParams } from '../../../type';

export interface NetworkState {
  god: GodStore;
  chain: MappingState<ChainState>;
  allowChains: number[];
  account: string;
  connector: { latestProvider: StorageState<string>; showConnector: boolean };
  walletInfo: { visible: boolean };
  currentChain: ChainState;
  info: {
    [key: string]: any;
  };

  multicall(calls: Partial<CallParams>[], args?: { crosschain?: boolean }): Promise<any[]>;
  setAccount: Function;
  loadBalance: Function;
  execContract(call: { address: string; abi: any; method: string; params?: any[]; options?: any }): Promise<Partial<TransactionResponse>>;
  isAddress(address: string): boolean;
}
