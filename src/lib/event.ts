import { TransactionItem } from '@/store/history';
import { EventEmitter } from 'events';
import TypedEmitter from 'typed-emitter';
import { publicConfig } from '../config/public';

class MyEmitter extends EventEmitter {
  emit(type: any, ...args: any[]) {
    super.emit('*', { type, args });
    return super.emit(type, ...args) || super.emit('', ...args);
  }
}

interface MessageEvents {
  '*': (agrgs: { type: string; args: [] }) => void;
  'wallet.onAccount': () => void;
  'wallet.login': () => Promise<void>;
  'wallet.onToken': () => void;
  'wallet.logout': () => void;
  'chain.switch': () => void;
  'global.cacheData': () => void;
  'history.insert': (transactionItem: TransactionItem) => void;
  'history.update': (transactionItem: TransactionItem) => void;
  'history.delete': (transactionItem: Pick<TransactionItem, 'uuid'>) => void;
  signer: (signer: any) => void;
  provider: (signer: any) => void;
  [key: string]: any;
}

export const eventBus = new MyEmitter() as TypedEmitter<MessageEvents>;

if (!publicConfig.isProd) {
  eventBus.on('*', ({ type, args }) => {
    console.log('*', type, args);
  });
}
