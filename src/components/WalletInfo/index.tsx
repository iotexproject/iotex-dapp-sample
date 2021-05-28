import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { useStore } from '../../store/index';
import { eventBus } from '../../lib/event';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { Button, Text, Flex } from '@chakra-ui/react';

export const WalletInfo = observer(() => {
  const { god, lang } = useStore();

  const store = useLocalStore(() => ({
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
    }
  }));
  return (
    <Modal isOpen={store.visible} onClose={store.close} isCentered>
      <ModalOverlay />
      <ModalContent padding="10">
        <Button onClick={store.logout} size="md">
          <Text>Logout</Text>
        </Button>
      </ModalContent>
    </Modal>
  );
});
