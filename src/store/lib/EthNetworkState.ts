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
  // multiCall: MulticallProvider;
  allowChains: number[];

  get multiCall() {
    return this.currentChain.multiCall;
  }
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
      chain.multiCall = new MulticallProvider();
      chain.multiCall.provider = chain.provider;
      chain.multiCall.multicall = { address: chain.info.multicallAddr, block: 0 };
      chain.multiCall.multicall2 = { address: chain.info.multicall2Addr, block: 0 };
      //@ts-ignore
      this.dataloader[chain.chainId] = new DataLoader(
        async (calls) => {
          return chain.multiCall.tryAll(calls.map((i) => this.readMultiContract(i)));
        },
        { maxBatchSize: 100 }
      );
    });
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

  async multicall(calls: CallParams[], args: { crosschain?: boolean } = {}): Promise<any[]> {
    //@ts-ignore
    calls = calls.filter(Boolean);
    let res;
    if (args.crosschain) {
      res = await Promise.all(
        calls.map((i) => {
          return this.dataloader[i.chainId].load(i);
        })
      );
    } else {
      res = await this.multiCall.tryAll(calls.map((i) => this.readMultiContract(i)));
    }

    res.forEach((v, i) => {
      const callback = calls[i].handler;
      if (typeof callback == 'function') {
        //@ts-ignore
        callback(v);
      } else {
        helper.state.handleCallBack(callback, v, calls[i].method);
      }
    });
    return res;
  }

  isAddress(address: string): boolean {
    return utils.isAddress(address);
  }
}
