import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/modal';
import { useStore } from '../../store/index';
import { eventBus } from '../../lib/event';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { Button, Text, Flex, Center, Link, Tooltip, Box, Icon, chakra } from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';
import * as clipboard from 'clipboard-polyfill/text';
import { helper } from '@/lib/helper';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';
import { from } from '@iotexproject/iotex-address-ts';
import { NetworkState } from '@/store/lib/NetworkState';
import EnterSvg from '../../../public/images/enter.svg';

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
  console.log(`god.isIotxNetork`, god.isIotxNetork);
  return (
    <Modal isOpen={store.visible} size="lg" onClose={store.close} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="10">
          <Box>
            <Tooltip label="Copied" placement="bottom" isOpen={store.isTipOpen}>
              <Text
                display="flex"
                alignItems="center"
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
          </Box>
          {god.currentChain.networkKey === 'iotex' && (
            <>
              <Flex mt="8px">
                <chakra.img w="1.2rem" h="1.2rem" src={EnterSvg} />
                <Tooltip label="Copied" placement="bottom" isOpen={store.isIOTipOpen}>
                  <Text
                    display="flex"
                    alignItems="center"
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
              </Flex>
            </>
          )}
          <Box mt="16px">
            <Link target="_blank" display="flex" alignItems="center" href={`${god.currentChain.explorerURL}/address/${(god.currentNetwork as NetworkState).account}`}>
              View On {god.currentChain.explorerName}
              <ExternalLinkIcon ml="4px" w="1.4rem" h="1.4rem" />
            </Link>
          </Box>
          <Center>
            <Button mt="24px" onClick={store.logout} size="md">
              <Text>Logout</Text>
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
