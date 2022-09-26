import { makeAutoObservable } from 'mobx';
import { Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';
import { JsonRpcProvider, TransactionResponse, BaseProvider } from '@ethersproject/providers';
import { utils } from 'ethers';
import { Contract as MuticallContract, Provider as MulticallProvider } from 'ethcall';
import { MappingState } from '../standard/MappingState';
import { ChainState } from './ChainState';
import { NetworkState } from './NetworkState';
import { StorageState } from '../standard/StorageState';
import BigNumber from 'bignumber.js';
import { CallParams } from '../../../type';
import { GodStore } from '../god';
import { helper } from '../../lib/helper';
import DataLoader from 'dataloader';

export class EthNetworkState implements NetworkState {
  god: GodStore;

  // contract
  chain: MappingState<ChainState> = new MappingState({ currentId: '' });
  signer: Signer;
  provider: BaseProvider;
  account: string = '';
  allowChains: number[];

  info = {};

  dataloader: Record<number, DataLoader<CallParams, any, any>> = {};

  // ui
  connector = {
    latestProvider: new StorageState({ key: 'latestEthProvider' }),
    showConnector: false
  };

  walletInfo = {
    visible: false
  };

  constructor(args: Partial<EthNetworkState>) {
    Object.assign(this, args);
    makeAutoObservable(this);
    Object.values(this.chain.map).forEach((chain) => {
      chain.provider = new JsonRpcProvider(chain.rpcUrl);
    });
    this.allowChains = Object.values(this.chain.map).map((i) => i.chainId);
  }

  get defaultEthers() {
    const provider = new JsonRpcProvider(this.chain.current.rpcUrl);
    return provider;
  }
  get currentChain() {
    return this.chain.current;
  }

  async loadBalance() {
    if (!this.provider || !this.account) {
      return this.currentChain.Coin.balance.setValue(new BigNumber(0));
    }
    const balance = await this.provider.getBalance(this.account);
    this.currentChain.Coin.balance.setValue(new BigNumber(balance.toString()));
  }

  setAccount(account: string) {
    this.account = account;
  }

  isAddress(address: string): boolean {
    return utils.isAddress(address);
  }
}
