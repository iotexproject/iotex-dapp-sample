import { LangStore } from './lang';
import { GodStore } from './god';
import { UserStore } from './user';
import { TransactionHistoryStore } from './history';
import { Ledger } from './ledger';

export default class RootStore {
  lang = new LangStore();
  god = new GodStore(this);
  user = new UserStore(this);
  ledger = new Ledger(this);
  history = new TransactionHistoryStore(this);
}
