import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { IotexMulticall } from '../../lib/multicall';
import { Contract } from 'iotex-antenna/lib/contract/contract';
import multicallABI from './IotexMulticall.json';
// import { fromString } from 'iotex-antenna/lib/crypto/address';
import { helper } from '../../lib/helper';
import { eventBus } from '../../lib/event';

export const IotexProvider = observer(() => {
  const { god } = useStore();

  const store = useLocalObservable(() => ({
    logout() {
      god.iotex.account = null;
      delete god.iotex.antenna;
      god.iotex.connector.latestProvider.clear();
    }
  }));
  useEffect(() => {
    const antenna = god.iotex.getAntenna();
    // const multicallAddr = fromString(god.iotex.currentChain.info.multicallAddr).string();
    god.iotex.multiCall = new IotexMulticall({
      contract: new Contract(multicallABI, god.iotex.currentChain.info.multicallAddr, { provider: antenna.iotx })
    });

    // god.loadPublichData();
    if (god.iotex.account) {
      // god.loadPrivateData();
      god.setShowConnecter(false);
    }
  }, [god.iotex.account]);

  useEffect(() => {
    if (god.iotex.connector.latestProvider.value) {
      god.iotex.activeConnector();
    }
  }, [god.iotex.connector.latestProvider.value]);

  useEffect(() => {
    if (helper.env.isIopayMobile) {
      god.iotex.activeConnector();
    }
    eventBus.addListener('wallet.logout', store.logout);
    return () => {
      eventBus.removeListener('wallet.logout', store.logout);
    };
  }, []);

  return <div></div>;
});
