import { RootStore } from './root';
import React from 'react';

export const rootStore = new RootStore();

const StoresContext = React.createContext(rootStore);

export const useStore = () => React.useContext(StoresContext);

//@ts-ignore
window._store = rootStore;
