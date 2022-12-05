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
import { GodStore } from '../god';
import { metamaskUtils } from '../../lib/metaskUtils';
import { smartGraph } from '../../lib/smartgraph/index';

export class EthNetworkState implements NetworkState {
  god: GodStore;

  // contract
  chain: MappingState<ChainState> = new MappingState({ currentId: '' });
  signer: Signer;
  // provider: BaseProvider;
  account: string = '';
  allowChains: number[];

  info = {};

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
    // Object.values(this.chain.map).forEach((chain) => {
    //   chain.provider = new JsonRpcProvider(chain.rpcUrl);
    // });
    this.allowChains = Object.values(this.chain.map).map((i) => i.chainId);
  }

  get currentChain() {
    return this.chain.current;
  }

  get provider() {
    return smartGraph.chain[this.currentChain.chainId].caller.provider;
  }

  async loadBalance() {
    if (!this.signer || !this.account) {
      return this.currentChain.Coin.balance.setValue(new BigNumber(0));
    }
    const balance = await this.provider.getBalance(this.account);
    this.currentChain.Coin.balance.setValue(new BigNumber(balance.toString()));
  }

  set(args: Partial<EthNetworkState>) {
    Object.assign(this, args);
  }

  isAddress(address: string): boolean {
    return utils.isAddress(address);
  }
}
