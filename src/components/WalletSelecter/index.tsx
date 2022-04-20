import React from 'react';
import { observer, useLocalObservable, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../lib/web3-react';

import { Box, Group, Modal, Tabs, TabsProps, Text, Avatar, AvatarsGroup, Badge } from '@mantine/core';
import { metamaskUtils } from '../../lib/metaskUtils';
import { useEffect } from 'react';

function StyledTabs(props: TabsProps) {
  return (
    <Tabs
      variant="unstyled"
      tabPadding="xl"
      styles={(theme) => ({
        tabControl: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]}`,
          fontSize: theme.fontSizes.sm,
          padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,

          '&:not(:first-of-type)': {
            borderLeft: 0
          },

          '&:first-of-type': {
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md
          },

          '&:last-of-type': {
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md
          }
        },

        tabActive: {
          backgroundColor: theme.colors.blue[7],
          borderColor: theme.colors.blue[7],
          color: theme.white
        }
      })}
      {...props}
    />
  );
}

export const WalletSelecter = observer(() => {
  const { god, lang } = useStore();
  const { active, error, activate } = useWeb3React();

  const store = useLocalObservable(() => ({
    get visible() {
      return god.eth.connector.showConnector;
    },
    get networks() {
      return god.currentNetwork.chain.set.filter((i) => i.type == 'mainnet');
    },
    get testnet() {
      return god.currentNetwork.chain.set.filter((i) => i.type == 'testnet');
    },
    close() {
      god.eth.connector.showConnector = false;
    },
    async setChain(val) {
      const chain = god.currentNetwork.chain.map[val];
      try {
        await metamaskUtils.setupNetwork({
          chainId: chain.chainId,
          blockExplorerUrls: [chain.explorerURL],
          chainName: chain.name,
          nativeCurrency: {
            decimals: chain.Coin.decimals || 18,
            name: chain.Coin.symbol,
            symbol: chain.Coin.symbol
          },
          rpcUrls: [chain.rpcUrl]
        });
        god.setChain(val);
      } catch (error) {
        console.log(error);
      }
    },
    connectInejct() {
      activate(injected);
      god.eth.connector.latestProvider.save('inject');
    },
    onWalletConnect() {
      // activate(walletconnect);
      god.eth.connector.latestProvider.save('walletConnect');
    }
  }));

  useEffect(() => {
    //@ts-ignore
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = () => {
        store.connectInejct();
      };
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          store.connectInejct();
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
  }, [active, error, activate]);

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
    <Modal opened={store.visible} overlayOpacity={0.45} centered onClose={store.close} title={lang.t(god.isConnect ? 'switch.network' : 'connect.to.wallet')}>
      <Box>
        <StyledTabs position="center">
          <Tabs.Tab label="Mainnet">
            <Group position="apart" p="md">
              {store.networks.map((i) => (
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={i.chainId}>
                  <Box style={{ position: 'relative' }}>
                    <Avatar
                      src={`//logo.chainbit.xyz/${i.Coin.symbol.toLowerCase()}`}
                      size={45}
                      style={{ cursor: 'pointer', background: 'transparent' }}
                      onClick={() => store.setChain(i.chainId)}
                    ></Avatar>
                    {god.currentChain.chainId == i.chainId && <Badge style={{ border: '2px solid white', position: 'absolute', right: -4, bottom: -4 }} size="xs" color="green" variant="filled" />}
                  </Box>
                  <Text size="xs" mt={1}>
                    {i.name}
                  </Text>
                </Box>
              ))}
            </Group>
          </Tabs.Tab>
          <Tabs.Tab label="Testnet">
            <Group position="apart" p="md">
              {store.testnet.map((i) => (
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={i.chainId}>
                  <Box style={{ position: 'relative' }}>
                    <Avatar
                      src={`//logo.chainbit.xyz/${i.Coin.symbol.toLowerCase()}`}
                      size={45}
                      style={{ cursor: 'pointer', background: 'transparent' }}
                      onClick={() => store.setChain(i.chainId)}
                    ></Avatar>
                    {god.currentChain.chainId == i.chainId && <Badge style={{ border: '2px solid white', position: 'absolute', right: -4, bottom: -4 }} size="xs" color="green" variant="filled" />}
                  </Box>
                  <Text size="xs" mt={1}>
                    {i.name}
                  </Text>
                </Box>
              ))}
            </Group>
          </Tabs.Tab>
        </StyledTabs>
        {!god.currentNetwork.account && (
          <Box>
            <Box onClick={store.connectInejct} my="12px" style={{ cursor: 'pointer', borderRadius: '8px', background: 'rgba(0,0,0,0.1)' }} p="14px" mt="24px">
              <Group spacing={2}>
                <Group direction="column" spacing={3}>
                  <Text style={{ fontSize: '20px', lineHeight: '26.38px', fontStyle: 'normal', fontWeight: '500' }}>{lang.t('browser.wallet')}</Text>
                  <Text color="gray.500" style={{ fontSize: '12px', lineHeight: '16.38px', fontStyle: 'normal', fontWeight: '500' }}>
                    ({names})
                  </Text>
                </Group>
                <Group>
                  <AvatarsGroup size="sm" limit={5}>
                    {config.map((item, index) => {
                      return <Avatar key={item.title} src={item.icon} />;
                    })}
                  </AvatarsGroup>
                </Group>
              </Group>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
});
