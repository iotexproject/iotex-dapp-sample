import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/store/root';
import { rootStore } from './index';
import { DynamicMappingState } from './standard/MappingState';
import { IotexTestnetConfig } from '../config/IotexTestnetConfig';
import { MintState } from './lib/MintState';
import { IotexMainnetConfig } from '../config/IotexMainnetConfig';

export class MintStore {
  mints = new DynamicMappingState<MintState>({
    map: {
      [IotexTestnetConfig.chainId]: new MintState({
        address: '0xBd56D80b1223fa205Ae7EFB8468fEA13BE106153'
      }),
      [IotexMainnetConfig.chainId]: new MintState({
        address: ''
      })
    },
    getId: () => {
      return this.rootStore.god.currentChain.chainId;
    }
  });

  get mint() {
    return this.mints.current;
  }

  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}
