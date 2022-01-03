import React, { FC } from 'react';

import { Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Flex, Image, Text, Alert } from '@chakra-ui/react';
import { ArrowRightIcon } from "@chakra-ui/icons"
import { ZeroQuoteRes } from '../../../type';
import TokenState from '../../store/lib/TokenState'
import { BigNumberInputState } from '../../store/standard/BigNumberInputState'
import { helper } from '../../lib/helper';

type SwapConmfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  zeroResData?: ZeroQuoteRes;
  fromToken?: TokenState;
  toToken?: TokenState;
  fromAmount?: BigNumberInputState;
  toAmount?: BigNumberInputState;
  isLoading?: boolean
};

export const SwapConfirmModal: FC<SwapConmfirmModalProps> = ({ isOpen, onClose, fromToken, toToken, fromAmount, toAmount, zeroResData, onConfirm, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Swap Confirm</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection='column' alignItems='center'>
            <Flex w="full" justifyContent='space-between' alignItems='center'>
              <Flex>
                <Image mr="2" borderRadius="full" boxSize="24px" src={fromToken?.logoURI} fallbackSrc="/images/token.svg" />
                <Text>{fromAmount?.format}</Text>
              </Flex>
              <Text>{fromToken?.symbol}</Text>
            </Flex>
            <ArrowRightIcon my="2" transform="rotate(90deg)"></ArrowRightIcon>
            <Flex w="full" justifyContent='space-between' alignItems='center'>
              <Flex>
                <Image mr="2" borderRadius="full" boxSize="24px" src={toToken?.logoURI} fallbackSrc="/images/token.svg" />
                <Text>{toAmount.format}</Text>
              </Flex>
              <Text>{toToken?.symbol}</Text>
            </Flex>
          </Flex>
          <Alert mt="4" borderRadius="base" justifyContent='space-between' status="info">
            <Text>Price</Text>
            <Box>
              1 {fromToken?.symbol} = {helper.number.toPrecisionFloor(zeroResData?.price)} {toToken?.symbol}
            </Box>
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onConfirm} isLoading={isLoading}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
