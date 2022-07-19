import 'reflect-metadata';
import React, { useEffect, useMemo, useState } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import superjson from 'superjson';

import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';

import { useStore } from '@/store/index';
import { ETHProvider } from '../components/EthProvider';
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
            <WalletSelecter />
            <ETHProvider />
            {/* <Toaster /> */}
            {/* <Header /> */}
            <Component {...pageProps} />
          </Web3ReactProvider>
        </NotificationsProvider>
      </MantineProvider>
      {/* </ColorSchemeProvider> */}
    </>
  );
}
function getBaseUrl() {
  if (process.browser) {
    return '';
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      /**
       * @link https://trpc.io/docs/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) => process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error)
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`
        })
      ],
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
  /**
   * Set headers or status code when doing SSR
   */
  responseMeta({ clientErrors }) {
    if (clientErrors.length) {
      // propagate http first error from API calls
      return {
        status: clientErrors[0].data?.httpStatus ?? 500
      };
    }

    // for app caching with SSR see https://trpc.io/docs/caching

    return {};
  }
})(observer(MyApp));
