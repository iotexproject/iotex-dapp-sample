import 'reflect-metadata';
import React, { useEffect, useMemo, useState } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import superjson from 'superjson';

import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';

import { useStore } from '@/store/index';
import { getLibrary } from '../lib/web3-react';
import { WalletSelecter } from '../components/WalletSelecter/index';
import { AppRouter } from '@/server/routers/_app';
import { MantineProvider, ColorSchemeProvider, ColorScheme, Global } from '@mantine/core';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { helper } from '../lib/helper';
import { NotificationsProvider } from '@mantine/notifications';
import '../i18n/config';
import { smartGraph } from '../lib/smartgraph/index';
import { WrongNetworkDialog } from '@/components/NetworkCheckProvider';
import { TransactionSubmitDialog } from '@/components/HistoryModal';
import { WagmiProvider } from '@/components/WagmiProvider';
import { withTRPC } from '@trpc/next';
import { trpc } from '@/lib/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  const { lang, god, user } = useStore();
  const store = useLocalObservable(() => ({
    get colorScheme() {
      return user.theme.value || ('dark' as ColorScheme);
    }
  }));

  useEffect(() => {
    lang.init();
    // setInterval(() => {
    //   god.pollingData();
    // }, 15000);
    smartGraph.event.on('provider.newBlock', (chainId, blockNumber) => {
      console.log('new block', chainId, blockNumber);
      if (chainId == god.currentChain.chainId) {
        god.pollingData();
      }
    });
  }, []);

  if (!helper.env.isBrower) {
    return <div></div>;
  }

  // use useMemo to fix issue https://github.com/vercel/next.js/issues/12010
  return (
    <>
      {/* <ColorSchemeProvider colorScheme={store.colorScheme} toggleColorScheme={user.toggleTheme}> */}
      <MantineProvider theme={{ fontFamily: 'Oxanium, sans-serif;', colorScheme: store.colorScheme }} withGlobalStyles withNormalizeCSS>
        <Global
          styles={(theme) => ({
            body: {}
          })}
        />
        <NotificationsProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <WrongNetworkDialog />
            <TransactionSubmitDialog />
            {/* <ETHProvider /> */}
            <WagmiProvider>
              <WalletSelecter />
              <Component {...pageProps} />
            </WagmiProvider>
            {/* <Toaster /> */}
            {/* <Header /> */}
          </Web3ReactProvider>
        </NotificationsProvider>
      </MantineProvider>
      {/* </ColorSchemeProvider> */}
    </>
  );
}

export default trpc.withTRPC(observer(MyApp));
