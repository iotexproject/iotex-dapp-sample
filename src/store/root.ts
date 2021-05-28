import { BaseStore } from './base';
import { LangStore } from './lang';
import { GodStore } from './god';
import { TokenStore } from './token';

export class RootStore {
  base = new BaseStore();
  lang = new LangStore();
  god = new GodStore(this);
  token = new TokenStore(this);
}
