import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { eventBus } from '../../lib/event';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';
import * as clipboard from 'clipboard-polyfill/text';
import { helper } from '@/lib/helper';
import { from } from '@iotexproject/iotex-address-ts';
import { NetworkState } from '@/store/lib/NetworkState';
import { Box, Button, Modal, Group, Tooltip, Image, Anchor, Text, Center } from '@mantine/core';
import { Copy } from 'tabler-icons-react';

export const WalletInfo = observer(() => {
  const { god, lang } = useStore();

  const store = useLocalStore(() => ({
    isTipOpen: false,
    isIOTipOpen: false,
    get visible() {
      return god.currentNetwork.walletInfo.visible;
    },
    close() {
      god.currentNetwork.walletInfo.visible = false;
    },
    copy() {
      copy(god.currentNetwork.account);
      toast.success(lang.t('address.copied'));
    },
    logout() {
      eventBus.emit('wallet.logout');
      store.close();
    },
    toggleTipOpen(val: boolean) {
      this.isTipOpen = val;
    },
    toggleIOTipOpen(val: boolean) {
      this.isTipOpen = val;
    }
  }));

  return (
    <Modal title={lang.t('account')} opened={store.visible} size="lg" onClose={store.close} overlayOpacity={0.45} centered>
      <Box>
        <Box>
          <Tooltip label="Copied" position="bottom" opened={store.isTipOpen}>
            <Text
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={async () => {
                const [error] = await helper.promise.runAsync(clipboard.writeText(god.currentNetwork.account));
                if (!error) {
                  store.toggleTipOpen(true);
                  setTimeout(() => {
                    store.toggleTipOpen(false);
                  }, 500);
                }
              }}
            >
              {god.currentNetwork?.account}
              {/* <CopyIcon ml="4px" w="1rem" h="1rem" /> */}
              <Copy size={24} style={{marginLeft: 4}}></Copy>
            </Text>
          </Tooltip>
        </Box>
        {god.Coin.symbol === 'iotex' && (
          <>
            <Group mt="8px" spacing={8}>
              <Image style={{ width: '1.2rem', height: '1.2rem' }} src="/images/enter.svg" />
              <Tooltip label="Copied" position="bottom" opened={store.isIOTipOpen}>
                <Text
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  size="sm"
                  onClick={async () => {
                    const [error] = await helper.promise.runAsync(clipboard.writeText(from(god.currentNetwork.account)?.string()));
                    if (!error) {
                      store.toggleIOTipOpen(true);
                      setTimeout(() => {
                        store.toggleIOTipOpen(false);
                      }, 500);
                    }
                  }}
                >
                  {god.currentNetwork?.account && from(god.currentNetwork.account)?.string()}
                  {/* <CopyIcon ml="4px" w="1rem" h="1rem" /> */}
                  <Copy size={24}></Copy>
                </Text>
              </Tooltip>
            </Group>
          </>
        )}
        <Group mt="20px" position="center">
          <Group position="center">
            <Anchor
              size="sm"
              // backgroundClip="text"
              style={{ backgroundImage: god.currentChain.info.theme.bgGradient, display: 'flex' }}
              align="center"
              target="_blank"
              href={`${god.currentChain.explorerURL}/address/${(god.currentNetwork as NetworkState).account}`}
            >
              {`View On ${god.currentChain.explorerName}`}
            </Anchor>
            <ExternalLinkIcon ml="4px" w="1rem" h="1rem" />
          </Group>
        </Group>
        <Center>
          <Button mt="24px" onClick={store.logout} size="md">
            <Text>Logout</Text>
          </Button>
        </Center>
      </Box>
    </Modal>
  );
});
