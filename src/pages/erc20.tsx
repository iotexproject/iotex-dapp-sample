import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Box, Button, Container, Flex, FormControl, Input, InputGroup } from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import toast from 'react-hot-toast';
import { useStore } from '../store/index';
import { BooleanState, StringState } from '../store/standard/base';
import TokenState from '../store/lib/TokenState';
import { BigNumberInputState } from '../store/standard/BigNumberInputState';
import { eventBus } from '../lib/event';
import { BigNumberState } from '../store/standard/BigNumberState';
import { TokenInput } from '@/components/TokenInput';

const ERC20 = observer(() => {
  const { god, token, lang } = useStore();

  const store = useLocalStore(() => ({
    amount: new BigNumberInputState({}),
    receiverAdderss: new StringState(),
    curToken: null as TokenState,
    isOpenTokenList: new BooleanState(),
    get state() {
      if (!god.isConnect) {
        return { valid: true, msg: lang.t('connect.wallet'), msgApprove: '', connectWallet: true };
      }
      const valid = store.curToken && store.amount.value && store.receiverAdderss.value;
      return {
        valid,
        msg: valid ? lang.t('transfer') : lang.t('invalid.input'),
        msgApprove: valid ? lang.t('approve') : lang.t('invalid.input')
      };
    },
    openTokenList() {
      store.isOpenTokenList.setValue(true);
    },
    onSelectToken(token: TokenState) {
      store.curToken = token;
      store.allowance = new BigNumberState({});
    },
    allowance: new BigNumberState({}),
    loadAllowance() {
      // TODO: check params
      if (store.receiverAdderss.value && store.curToken && store.amount) {
        god.currentNetwork.multicall([
          store.curToken.preMulticall({
            method: 'allowance',
            params: [god.currentNetwork.account, store.receiverAdderss.value],
            handler: store.allowance
          })
        ]);
      } else {
        store.allowance = new BigNumberState({});
      }
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
    },
    async onApprove() {
      if (store.state.connectWallet) {
        return god.setShowConnecter(true);
      }
      const res = await store.curToken.approve.call({ params: [store.receiverAdderss.value, store.amount.value.toFixed(0, 1)] });
      const receipt = await res.wait();
      if (receipt.status) {
        toast.success('Approve Succeeded');
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
  useEffect(() => {
    token.loadTokens();
  }, []);
  return (
    <Container maxW='md'>
      <form>
        <FormControl mt={20}>
          <TokenInput amount={store.amount} token={store.curToken} onChangeAmount={(e) => store.amount.setFormat(e)}
                      onSelectToken={(e) => (store.curToken = e)} />

          <Box border='1px solid' borderRadius='md' borderColor='inherit' mt={4}>
            <Flex justify='space-between' p={2}>
              <Text fontSize='sm'>{lang.t('receiver.address')}</Text>
              <Text fontSize='sm'>{store.curToken ? `Allowance ${store.allowance.format} ` : '...'}</Text>
            </Flex>
            <InputGroup>
              <Input
                border='none'
                placeholder={god.currentNetwork.info.token.tokenExample}
                value={store.receiverAdderss.value}
                onChange={(e) => {
                  store.receiverAdderss.setValue(e.target.value);
                }}
                onBlur={store.loadAllowance}
              />
            </InputGroup>
          </Box>

          <Flex justify='space-around' p={2}>
            <Button type='button' mt='4' disabled={!store.state.valid} onClick={store.onSubmit}
                    isLoading={store.curToken?.transfer.loading.value}>
              {store.state.msg}
            </Button>
            {store.state.valid && god.isConnect && (
              <Button type='button' mt='4' disabled={!store.state.valid} onClick={store.onApprove}
                      isLoading={store.curToken?.approve.loading.value}>
                {store.state.msgApprove}
              </Button>
            )}
          </Flex>
        </FormControl>
      </form>
    </Container>
  );
});

export default ERC20;
