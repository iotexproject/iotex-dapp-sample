import { EventEmitter } from 'events';
import TypedEmitter from 'typed-emitter';

interface MessageEvents {
  'wallet.onAccount': () => void;
  'wallet.logout': () => void;
  'chain.switch': () => void;
}

export const eventBus = new EventEmitter() as TypedEmitter<MessageEvents>;
