import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { useStore } from '../../store/index';
import { eventBus } from '../../lib/event';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { Button, Text, Flex, Center, Link, Tooltip } from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';
import * as clipboard from 'clipboard-polyfill/text';
import { helper } from '@/lib/helper';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig'
import { from } from "@iotexproject/iotex-address-ts"

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
    <Modal isOpen={store.visible} size="lg" onClose={store.close} isCentered>
      <ModalOverlay />
      <ModalContent padding="10">
        <Center>
          <Tooltip label="Copied" placement="bottom" isOpen={store.isTipOpen}>
            <Text
              display="flex"
              alignItems="center"
              color="blue.400"
              cursor="pointer"
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
              <CopyIcon ml="4px" w="1.4rem" h="1.4rem" />
            </Text>
          </Tooltip>
        </Center>
        {  god.isIotxNetork && 
          <Center mt="8px">
          <Tooltip label="Copied" placement="bottom" isOpen={store.isIOTipOpen}>
            <Text
              display="flex"
              alignItems="center"
              color="blue.400"
              cursor="pointer"
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
              <CopyIcon ml="4px" w="1.4rem" h="1.4rem" />
            </Text>
          </Tooltip>
        </Center>
        }
        <Center mt="16px">
          <Link target="_blank" display="flex" alignItems="center" color="blue.400" href={`${god.currentChain.explorerURL}/adress/${god.currentChain.explorerName}`}>
            View On BscScan
            <ExternalLinkIcon ml="4px" w="1.4rem" h="1.4rem" />
          </Link>
        </Center>
        <Button mt="24px" onClick={store.logout} size="md">
          <Text>Logout</Text>
        </Button>
      </ModalContent>
    </Modal>
  );
});
