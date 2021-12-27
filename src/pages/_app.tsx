import React, { useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ChakraProvider, Button, Container, Center } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from 'react-error-boundary';

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
  );
}

export default MyApp;
