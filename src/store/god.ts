import { NetworkState } from './lib/NetworkState';
import { makeAutoObservable } from 'mobx';
import { MappingState } from './standard/MappingState';
import { EthNetworkConfig } from '../config/NetworkConfig';
import { ChainState } from './lib/ChainState';
import { EthNetworkState } from './lib/EthNetworkState';
import { RootStore } from './root';
import { NumberState } from './standard/base';

import { eventBus } from '../lib/event';

export type Network = 'eth' | 'bsc' | 'iotex';

export class GodStore {
  rootStore: RootStore;
  network: MappingState<NetworkState> = new MappingState({
    currentId: 'eth',
    map: {
      eth: EthNetworkConfig
    }
  });

  updateTicker = new NumberState();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
    EthNetworkConfig.god = this;
  }
  get isIotxNetork() {
    return this.network.currentId.value == 'iotex';
  }
  get isETHNetwork() {
    //@ts-ignore
    return ['eth', 'bsc'].includes(this.network.currentId.value);
  }

  get eth(): EthNetworkState {
    return this.network.map.eth as EthNetworkState;
  }

  get isConnect() {
    return !!this.currentNetwork.account;
  }
  get currentNetwork() {
    return this.network.current;
  }
  get currentChain(): ChainState {
    return this.currentNetwork.currentChain;
  }
  get Coin() {
    return this.currentChain.Coin;
  }

  setNetwork(val: Network) {
    this.network.setCurrentId(val);
  }
  setChain(val: number) {
    this.currentNetwork.chain.setCurrentId(val);
    eventBus.emit('chain.switch');
  }
  setShowConnecter(value: boolean) {
    this.eth.connector.showConnector = value;
  }
}
