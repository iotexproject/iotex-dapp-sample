import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Icon } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Center, Text } from '@chakra-ui/layout';
import toast from 'react-hot-toast';

import { Container, FormControl, Input, Button, Image, InputGroup, InputRightElement, Flex, Box } from '@chakra-ui/react';
import { useStore } from '../store/index';
import { StringState, BooleanState } from '../store/standard/base';
import { TokenListModal } from '../components/TokenListModal/index';
import TokenState from '../store/lib/TokenState';
import { BigNumberInputState } from '../store/standard/BigNumberInputState';
import { eventBus } from '../lib/event';

const ERC20 = observer(() => {
  const { god, token, lang } = useStore();

  const store = useLocalStore(() => ({
    amount: new BigNumberInputState({}),
    receiverAdderss: new StringState(),
    curToken: null as TokenState,
    isOpenTokenList: new BooleanState(),
    get loading() {
      return store.curToken?.transfer.loading;
    },
    get state() {
      if (!god.isConnect) {
        return { valid: true, msg: lang.t('connect.wallet'), connectWallet: true };
      }
      const valid = store.curToken && store.amount.value && store.receiverAdderss.value;
      return {
        valid,
        msg: valid ? lang.t('submit') : lang.t('invalid.input')
      };
    },
    openTokenList() {
      store.isOpenTokenList.setValue(true);
    },
    onSelectToken(token: TokenState) {
      store.curToken = token;
    },

    async onSubmit() {
      if (store.state.connectWallet) {
        return god.setShowConnecter(true);
      }

      const res = await store.curToken.transfer.call({ params: [store.receiverAdderss.value, store.amount.value.toFixed(0, 1)] });

      const receipt = await res.wait();
      if (receipt.status) {
        toast.success('Transfer Succeeded');
      }
    }
  }));

  useEffect(() => {
    if (god.currentNetwork.account) {
      token.loadPrivateData();
    }
  }, [god.updateTicker.value]);
  useEffect(() => {
    eventBus.on('chain.switch', () => {
      store.curToken = null;
    });
  }, []);
  return (
    <Container maxW="md">
      <form>
        <FormControl mt={20}>
          <Box border="1px solid" borderRadius="md" borderColor="inherit">
            <Flex justify="space-between" p={2}>
              <Text fontSize="sm">{lang.t('token.amount')}</Text>
              <Text fontSize="sm">{store.curToken ? `Balance ${store.curToken.balance.format} ` : '...'}</Text>
            </Flex>
            <InputGroup>
              <Input border="none" placeholder="0.0" type="number" value={store.amount.format} onChange={(e) => store.amount.setFormat(e.target.value)} />
              <InputRightElement onClick={store.openTokenList} width="4rem" cursor="pointer" flexDir="column">
                <Flex alignItems="center" pr={2} w="100%">
                  <Image borderRadius="full" boxSize="24px" src={store.curToken?.logoURI} fallbackSrc="/images/token.svg" />
                  <Icon as={ChevronDownIcon} ml={1} />
                </Flex>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Box border="1px solid" borderRadius="md" borderColor="inherit" mt={4}>
            <Flex justify="space-between" p={2}>
              <Text fontSize="sm">{lang.t('receiver.address')}</Text>
            </Flex>
            <InputGroup>
              <Input border="none" placeholder={god.currentNetwork.info.token.tokenExample} value={store.receiverAdderss.value} onChange={(e) => store.receiverAdderss.setValue(e.target.value)} />
            </InputGroup>
          </Box>

          <Center>
            <Button type="button" mt="4" disabled={!store.state.valid || store.loading?.value} onClick={store.onSubmit} isLoading={store.loading?.value}>
              {store.state.msg}
            </Button>
          </Center>
        </FormControl>
      </form>
      <TokenListModal isOpen={store.isOpenTokenList.value} onClose={() => store.isOpenTokenList.setValue(false)} onSelect={store.onSelectToken} />
    </Container>
  );
});

export default ERC20
