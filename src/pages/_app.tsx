import React, { useEffect, useMemo } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';

import { useStore } from '@/store/index';
import { Header } from '@/components/Header/index';
import { theme } from '@/lib/theme';
import { ETHProvider } from '../components/EthProvider';
import { getLibrary } from '../lib/web3-react';
import { WalletSelecter } from '../components/WalletSelecter/index';

function MyApp({ Component, pageProps }: AppProps) {
  const { lang, god } = useStore();
  useEffect(() => {
    lang.init();
    setInterval(() => {
      god.pollingData();
    }, 15000);
  }, []);
  // use useMemo to fix issue https://github.com/vercel/next.js/issues/12010
  return useMemo(() => {
    return (
      <ChakraProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <WalletSelecter />
          <ETHProvider />
          <Toaster />
          <Header />
          <Component {...pageProps} />
        </Web3ReactProvider>
      </ChakraProvider>
    )
  }, [Component, pageProps]);
}

export default MyApp;
