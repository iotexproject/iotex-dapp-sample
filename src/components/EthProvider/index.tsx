import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { injected } from '@/lib/web3-react';
import { eventBus } from '../../lib/event';
import { _ } from '@/lib/lodash';
import { Web3Provider } from '@ethersproject/providers';
import { showNotification } from '@mantine/notifications';

export const ETHProvider = observer(({ children }) => {
  const { god, lang } = useStore();
  const { chainId, account, activate, active, library, deactivate, error, connector } = useWeb3React<Web3Provider>();

  const store = useLocalStore(() => ({
    logout() {
      deactivate();
      god.eth.connector.latestProvider.clear();
    },
    wrongNetwork() {
      toast.error(lang.t('wrong-network'), { id: 'wrong-network' });
    }
  }));

  useEffect(() => {
    if (error) {
      showNotification({
        title: 'Error',
        message: error.message,
        color: 'red'
      });
    }
    if (chainId) {
      if (god.currentNetwork.allowChains.includes(chainId)) {
        god.setChain(chainId);
      }
    }

    god.currentNetwork.setAccount(account);
    //@ts-ignore
    god.eth.provider = library ? library : god.eth.defaultEthers;
    god.eth.signer = library ? library.getSigner() : null;

    god.currentNetwork.loadBalance();

    if (account) {
      eventBus.emit('wallet.onAccount');
      god.setShowConnecter(false);
    }
    god.updateTicker.setValue(god.updateTicker.value + 1);
  }, [god, library, chainId, account, active, error]);

  useEffect(() => {
    if (activate && god.eth.connector.latestProvider.value) {
      if (god.eth.connector.latestProvider.value == 'inject') {
        activate(injected);
      }
    }
  }, [activate, god.eth.connector.latestProvider.value]);

  useEffect(() => {
    eventBus.addListener('wallet.logout', store.logout);
    return () => {
      eventBus.removeListener('wallet.logout', store.logout);
    };
  }, []);

  return <></>;
});
