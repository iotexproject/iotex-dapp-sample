import { makeAutoObservable } from 'mobx';
import RootStore from '@/store/root';
import { StorageState } from './standard/StorageState';
import { Home, Dashboard, LayersLinked, Code as CodeIcon, Wallet, Paint } from 'tabler-icons-react';
import { rootStore } from '../store/index';
import type { SpotlightAction } from '@mantine/spotlight';
import { BooleanState } from './standard/base';

export class UserStore {
  rootStore: RootStore;
  token = new StorageState<string>({ key: 'token' });
  tokenAddress = new StorageState<string>({ key: 'token-address' });
  theme = new StorageState<'light' | 'dark'>({
    key: 'theme',
    default: 'light'
  });
  layout = {
    sidebarOpen: new BooleanState(),
    navbarMode: 'top' as 'left' | 'top',
    showHistoryButton: new BooleanState(),
    router: [
      { link: '/', label: 'home', icon: Home },
      { link: '/swap', label: 'example', icon: CodeIcon },
      { link: '/api/graphql', label: 'playground', icon: LayersLinked, __blank: true }
    ]
  };
  networkChecker = {
    supportChainIds: {},
    isWrongNetworkDialogOpen: new BooleanState({ value: false })
  };
  get actions(): SpotlightAction[] {
    return [
      {
        title: 'Home',
        description: 'Get to home page',
        onTrigger: () => console.log('Home'),
        icon: <Home size={18} />
      },
      {
        title: 'Connect Wallet',
        description: 'Connect Wallet',
        onTrigger: () => {
          rootStore.god.setShowConnecter(true);
        },
        icon: <Wallet size={18} />
      },
      {
        title: 'Switch Theme',
        description: 'Switch Theme',
        onTrigger: () => {
          this.toggleTheme();
        },
        icon: <Paint size={18} />
      }
    ];
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get isDark() {
    return this.theme.value == 'dark';
  }

  toggleTheme() {
    this.theme.save(this.isDark ? 'light' : 'dark');
  }

  enableNetworkChecker(path: string, value: number[]) {
    this.networkChecker.supportChainIds[path] = value;
  }

  setWrongNetworkDialog(value: boolean) {
    this.networkChecker.isWrongNetworkDialogOpen.setValue(value);
  }

  wetherWrongnetwork(key: string) {
    const supportChainId = this.networkChecker.supportChainIds[key] || [];
    if (supportChainId.length === 0) return false;
    if (!rootStore.god.isConnect) return false;
    if (!supportChainId.some((i) => i === rootStore.god.currentChain.chainId)) {
      return true;
    }
    return false;
  }
}
