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
  '*': ({ type: string, args: [] }) => void;
  'wallet.onAccount': () => void;
  'wallet.logout': () => void;
  'chain.switch': () => void;
  'global.cacheData': () => void;
  'history.insert': (transactionItem: TransactionItem) => void;
  'history.update': (transactionItem: TransactionItem) => void;
  'history.delete': (transactionItem: Pick<TransactionItem, 'uuid'>) => void;
}

export const eventBus = new MyEmitter() as TypedEmitter<MessageEvents>;

if (!publicConfig.isProd) {
  eventBus.on('*', ({ type, args }) => {
    console.log(type, args);
  });
}
