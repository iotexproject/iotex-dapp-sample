import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig, useConnect } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useAccount, useSigner, useDisconnect } from 'wagmi';
import { useEffect } from 'react';
import { useStore } from '../store/index';
import { eventBus } from './event';

const { chains, provider } = configureChains([chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum], [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'Dapp V3',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

const ETHProvider = ({ children }) => {
  const { data: user } = useAccount();
  const { god } = useStore();
  const { data: signer } = useSigner();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (user?.address) {
      god.currentNetwork.setAccount(user.address);
    } else {
      god.currentNetwork.setAccount(null);
    }
  }, [user]);

  useEffect(() => {
    //@ts-ignore
    const chainId = signer?.provider?._network?.chainId;
    if (god.currentNetwork.allowChains.includes(chainId)) {
      god.setChain(chainId);
    }
    god.eth.signer = signer;
    //@ts-ignore
    god.eth.provider = signer?.provider;
  }, [signer]);

  useEffect(() => {
    eventBus.addListener('wallet.logout', disconnect);
  }, []);

  return <>{children}</>;
};

export const RainbowProvider = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ETHProvider>{children}</ETHProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
