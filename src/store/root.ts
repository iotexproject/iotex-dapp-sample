import { LangStore } from './lang';
import { GodStore } from './god';
import { UserStore } from './user';

export default class RootStore {
  lang = new LangStore();
  god = new GodStore(this);
  user = new UserStore(this);
}
