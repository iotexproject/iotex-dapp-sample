import React, { FC } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Alert, AlertIcon, Text, Box, ModalFooter, Button, Checkbox } from '@chakra-ui/react';

import { UnknowTokenState } from './UnknowTokenState';
import { useStore } from '../../store'
import TokenState from '../../store/lib/TokenState'

type TokenImportModalProps = {
  isOpen: boolean;
  importTokens: UnknowTokenState[];
  onClose: () => void;
};

export const TokenImportModal: FC<TokenImportModalProps> = observer(({ isOpen, onClose, importTokens }) => {
  const { god, token } = useStore()
  const store = useLocalObservable(() => ({
    checked: false,
    onAddTokens(items: UnknowTokenState[]) {
      items.forEach(item => {
        const tokenState = new TokenState({
          name: item.name.value,
          symbol: item.symbol.value,
          address: item.address,
          decimals: item.decimals.value
        })
        token.saveToken(tokenState);
      })
      onClose()
    }
  }));
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Import Token</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert status="warning" alignItems="flex-start" borderRadius="8">
            <AlertIcon />
            <Box>
              <Text mb="4">
                Anyone can create token on network with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.
              </Text>
              <Text>If you purchase an arbitrary token, you may be unable to sell it back.</Text>
            </Box>
          </Alert>
          {
            importTokens.map(token => {
              return (
                <Box key={token.address} mt="4" display="flex" justifyContent="space-between" alignItems='flex-end'>
                  <Box>
                    <Text>{token.name.value} ({token.symbol.value})</Text>
                    <Text>{token.address.slice(0, 6)}...{token.address.slice(-2)}</Text>
                  </Box>
                  <Link isExternal href={`${god.currentNetwork.currentChain.explorerURL}/token/${token.address}`}>(View on Block Explore)</Link>
                </Box>
              )
            })
          }
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Checkbox
            isChecked={store.checked}
            onChange={(e) => {
              store.checked = e.target.checked;
            }}
          >
            I Understand
          </Checkbox>
          <Button isDisabled={!store.checked} onClick={() => store.onAddTokens(importTokens)}>Import Tokens</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
