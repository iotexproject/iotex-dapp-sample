import { NetworkState } from './NetworkState';
import { makeAutoObservable } from 'mobx';
import { ethers, Contract, Signer } from 'ethers';
import { JsonRpcProvider, TransactionResponse, Web3Provider } from '@ethersproject/providers';
import { Contract as MuticallContract, Provider as MulticallProvider } from 'ethers-multicall';
import { MappingState } from '../standard/MappingState';
import { ChainState } from './ChainState';
import { StorageState } from '../standard/StorageState';
import BigNumber from 'bignumber.js';
import { CallParams } from '../../../type';
import { GodStore } from '../god';

export class EthNetworkState implements NetworkState {
  god: GodStore;

  // contract
  chain: MappingState<ChainState>;
  signer: Signer;
  ethers: Web3Provider;
  account: string = '';
  multiCall: MulticallProvider;
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
  }

  get defaultEthers() {
    const provider = new JsonRpcProvider(this.chain.current.rpcUrl);
    return provider;
  }
  get currentChain() {
    return this.chain.current;
  }

  async loadBalance() {
    if (!this.ethers || !this.account) return;
    const balance = await this.ethers.getBalance(this.account);
    this.currentChain.Coin.balance.setValue(new BigNumber(balance.toString()));
  }

  setAccount(account: string) {
    this.account = account;
  }

  readMultiContract({ address, abi, method, params = [] }: CallParams) {
    const contract = new MuticallContract(address, abi);
    return contract[method](...params);
  }

  execContract({ address, abi, method, params = [], options = {} }: CallParams): Promise<Partial<TransactionResponse>> {
    const contract = new Contract(address, abi, this.signer || this.ethers);
    return contract[method](...params, options);
  }

  async multicall(calls: CallParams[]): Promise<any[]> {
    //@ts-ignore
    const res = await this.multiCall.all(calls.map((i) => this.readMultiContract(i)));
    res.forEach((v, i) => {
      const callback = calls[i].handler;
      if (typeof callback == 'function') {
        //@ts-ignore
        callback(v);
      } else {
        if (callback.setValue) {
          callback.setValue(new BigNumber(v.toString()));
        }
      }
    });
    return res;
  }

  isAddressaVailable(address: string): boolean {
    return ethers.utils.isAddress(address);
  }
}
