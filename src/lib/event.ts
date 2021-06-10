import { EventEmitter } from 'events';
import TypedEmitter from 'typed-emitter';
import { publicCOnfig } from '../config/public';

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
}

export const eventBus = new MyEmitter() as TypedEmitter<MessageEvents>;

if (!publicCOnfig.isProd) {
  eventBus.on('*', ({ type, args }) => {
    console.log(type, args);
  });
}
