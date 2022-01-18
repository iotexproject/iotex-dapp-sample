import { publicConfig } from 'config/public';
import localforage from 'localforage';

export const cacheStorage = localforage.createInstance({
  name: `${publicConfig.Project}-cache`,
  driver: localforage.INDEXEDDB
});
