import { WagmiConfig, createClient, useProvider, configureChains, useSigner, chain, Chain, useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName, useNetwork, useSignMessage } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { observer, useLocalObservable, useLocalStore } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { eventBus } from '../../lib/event';
import axios from 'axios';
import { SiweMessage } from 'siwe';

const createSiweMessage = async (address: string, chainId: number) => {
  const res = await axios.get(`/api/auth/nonce`);
  const message = new SiweMessage({
    address,
    chainId,
    statement: 'Sign in with Ethereum to the app.',
    domain: window.location.host,
    uri: window.location.origin,
    version: '1',
    nonce: res.data.nonce
  });
  return message.prepareMessage();
};

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
  const { god, user } = useStore();
  const { chain } = useNetwork();
  const { address, connector, isConnected } = useAccount();
  // const provider = useProvider();
  // const { data: signer } = useSigner();
  // const { data: ensAvatar } = useEnsAvatar({ address });
  // const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const store = useLocalStore(() => ({
    logout() {
      console.log('logggout');
      disconnect();
      god.currentNetwork.set({ account: '' });
      god.eth.connector.latestProvider.clear();
      store.clearToken();
    },
    async login() {
      try {
        const address = god.currentNetwork.account;
        const chainId = god.currentNetwork.currentChain.chainId;
        const message = await createSiweMessage(address, chainId);
        const signature = await signMessageAsync({
          message
        });
        const tokenRes = await axios.post(`/api/auth/jwt`, { message, signature });
        if (tokenRes.data) {
          user.token.save(tokenRes.data.token);
          user.tokenAddress.save(address);
          eventBus.emit('wallet.onToken');
        }
      } catch (error) {
        console.error('[handleLogin]', error);
      }
    },
    onAccount() {
      const account = god.currentNetwork.account.toLowerCase();
      const tokenAddress = user.tokenAddress.value ? user.tokenAddress.value.toLowerCase() : '';
      if (tokenAddress !== account) {
        store.clearToken();
        eventBus.emit('wallet.login');
      }
    },
    clearToken() {
      user.token.clear();
      user.token.value = undefined;
      user.tokenAddress.clear();
      user.tokenAddress.value = undefined;
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
        console.log('chain.switch', chainId);
        if (god.currentNetwork.allowChains.includes(chainId)) {
          god.setChainId(chainId);

          connector.getSigner().then((signer) => {
            console.log('connected!', address);
            god.currentNetwork.set({ account: address, signer });
            god.currentNetwork.loadBalance();
            eventBus.emit('wallet.onAccount');
          });
        }
      });
    }
    if (isConnected) {
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
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          god.currentNetwork.set({
            account: accounts[0]
          });
        }
      };
      ethereum.on('networkChanged', handleChainChanged);
      ethereum.on('close', handleChainChanged);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('networkChanged', handleChainChanged);
          ethereum.removeListener('close', handleChainChanged);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  //logout
  useEffect(() => {
    eventBus.addListener('wallet.logout', store.logout);
    eventBus.addListener('wallet.login', store.login);
    eventBus.addListener('wallet.onAccount', store.onAccount);
    return () => {
      eventBus.removeListener('wallet.logout', store.logout);
      eventBus.removeListener('wallet.login', store.login);
      eventBus.removeListener('wallet.onAccount', store.onAccount);
    };
  }, []);

  return <></>;
});
