import { publicConfig } from 'config/public';
import localforage from 'localforage';
import * as memoryDriver from 'localforage-driver-memory';
import { helper } from './helper';

localforage.defineDriver(memoryDriver);

export const cacheStorage = localforage.createInstance({
  name: `${publicConfig.Project}-cache`,
  driver: helper.env.isBrower ? localforage.INDEXEDDB : memoryDriver._driver
});
