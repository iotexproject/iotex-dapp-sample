import { makeAutoObservable } from 'mobx';
import { StorageState } from './standard/StorageState';
import TokenState from './lib/TokenState';
import RootStore from './root';

export class TokenStore {
  rootStore: RootStore;
  localStorageToken = new StorageState<{ [key: number]: Partial<TokenState>[] }>({
    key: 'TokenStore.localStorageToken',
    default: {}
  });
  tokens: { [key: number]: TokenState[] } = {};
  tokenList = new StorageState<{ url: string, enable: boolean }[]>({
    key: 'TokenStore.tokenList',
    default: [
      { url: 'https://yearn.science/static/tokenlist.json', enable: false },
      { url: 'https://nftx.ethereumdb.com/v2/tokenlist/', enable: false },
      // { url: 'https://raw.githubusercontent.com/opynfinance/opyn-tokenlist/master/opyn-v1.tokenlist.json', enable: false },
      // { url: 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json', enable: false },
      // { url: 'https://www.gemini.com/uniswap/manifest.json', enable: false },
      { url: 'https://static.optimism.io/optimism.tokenlist.json', enable: false },
      { url: 'https://app.tryroll.com/tokens.json', enable: false },
      // { url: 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json', enable: false },
      { url: 'https://umaproject.org/uma.tokenlist.json', enable: false },
      { url: 'https://list.dhedge.eth.link/', enable: false },
    ]
  });

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
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
    return this.tokens[this.rootStore.god.currentChain.chainId] || [];
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
    this.localStorageToken.value[this.currentChain.chainId].unshift({
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
  deleteToken(address: string) {
    if (!this.localStorageToken.value[this.currentChain.chainId]) {
      this.localStorageToken.value[this.currentChain.chainId] = [];
    }
    this.localStorageToken.value[this.currentChain.chainId] =
      this.localStorageToken.value[this.currentChain.chainId].filter((i) => i.address !== address);
    this.localStorageToken.save(this.localStorageToken.value);
    this.currentTokens = [...this.currentTokens.filter((i) => i.address !== address)];
    this.sortToken();
  }
  sortToken() {
    this.currentTokens = this.currentTokens.length && this.currentTokens.sort((a, b) => b._balance.value.comparedTo(a._balance.value));
  }

  manageToken(data) {
    this.tokenList.save([...data]);
    this.loadTokens();
  }

  async loadPrivateData() {
    if (!this.god.currentNetwork.account) return;
    this.currentTokens.length && await this.currentNetwork.multicall(
      [
        ...this.currentTokens.map((i) => i.preMulticall({
          method: 'balanceOf',
          params: [this.currentNetwork.account],
          handler: i._balance
        })),
        ...this.currentTokens.map((i) => i.preMulticall({
          method: 'allowance',
          params: [this.currentNetwork.account, this.currentChain.info.zeroRouterAddr],
          handler: i.allowanceForRouter
        }))
      ].filter(Boolean)
    );
    this.sortToken();
  }

  async loadTokens() {
    const data: any = await Promise.all(this.tokenList.value.map(i => fetch(i?.url).then(response => response.json().then(d => {
      if (response?.status && response?.status === 200) {
        return { ...d, url: i?.url, enable: i?.enable };
      }
    }))));
    const tokens: TokenState[] = data.reduce(((p, c) => {
      p = c && Object.keys(c) && p.concat(c.enable && c.tokens.map(i => new TokenState({ ...i, tags: i?.tags || [] })));
      return p;
    }), []);
    const chainIdList = [];
    const temTokens = {};
    if (tokens.length) {
      for (const d of tokens) {
        if (!chainIdList.includes(d.chainId)) {
          chainIdList.push(d.chainId);
        }
      }
      for (const i of chainIdList) {
        temTokens[i] = tokens.filter((obj) => obj.chainId === i);
      }
    }
    if (this.localStorageToken.value && Object.keys(this.localStorageToken.value).length) {
      for (const i in this.localStorageToken.value) {
        temTokens[i] = this.localStorageToken.value[i].map(l => new TokenState({ ...l })).concat(temTokens[i] || [])
      }
    }
    this.tokenList.save(data);
    this.tokens = { ...temTokens } || {};
  }
}
