import { publicConfig } from './../config/public';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';
import { WalletConnectConnector, UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@iotexproject/walletconnect-connector';
import { UnsupportedChainIdError } from '@web3-react/core';

const POLLING_INTERVAL = 12000;
export const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${publicConfig.infuraId}`,
  42: `https://kovan.infura.io/v3/${publicConfig.infuraId}`,
  56: 'https://bsc-dataseed.binance.org',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  4689: 'https://babel-api.mainnet.iotex.io/',
  4690: `https://babel-api.testnet.iotex.io`,
  137: 'https://rpc-mainnet.maticvigil.com/'
};

export const allowChains = Object.keys(RPC_URLS).map((i) => Number(i));

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

export const injected = new InjectedConnector({ supportedChainIds: allowChains });

export const walletconnect = new WalletConnectConnector({
  rpc: { 4689: RPC_URLS[4689] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

export function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (error instanceof UserRejectedRequestError || error instanceof UserRejectedRequestErrorWalletConnect) {
    return 'Please authorize this website to access your Ethereum account.';
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details.';
  }
}
