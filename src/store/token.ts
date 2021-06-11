import { makeAutoObservable } from 'mobx';
import pancakeTokenList from '@/constants/token/pancake-token-list.json';
import uniswapTokenList from '@/constants/token/uniswap-token-list.json';
import polygonTokenList from '@/constants/token/polygon-token-list.json';
import iotexTokenlist from '@/constants/token/iotex-token-list.json';
import { TokenState } from './lib/TokenState';
import { RootStore } from './root';
import { BSCMainnetConfig } from '../config/BSCMainnetConfig';
import { ETHMainnetConfig } from '../config/ETHMainnetConfig';
import { ETHKovanConfig } from '../config/ETHKovanConfig';
import { EthNetworkConfig } from '../config/NetworkConfig';
import { IotexTestnetConfig } from '../config/IotexTestnetConfig';
import { IotexMainnetConfig } from '../config/IotexMainnetConfig';
import { from } from '@iotexproject/iotex-address-ts';
import { PolygonMainnetConfig } from '../config/PolygonMainnetConfig';

export class TokenStore {
  rootStore: RootStore;
  tokens: { [key: number]: TokenState[] } = {};
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.tokens = {
      [BSCMainnetConfig.chainId]: pancakeTokenList.tokens.map((i) => new TokenState({ ...i, network: EthNetworkConfig })),
      [ETHMainnetConfig.chainId]: uniswapTokenList.tokens.filter((i) => i.chainId == ETHMainnetConfig.chainId).map((i) => new TokenState({ ...i, network: EthNetworkConfig })),
      [ETHKovanConfig.chainId]: uniswapTokenList.tokens.filter((i) => i.chainId == ETHKovanConfig.chainId).map((i) => new TokenState({ ...i, network: EthNetworkConfig })),
      [IotexTestnetConfig.chainId]: iotexTokenlist.tokens
        .filter((i) => i.chainId == IotexTestnetConfig.chainId)
        .map((i) => new TokenState({ ...i, address: from(i.address).stringEth(), network: EthNetworkConfig })),
      [IotexMainnetConfig.chainId]: iotexTokenlist.tokens
        .filter((i) => i.chainId == IotexMainnetConfig.chainId)
        .map((i) => new TokenState({ ...i, address: from(i.address).stringEth(), network: EthNetworkConfig })),
      [PolygonMainnetConfig.chainId]: polygonTokenList.tokens.map((i) => new TokenState({ ...i, network: EthNetworkConfig }))
    };
    makeAutoObservable(this, {
      rootStore: false
    });
  }
  get god() {
    return this.rootStore.god;
  }

  get currentNetwork() {
    return this.god.currentNetwork;
  }

  get currentTokens() {
    return this.tokens[this.rootStore.god.currentChain.chainId];
  }
  set currentTokens(val) {
    this.tokens[this.rootStore.god.currentChain.chainId] = val;
  }

  async loadPrivateData() {
    if (!this.god.currentNetwork.account) return;
    await this.currentNetwork.multicall([...this.currentTokens.map((i) => i.preMulticall({ method: 'balanceOf', params: [this.currentNetwork.account], handler: i.balance }))]);

    this.currentTokens = this.currentTokens.sort((a, b) => b.balance.value.comparedTo(a.balance.value));
  }
}
