import { EventEmitter } from "events";
import TypedEmitter from "typed-emitter";

interface MessageEvents {
  "client.iopay.connected": () => void;
  "client.iopay.close": () => void;
  "client.wallet.onAccount": () => void;
  "client.iopay.connectError": () => void;
  "client.wallet.iotx.onBalance": () => void;
}

export const eventBus = new EventEmitter() as TypedEmitter<MessageEvents>;
