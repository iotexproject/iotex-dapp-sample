import { NetworkState } from './lib/NetworkState';
import { makeAutoObservable } from 'mobx';
import { MappingState } from './standard/MappingState';
import { ChainState } from './lib/ChainState';
import { EthNetworkState } from './lib/EthNetworkState';
import RootStore from './root';
import { NumberState } from './standard/base';
import { eventBus } from '../lib/event';
import { rpc } from '../lib/smartgraph/gql';
import { CoinState } from './lib/CoinState';

export enum Network {
  ETH = 'eth',
  BSC = 'bsc',
  IOTEX = 'iotex',
  POLYGON = 'polygon'
}

export class GodStore {
  rootStore: RootStore;
  network: EthNetworkState;
  updateTicker = new NumberState();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
    rpc('query')({
      networks: {
        name: true,
        chainId: true,
        rpcUrl: true,
        logoUrl: true,
        explorerUrl: true,
        explorerName: true,
        nativeCoin: true,
        blockPerSeconds: true,
        multicallAddr: true
      }
    }).then((data) => {
      this.network = new EthNetworkState({
        allowChains: data.networks.map((i) => i.chainId),
        god: this,
        chain: new MappingState({
          currentId: 4689,
          map: data.networks
            .map(
              (i) =>
                new ChainState({
                  name: i.name,
                  chainId: i.chainId,
                  explorerName: i.explorerName,
                  explorerURL: i.explorerUrl,
                  info: { multicallAddr: i.multicallAddr, multicall2Addr: i.multicallAddr, blockPerSeconds: i.blockPerSeconds, theme: { bgGradient: '' } },
                  logoUrl: i.logoUrl,
                  rpcUrl: i.rpcUrl,
                  //@ts-ignore
                  type: i.type,
                  Coin: new CoinState({
                    symbol: i.nativeCoin,
                    decimals: 18
                  })
                })
            )
            .reduce((p, c) => {
              p[c.chainId] = c;
              return p;
            }, {})
        })
      });
    });
  }

  get eth(): EthNetworkState {
    return this.network;
  }

  get isConnect() {
    return !!this.currentNetwork.account;
  }
  get currentNetwork() {
    return this.network;
  }
  get currentChain(): ChainState {
    return this.currentNetwork.currentChain;
  }
  get Coin() {
    return this.currentChain.Coin;
  }

  setChain(val: number) {
    this.currentNetwork.chain.setCurrentId(val);
    eventBus.emit('chain.switch');
  }
  setShowConnecter(value: boolean) {
    this.eth.connector.showConnector = value;
  }

  pollingData() {
    this.updateTicker.setValue(this.updateTicker.value + 1);
  }
}
