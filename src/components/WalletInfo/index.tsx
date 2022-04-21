import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { eventBus } from '../../lib/event';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import * as clipboard from 'clipboard-polyfill/text';
import { helper } from '@/lib/helper';
import { from } from '@iotexproject/iotex-address-ts';
import { NetworkState } from '@/store/lib/NetworkState';
import { Box, Button, Modal, Group, Tooltip, Image, Anchor, Text, Center } from '@mantine/core';
import { Copy, ExternalLink } from 'tabler-icons-react';
import Jazzicon from '../Jazzicon/index';

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
    <Modal title={lang.t('account')} opened={store.visible} size="md" onClose={store.close} overlayOpacity={0.45} centered>
      <Box>
        <Group mt="30px">
          <Jazzicon diameter={30} address={god.currentNetwork.account || '0x......'} />
          <Tooltip label="Copied" position="bottom" opened={store.isTipOpen}>
            <Text
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              size="lg"
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
              {helper.string.truncate(god.currentNetwork.account || '0x......', 12, '...')}
              <Copy size={24} style={{ marginLeft: 4 }}></Copy>
            </Text>
          </Tooltip>
        </Group>
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
        <Group mt="20px">
          <Anchor
            size="sm"
            // backgroundClip="text"

            style={{ display: 'flex' }}
            target="_blank"
            href={`${god.currentChain.explorerURL}/address/${(god.currentNetwork as NetworkState).account}`}
          >
            <ExternalLink size="18" style={{ margin: '0px 2px' }} />
            {`View On ${god.currentChain.explorerName}`}
          </Anchor>
        </Group>
        <Center>
          <Button mt="24px" onClick={store.logout} fullWidth size="md" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
            <Text>Logout</Text>
          </Button>
        </Center>
      </Box>
    </Modal>
  );
});
