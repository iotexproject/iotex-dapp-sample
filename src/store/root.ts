import { LangStore } from './lang';
import { GodStore } from './god';
import { TokenStore } from './token';
import { UserStore } from './user';

export default class RootStore {
  lang = new LangStore();
  god = new GodStore(this);
  token = new TokenStore(this);
  user = new UserStore(this);
}
