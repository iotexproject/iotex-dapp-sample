import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider } from 'ethers';
import { InjectedConnector } from 'wagmi/connectors/injected';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider()
});
