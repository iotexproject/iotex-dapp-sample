import { WagmiConfig, createClient, useProvider, configureChains, useSigner, chain, Chain, useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName, useNetwork } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { observer, useLocalObservable, useLocalStore } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { eventBus } from '../../lib/event';

export const WagmiProvider = observer(({ children }) => {
  const { god } = useStore();

  let godChains: Chain[] = [];

  for (let key in god.network.chain.map) {
    let chain: Chain = {
      id: god.network.chain.map[key].chainId,
      name: god.network.chain.map[key].name,
      rpcUrls: {
        default: god.network.chain.map[key].rpcUrl
      },
      network: god.network.chain.map[key].name
    };
    godChains.push(chain);
  }

  const { chains, provider, webSocketProvider } = configureChains(godChains, [publicProvider()]);
  console.log('chains', chains);

  const client = createClient({
    autoConnect: true,
    connectors: [
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          //auto choose other account = false
          shimDisconnect: false
        }
      })
      // new MetaMaskConnector({ chains }),
      // new CoinbaseWalletConnector({
      //   chains,
      //   options: {
      //     appName: 'wagmi'
      //   }
      // }),
      // new WalletConnectConnector({
      //   chains,
      //   options: {
      //     qrcode: true
      //   }
      // }),
    ],
    provider,
    webSocketProvider
  });

  return (
    <WagmiConfig client={client}>
      <Wallet></Wallet>
      {children}
    </WagmiConfig>
  );
});

const Wallet = observer(() => {
  const { god } = useStore();
  const { chain } = useNetwork();
  const { address, connector, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const store = useLocalStore(() => ({
    logout() {
      console.log('logggout');
      disconnect();
      god.currentNetwork.setAccount('');
      god.eth.connector.latestProvider.clear();
    }
  }));

  useEffect(() => {
    if (error) {
      if (error.message.includes('Connector already connected')) return;
      showNotification({
        title: 'Error',
        message: error.message,
        color: 'red'
      });
    }
    if (connector) {
      connector.getChainId().then((chainId) => {
        console.log('chain.switch', chain?.id);
        if (god.currentNetwork.allowChains.includes(chainId)) {
          god.setChain(chainId);
        }
      });
      god.eth.provider = provider;
      god.eth.signer = signer;
      god.currentNetwork.loadBalance();
    }

    if (isConnected) {
      console.log('connected!', address);
      god.currentNetwork.setAccount(address);
      try {
        god.currentNetwork.loadBalance();
      } catch (err) {}
      eventBus.emit('wallet.onAccount');
      god.setShowConnecter(false);
    }
  }, [isConnected, error, connector, address, chain]);

  useEffect(() => {
    //@ts-ignore
    const { ethereum } = window;
    if (ethereum && ethereum.on) {
      const handleChainChanged = () => {
        connect({ connector: connectors[0] });
        god.currentNetwork.loadBalance();
      };
      ethereum.on('networkChanged', handleChainChanged);
      ethereum.on('close', handleChainChanged);
      ethereum.on('chainChanged', handleChainChanged);
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('networkChanged', handleChainChanged);
          ethereum.removeListener('close', handleChainChanged);
          ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  //logout
  useEffect(() => {
    eventBus.addListener('wallet.logout', store.logout);
    return () => {
      eventBus.removeListener('wallet.logout', store.logout);
    };
  }, []);

  return <></>;
});
