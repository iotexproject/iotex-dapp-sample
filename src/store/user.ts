import { makeAutoObservable } from 'mobx';
import RootStore from '@/store/root';
import { StorageState } from './standard/StorageState';

export class UserStore {
  rootStore: RootStore;
  theme = new StorageState<'light' | 'dark'>({
    key: 'theme',
    default: 'light'
  });
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
