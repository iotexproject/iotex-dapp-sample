import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/modal';
import { useStore } from '../../store/index';
import { eventBus } from '../../lib/event';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { Button, Text, Flex, Center, Link, Tooltip, Box, Icon, chakra, useColorModeValue } from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';
import * as clipboard from 'clipboard-polyfill/text';
import { helper } from '@/lib/helper';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';
import { from } from '@iotexproject/iotex-address-ts';
import { NetworkState } from '@/store/lib/NetworkState';

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
  const bW = useColorModeValue('3px', '1px');

  return (
    <Modal isOpen={store.visible} size="lg" onClose={store.close} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="15px" bgGradient={god.currentChain.info.theme.bgGradient}>
        <ModalHeader bg={useColorModeValue('white', 'gray.800')} borderTopRadius="15px" margin={`${bW}  ${bW}  0 ${bW} `}>
          <chakra.span fontSize="xl" fontWeight="bold">
            {lang.t('account')}
          </chakra.span>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py="6" bg={useColorModeValue('white', 'gray.800')} borderBottomRadius="15px" margin={`0 ${bW}  ${bW}   ${bW} `}>
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
                <CopyIcon ml="4px" w="1rem" h="1rem" />
              </Text>
            </Tooltip>
          </Box>
          {god.currentChain.networkKey === 'iotex' && (
            <>
              <Flex mt="8px">
                <chakra.img w="1.2rem" h="1.2rem" mr="2" src="/images/enter.svg" />
                <Tooltip label="Copied" placement="bottom" isOpen={store.isIOTipOpen}>
                  <Text
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                    fontSize="sm"
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
                    <CopyIcon ml="4px" w="1rem" h="1rem" />
                  </Text>
                </Tooltip>
              </Flex>
            </>
          )}
          <Flex mt="20px" alignItems="center">
            <Flex alignItems="center">
              <Link
                fontSize="sm"
                backgroundClip="text"
                bgGradient={god.currentChain.info.theme.bgGradient}
                target="_blank"
                display="flex"
                alignItems="center"
                href={`${god.currentChain.explorerURL}/address/${(god.currentNetwork as NetworkState).account}`}
              >
                {lang.t('view.on', { explorerName: god.currentChain.explorerName })}
              </Link>
              <ExternalLinkIcon ml="4px" w="1rem" h="1rem" />
            </Flex>
          </Flex>
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
