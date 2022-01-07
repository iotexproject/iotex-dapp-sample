import React from 'react';
import RootStore from './root';

export const rootStore = new RootStore();

const StoresContext = React.createContext(rootStore);

export const useStore = () => React.useContext(StoresContext);
