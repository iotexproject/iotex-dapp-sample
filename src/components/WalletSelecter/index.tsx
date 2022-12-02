import React from 'react';
import { observer, useLocalObservable, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
// import { useWeb3React } from '@web3-react/core';
import { injected } from '../../lib/web3-react';

import { Box, Group, Modal, Tabs, TabsProps, Text, Avatar, AvatarsGroup, Badge, SegmentedControl } from '@mantine/core';
import { metamaskUtils } from '../../lib/metaskUtils';
import { useEffect } from 'react';
import { StringState } from '../../store/standard/base';
import { useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

export const WalletSelecter = observer(() => {
  const { god, lang, ledger } = useStore();
  // const { active, error, activate } = useWeb3React();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  const store = useLocalObservable(() => ({
    network: new StringState<'mainnet' | 'testnet'>({ value: 'mainnet' }),
    get visible() {
      return god.eth.connector.showConnector;
    },
    get networks() {
      return god.currentNetwork.chain.set.filter((i) => i.type == store.network.value);
    },

    close() {
      god.eth.connector.showConnector = false;
    },
    async setChain(val) {
      god.switchChain(val);
    },
    connectInejct() {
      // activate(injected);
      connect({ connector: connectors[0] });
      // god.eth.connector.latestProvider.save('inject');
    },
    onWalletConnect() {
      // activate(walletconnect);
      // god.eth.connector.latestProvider.save('walletConnect');
    },
    connectIotexLedger() {
      ledger.ledger.call();
    }
  }));

  const config = [
    {
      title: 'Metamask',
      icon: '/images/metamask.svg'
    },
    {
      title: 'ioPay',
      icon: '/images/iopay.svg'
    },
    {
      title: 'Trust',
      icon: '/images/trustwallet.svg'
    },
    {
      title: 'Math',
      icon: '/images/mathwallet.svg'
    },
    {
      title: 'imToken',
      icon: '/images/imtoken.svg'
    }
  ];
  const names = config.map((item) => item.title).join(', ');
  return (
    <Modal opened={store.visible} overlayOpacity={0.45} centered onClose={store.close} title={lang.t(god.isConnect ? 'switch-network' : 'connect-to-wallet')}>
      <SegmentedControl data={['Mainnet', 'Testnet']} fullWidth onChange={(v) => store.network.setValue(v.toLowerCase() as any)} />
      <Box mt="xl">
        {/* <div>
          {connectors.map((connector) => (
            <button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}

          {error && <div>{error.message}</div>}
        </div> */}

        <Group position="apart" p="md">
          {store.networks.map((i) => (
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={i.chainId}>
              <Box style={{ position: 'relative' }}>
                <Avatar src={i.logoUrl} size={45} style={{ cursor: 'pointer', background: 'transparent' }} onClick={() => store.setChain(i.chainId)}></Avatar>
                {god.currentChain.chainId == i.chainId && <Badge style={{ border: '2px solid white', position: 'absolute', right: -4, bottom: -4 }} size="xs" color="green" variant="filled" />}
              </Box>
              <Text size="xs" mt={1}>
                {i.name}
              </Text>
            </Box>
          ))}
        </Group>
        {!god.currentNetwork.account && (
          <Box onClick={store.connectInejct} my="12px" style={{ cursor: 'pointer', borderRadius: '8px', background: 'rgba(0,0,0,0.1)' }} p="14px" mt="24px">
            <Group spacing={2} position="apart">
              <Group direction="column" spacing={3}>
                <Text style={{ fontSize: '20px', lineHeight: '26.38px', fontStyle: 'normal', fontWeight: '500' }}>{lang.t('browser-wallet')}</Text>
                <Text color="gray.500" style={{ fontSize: '12px', lineHeight: '16.38px', fontStyle: 'normal', fontWeight: '500' }}>
                  ({names})
                </Text>
              </Group>
              <Group position="right">
                <AvatarsGroup size="sm" limit={5}>
                  {config.map((item, index) => {
                    return <Avatar key={item.title} src={item.icon} />;
                  })}
                </AvatarsGroup>
              </Group>
            </Group>
          </Box>
        )}
        <Box onClick={store.connectIotexLedger} my="12px" style={{ cursor: 'pointer', borderRadius: '8px', background: 'rgba(0,0,0,0.1)' }} p="14px" mt="24px">
          <Group spacing={2} position="apart">
            <Group direction="column" spacing={3}>
              <Text style={{ fontSize: '20px', lineHeight: '26.38px', fontStyle: 'normal', fontWeight: '500' }}>{lang.t('ledger')}</Text>
            </Group>
          </Group>
        </Box>
      </Box>
    </Modal>
  );
});
