import { makeAutoObservable } from 'mobx';
import pancakeTokenList from '@/constants/token/pancake-token-list.json';
import uniswapTokenList from '@/constants/token/uniswap-token-list.json';
import polygonTokenList from '@/constants/token/polygon-token-list.json';
import iotexTokenlist from '@/constants/token/iotex-token-list.json';
import { from } from '@iotexproject/iotex-address-ts';

import { BSCMainnetConfig } from '../config/BSCMainnetConfig';
import { ETHMainnetConfig } from '../config/ETHMainnetConfig';
import { ETHKovanConfig } from '../config/ETHKovanConfig';
import { EthNetworkConfig } from '../config/NetworkConfig';
import { IotexTestnetConfig } from '../config/IotexTestnetConfig';
import { IotexMainnetConfig } from '../config/IotexMainnetConfig';

import { PolygonMainnetConfig } from '../config/PolygonMainnetConfig';
import { StorageState } from './standard/StorageState';
import TokenState from './lib/TokenState';
import RootStore from './root';
import { _ } from '@/lib/lodash';

export class TokenStore {
  rootStore: RootStore;
  localStorageToken = new StorageState<{ [key: number]: Partial<TokenState>[] }>({ key: 'TokenStore.localStorageToken', default: {} });
  tokens: { [key: number]: TokenState[] } = {};
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    console.log(this.localStorageToken.value);
    this.tokens = {
      [BSCMainnetConfig.chainId]: pancakeTokenList.tokens.concat(this.localStorageToken.value[BSCMainnetConfig.chainId] || []).map((i) => new TokenState(i)),
      [ETHMainnetConfig.chainId]: uniswapTokenList.tokens
        .filter((i) => i.chainId == ETHMainnetConfig.chainId)
        .concat(this.localStorageToken.value[ETHMainnetConfig.chainId] || [])
        .map((i) => new TokenState(i)),
      [ETHKovanConfig.chainId]: uniswapTokenList.tokens
        .filter((i) => i.chainId == ETHKovanConfig.chainId)
        .concat(this.localStorageToken.value[ETHKovanConfig.chainId] || [])
        .map((i) => new TokenState(i)),
      [IotexTestnetConfig.chainId]: iotexTokenlist.tokens
        .filter((i) => i.chainId == IotexTestnetConfig.chainId)
        .concat(this.localStorageToken.value[IotexTestnetConfig.chainId] || [])
        .map((i) => new TokenState({ ...i, address: from(i.address).stringEth() })),
      [IotexMainnetConfig.chainId]: iotexTokenlist.tokens
        .filter((i) => i.chainId == IotexMainnetConfig.chainId)
        .concat(this.localStorageToken.value[IotexMainnetConfig.chainId] || [])
        .map((i) => new TokenState({ ...i, address: from(i.address).stringEth() })),
      [PolygonMainnetConfig.chainId]: polygonTokenList.tokens.concat(this.localStorageToken.value[PolygonMainnetConfig.chainId] || []).map((i) => new TokenState(i))
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

  get currentChain() {
    return this.currentNetwork.currentChain;
  }

  saveToken(item: TokenState) {
    if (!this.localStorageToken.value[this.currentChain.chainId]) {
      this.localStorageToken.value[this.currentChain.chainId] = [];
    }
    this.localStorageToken.value[this.currentChain.chainId].push({
      address: item.address,
      name: item.name,
      symbol: item.symbol,
      decimals: item.decimals,
      saved: true
    });
    item.isNew = false;
    item.saved = true;
    this.localStorageToken.save(this.localStorageToken.value);
    this.currentTokens = [item, ...this.currentTokens];
    this.sortToken();
  }

  sortToken() {
    this.currentTokens = this.currentTokens.sort((a, b) => b._balance.value.comparedTo(a._balance.value));
  }

  async loadPrivateData() {
    if (!this.god.currentNetwork.account) return;
    await this.currentNetwork.multicall([
      ...this.currentTokens.filter((i) => !i.isEther).map((i) => i.preMulticall({ method: 'balanceOf', params: [this.currentNetwork.account], handler: i._balance }))
    ]);

    this.sortToken();
  }
}
