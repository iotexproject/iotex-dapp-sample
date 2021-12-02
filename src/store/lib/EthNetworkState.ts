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
import { BigNumberState } from '../standard/BigNumberState';
import { NumberState, StringState } from '../standard/base';

export class EthNetworkState implements NetworkState {
  god: GodStore;

  // contract
  chain: MappingState<ChainState>;
  signer: Signer;
  provider: BaseProvider;
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
    if (!this.provider || !this.account) return;
    const balance = await this.provider.getBalance(this.account);
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
    const contract = new Contract(address, abi, this.signer || this.provider);
    return contract[method](...params, options);
  }

  async multicall(calls: CallParams[]): Promise<any[]> {
    //@ts-ignore
    const res = await this.multiCall.tryAll(calls.map((i) => this.readMultiContract(i)));
    res.forEach((v, i) => {
      const callback = calls[i].handler;
      if (typeof callback == 'function') {
        //@ts-ignore
        callback(v);
      } else {
        if (callback instanceof BigNumberState) {
          callback.setValue(new BigNumber(v.toString()));
        }
        if (callback instanceof NumberState) {
          callback.setValue(Number(v.toString()));
        }
        if (callback instanceof StringState) {
          callback.setValue(v.toString());
        }
      }
    });
    return res;
  }

  isAddress(address: string): boolean {
    return utils.isAddress(address);
  }
}
