import { makeAutoObservable } from 'mobx';
import { MappingState } from './standard/MappingState';
import { ChainState } from './lib/ChainState';
import { EthNetworkState } from './lib/EthNetworkState';
import RootStore from './root';
import { BooleanState, NumberState } from './standard/base';
import { eventBus } from '../lib/event';
import { rpc } from '../lib/smartgraph/gql';
import { CoinState } from './lib/CoinState';
import { ethers } from 'ethers';
import { defaultNetworks } from '../config/chain';
import { metamaskUtils } from '../lib/metaskUtils';

export class GodStore {
  rootStore: RootStore;
  network: EthNetworkState;
  showTransactionSubmitDialog = new BooleanState();
  curTransaction: ethers.providers.TransactionResponse = null;
  updateTicker = new NumberState();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
    this.network = new EthNetworkState({
      // allowChains: data.networks.map((i) => i.chainId),
      god: this,
      chain: new MappingState({
        currentId: 4689,
        map: defaultNetworks
          .map(
            (i) =>
              new ChainState({
                name: i.name,
                chainId: i.chainId,
                explorerName: i.explorerName,
                explorerURL: i.explorerUrl,
                info: { theme: { bgGradient: '' } },
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

  getNetworkByChainId(chainId: number) {
    return this.currentNetwork.chain.map[chainId];
  }

  async switchChain(chianId: number) {
    const chain = this.currentNetwork.chain.map[chianId];
    try {
      await metamaskUtils.setupNetwork({
        chainId: chain.chainId,
        blockExplorerUrls: [chain.explorerURL],
        chainName: chain.name,
        nativeCurrency: {
          decimals: chain.Coin.decimals || 18,
          name: chain.Coin.symbol,
          symbol: chain.Coin.symbol
        },
        rpcUrls: [chain.rpcUrl]
      });
      this.setChainId(chianId);
      eventBus.emit('chain.switch');
    } catch (error) {
      console.log(error);
    }
  }
  setChainId(chianId) {
    this.currentNetwork.chain.setCurrentId(chianId);
  }
  setShowConnecter(value: boolean) {
    this.eth.connector.showConnector = value;
  }

  pollingData() {
    this.updateTicker.setValue(this.updateTicker.value + 1);
  }
}
