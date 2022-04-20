import { makeAutoObservable } from 'mobx';
import RootStore from '@/store/root';
import { StorageState } from './standard/StorageState';
import { Home, Dashboard, FileText, Search, Wallet, Paint } from 'tabler-icons-react';
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
    sidebarOpen: new BooleanState()
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
