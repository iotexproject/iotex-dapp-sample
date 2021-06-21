import { LangStore } from './lang';
import { GodStore } from './god';
import { TokenStore } from './token';
import { MenuStore } from './menu'

export class RootStore {
  lang = new LangStore();
  god = new GodStore(this);
  token = new TokenStore(this);
  menu = new MenuStore()
}
