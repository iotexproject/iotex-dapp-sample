import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import toast from 'react-hot-toast';

import { Container, Input, Button, Box, Text } from '@mantine/core';
import { useStore } from '../store/index';
import { StringState, BooleanState } from '../store/standard/base';
import TokenState from '../store/lib/TokenState';
import { BigNumberInputState } from '../store/standard/BigNumberInputState';
import { eventBus } from '../lib/event';
import { BigNumberState } from '../store/standard/BigNumberState';
import { TokenInput } from '@/components/TokenInput';
import MainLayout from '@/components/Layout';

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
  return (
    <MainLayout>
      <Container size="md">
        <form>
          {/* <FormControl mt={20}> */}
          <TokenInput amount={store.amount} token={store.curToken} onChangeAmount={(e) => store.amount.setFormat(e)} onSelectToken={(e) => (store.curToken = e)} />

          <Box style={{ border: '1px solid', borderRadius: 'md', borderColor: 'inherit' }} mt={4}>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text size="sm">{lang.t('receiver.address')}</Text>
              <Text size="sm">{store.curToken ? `Allowance ${store.allowance.format} ` : '...'}</Text>
            </Box>
            <Input
              style={{ border: 'none' }}
              placeholder={god.currentNetwork.info.token.tokenExample}
              value={store.receiverAdderss.value}
              onChange={(e) => {
                store.receiverAdderss.setValue(e.target.value);
              }}
              onBlur={store.loadAllowance}
            />
          </Box>

          <Box style={{ display: 'flex', justifyContent: 'space-around' }} p={2}>
            <Button type="button" mt="4" disabled={!store.state.valid} onClick={store.onSubmit} loading={store.curToken?.transfer.loading.value}>
              {store.state.msg}
            </Button>
            {store.state.valid && god.isConnect && (
              <Button type="button" mt="4" disabled={!store.state.valid} onClick={store.onApprove} loading={store.curToken?.approve.loading.value}>
                {store.state.msgApprove}
              </Button>
            )}
          </Box>
          {/* </FormControl> */}
        </form>
      </Container>
    </MainLayout>
  );
});

export default ERC20;
