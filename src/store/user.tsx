import { makeAutoObservable } from 'mobx';
import RootStore from '@/store/root';
import { StorageState } from './standard/StorageState';
import { Home, Dashboard, LayersLinked, Code as CodeIcon, Wallet, Paint } from 'tabler-icons-react';
import { rootStore } from '../store/index';
import type { SpotlightAction } from '@mantine/spotlight';
import { BooleanState } from './standard/base';

export class UserStore {
  rootStore: RootStore;
  theme = new StorageState<'light' | 'dark'>({
    key: 'theme',
    default: 'light'
  });
  layout = {
    sidebarOpen: new BooleanState(),
    navbarMode: 'top' as 'left' | 'top',
    router: [
      { link: '/', label: 'home', icon: Home },
      { link: '/swap', label: 'example', icon: CodeIcon },
      { link: '/api/graphql', label: 'playground', icon: LayersLinked, __blank: true }
    ]
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
}
