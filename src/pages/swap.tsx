import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Center, Text } from '@chakra-ui/layout';
import { SettingsIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

import { Container, FormControl, Flex, Box, Button, IconButton } from '@chakra-ui/react';
import { useStore } from '../store/index';
import TokenState from '../store/lib/TokenState';
import { BigNumberInputState } from '../store/standard/BigNumberInputState';
import { eventBus } from '../lib/event';
import { TokenInput } from '@/components/TokenInput';
import { ZeroQuoteRes } from '../../type';
import { PromiseState } from '../store/standard/PromiseState';
import { Deferrable } from 'ethers/lib/utils';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { _ } from '../lib/lodash';
import { helper } from '../lib/helper';
import { BooleanState, StringState } from '../store/standard/base';
import { IoSwapHorizontalSharp } from 'react-icons/io5';
import { TransactionRequest } from '@ethersproject/providers';
import { SettingModal } from '../components/SettingModal';
import { TokenImportModal } from '../components/TokenImportModal';
import { UnknowTokenState } from '../components/TokenImportModal/UnknowTokenState';
import { SwapConfirmModal } from '../components/SwapConfirmModal';

const ERC20 = observer(() => {
  const { god, lang, token } = useStore();
  const { query } = useRouter();
  const store = useLocalObservable(() => ({
    fromToken: null as TokenState,
    fromAmount: new BigNumberInputState({}),

    toToken: null as TokenState,
    toAmount: new BigNumberInputState({}),

    zeroResData: null as ZeroQuoteRes,

    modalOpen: new BooleanState(),
    importTokenModalOpen: new BooleanState(),
    swapConfirmModalOpen: new BooleanState({ value: false }),
    importTokens: [] as UnknowTokenState[],

    slippage: new StringState({ value: '1' }),
    swap: new PromiseState({
      async function(tx: Deferrable<TransactionRequest>) {
        return god.eth.signer.sendTransaction(tx);
      }
    }),
    side: '' as 'sell' | 'buy',
    get blackList() {
      return [store.fromToken?.address, store.toToken?.address];
    },
    get loading() {
      return store.swap.loading.value || god.currentChain.quote0x.loading.value || store.fromToken?.approve.loading.value;
    },
    get state() {
      if (!god.isConnect) {
        return { valid: true, msg: lang.t('connect.wallet'), connectWallet: true };
      }
      // check allwoance for zero router
      if (store.fromToken?.allowanceForRouter.value.isLessThan(store.fromAmount.value)) {
        return { valid: true, msg: lang.t('Approve', { tokenSymbol: store.fromToken?.symbol }), needApprove: true };
      }

      // check balance
      if (store.fromToken?.balance.value.isLessThan(store.fromAmount.value)) {
        return { valid: false, msg: lang.t('InsufficientBalance', { tokenSymbol: store.fromToken?.symbol }) };
      }

      const valid = store.fromToken && store.fromAmount.value.isGreaterThan(0) && store.toToken && store.toAmount.value.isGreaterThan(0);
      return {
        valid,
        msg: valid ? lang.t('submit') : lang.t('invalid.input')
      };
    },
    async approve(token: TokenState) {
      // TODO: has some security risks
      await token.approve.call({ params: [god.currentChain.info.zeroRouterAddr, ethers.constants.MaxUint256.toString()] });
    },
    onFromMax() {
      store.onChangeFromAmount(store.fromToken?.balance.format);
    },
    onSwapTokenSide() {
      store.zeroResData = null;
      store.side = store.side == 'sell' ? 'buy' : 'sell';
      [store.fromToken, store.toToken] = [store.toToken, store.fromToken];
      [store.fromAmount, store.toAmount] = [store.toAmount, store.fromAmount];
      store.updatePrice();
    },
    clickChangeTokenHandle: {
      side: '',
      from() {
        store.clickChangeTokenHandle.side = 'from';
      },
      to() {
        store.clickChangeTokenHandle.side = 'to';
      },
      selectToken(token: TokenState) {
        store[store.clickChangeTokenHandle.side === 'from' ? 'fromToken' : 'toToken'] = token;
        store[store.clickChangeTokenHandle.side === 'from' ? 'fromAmount' : 'toAmount'].setDecimals(token.decimals);
        store.updatePrice();
      }
    },
    onSelectFromToken(token: TokenState) {
      store.fromToken = token;
      store.fromAmount.setDecimals(token.decimals);
      store.updatePrice();
    },
    onChangeFromAmount(value: string) {
      store.fromAmount.setFormat(value);
      store.side = 'sell';
      store.updatePrice();
    },
    onSelectToToken(token: TokenState) {
      store.toToken = token;
      store.toAmount.setDecimals(token.decimals);
      store.updatePrice();
    },
    onChangeToAmount(value: string) {
      store.toAmount.setFormat(value);
      store.side = 'buy';
      store.updatePrice();
    },
    async updatePrice() {
      if (!store.fromToken || !store.toToken) return;
      try {
        if (store.side == 'sell' && store.fromAmount.value.isGreaterThan(0)) {
          const res = await god.currentChain.quote0x.call({
            params: {
              sellToken: store.fromToken?.address || store.fromToken?.symbol,
              buyToken: store.toToken?.address || store.toToken?.symbol,
              sellAmount: store.fromAmount.value.toFixed(0, 1),
              slippagePercentage: +store.slippage.value / 100
            }
          });
          if (res.data) {
            store.zeroResData = res.data;
            store.toAmount.setValue(new BigNumber(res.data.buyAmount));
          }
        }

        if (store.side == 'buy' && store.toAmount.value.isGreaterThan(0)) {
          const res = await god.currentChain.quote0x.call({
            params: {
              sellToken: store.toToken?.address,
              buyToken: store.fromToken?.address,
              sellAmount: store.toAmount.value.toFixed(0, 1),
              slippagePercentage: +store.slippage.value / 100
            }
          });
          if (res.data) {
            store.zeroResData = res.data;
            store.fromAmount.setValue(new BigNumber(res.data.buyAmount));
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    async onLoadUrlParams(inputCurrency: string, outputCurrency: string) {
      const importTokensNotInDefault = [inputCurrency, outputCurrency] as string[];
      const tokenAddresses = importTokensNotInDefault.filter(Boolean).filter((addr) => {
        const totalAddr = token.currentTokens.map((i) => i.address.toLowerCase());
        return !totalAddr.includes(addr.toLowerCase());
      });
      if (tokenAddresses.length === 0) {
        return;
      }
      const tokenStates = tokenAddresses.map((address) => new UnknowTokenState({ address }));
      try {
        await Promise.all(tokenStates.map((state) => state.promise));
      } finally {
      }
      if (tokenStates.length > 0 && tokenStates.every((state) => state.loaded.value)) {
        store.importTokens = tokenStates;
        store.importTokenModalOpen.setValue(true);
      }
    },
    async onSubmit() {
      if (store.state.connectWallet) {
        return god.setShowConnecter(true);
      }
      if (store.state.needApprove) {
        return store.approve(store.fromToken);
      }
      if (store.state.valid) {
        store.swapConfirmModalOpen.setValue(true);
      }
    },
    async onConfirm() {
      if (store.state.valid) {
        const postData = _.pick(store.zeroResData, ['chainId', 'confirmations', 'data', 'from', 'gasLimit', 'gasPrice', 'hash', 'nonce', 'r', 's', 'to', 'type', 'v', 'value', 'wait']);
        postData.gasPrice = ethers.BigNumber.from(postData.gasPrice) as unknown as string;
        postData.value = ethers.BigNumber.from(postData.value) as unknown as string;
        const res = await store.swap.call(postData);
        const receipt = await res.wait();
        if (receipt.status) {
          store.fromAmount.setValue(new BigNumber(0));
          store.toAmount.setValue(new BigNumber(0));
          store.zeroResData = null;
          store.swapConfirmModalOpen.setValue(false);
        }
      }
    },
    reset() {
      store.zeroResData = null;
      store.fromToken = null;
      store.toToken = null;
      store.fromAmount.setFormat('');
      store.toAmount.setFormat('');
    }
  }));

  useEffect(() => {
    if (god.currentNetwork.account) {
      token.loadPrivateData();
    }
  }, [god.updateTicker.value]);
  useEffect(() => {
    if (god.currentNetwork.account) {
      store.onLoadUrlParams(query.inputCurrency as string, query.outputCurrency as string);
    }
  }, [god.currentNetwork.account]);
  useEffect(() => {
    eventBus.on('chain.switch', store.reset);
    return () => {
      eventBus.off('chain.switch', store.reset);
    };
  }, []);
  return (
    <Container maxW="md" mt="100px">
      <Flex flexDirection="row-reverse" mb="4">
        <IconButton aria-label="Setting" icon={<SettingsIcon />} onClick={() => store.modalOpen.setValue(true)}></IconButton>
      </Flex>
      <form>
        <FormControl>
          <TokenInput
            blackList={store.blackList}
            token={store.fromToken}
            amount={store.fromAmount}
            onSelectToken={store.onSelectFromToken}
            onChangeAmount={store.onChangeFromAmount}
            label={lang.t('Pay')}
          />
          <Center my="10px">
            <Button cursor="pointer" borderRadius="full" onClick={store.onSwapTokenSide}>
              <IoSwapHorizontalSharp />
            </Button>
          </Center>
          <TokenInput
            blackList={store.blackList}
            token={store.toToken}
            amount={store.toAmount}
            onSelectToken={store.onSelectToToken}
            onChangeAmount={store.onChangeToAmount}
            label={lang.t('Receive')}
          />

          {store.zeroResData && (
            <Box>
              <Flex justifyContent={'space-between'} fontSize={'sm'} color="#9A9A9A" mt="3">
                <Box>{lang.t('Rate')}</Box>
                <Box>
                  1 {store.fromToken?.symbol} = {helper.number.toPrecisionFloor(store.zeroResData.price)} {store.toToken?.symbol}
                </Box>
              </Flex>
              <Flex justifyContent={'space-between'} fontSize={'sm'} mt="4">
                <Box>{lang.t('Exchange')}</Box>
                <Box>
                  {store.zeroResData.sources
                    .filter((v) => Number(v.proportion) > 0)
                    .map((v, i) => (
                      <Flex justifyContent={'flex-end'} key={i}>
                        <Text>{v.name}</Text>
                        <Text ml="2" minW={7} textAlign={'right'}>
                          {helper.number.toPrecisionFloor(Number(v.proportion) * 100, { decimals: 1 })}%
                        </Text>
                      </Flex>
                    ))}
                </Box>
              </Flex>
            </Box>
          )}

          <Center mt="5">
            <Button mt="4" disabled={!store.state.valid} onClick={store.onSubmit} isLoading={store.loading}>
              {store.state.msg}
            </Button>
          </Center>
        </FormControl>
      </form>
      <SettingModal
        slippageValue={store.slippage.value}
        onSlippageChange={(value) => {
          store.slippage.setValue(value);
        }}
        isOpen={store.modalOpen.value}
        onClose={() => store.modalOpen.setValue(false)}
      ></SettingModal>
      <TokenImportModal
        importTokens={store.importTokens}
        isOpen={store.importTokenModalOpen.value}
        onClose={() => {
          store.importTokenModalOpen.setValue(false);
        }}
      ></TokenImportModal>
      <SwapConfirmModal
        isLoading={store.swap.loading.value || god.currentChain.quote0x.loading.value}
        zeroResData={store.zeroResData}
        fromToken={store.fromToken}
        fromAmount={store.fromAmount}
        toToken={store.toToken}
        toAmount={store.toAmount}
        isOpen={store.swapConfirmModalOpen.value}
        onClose={() => store.swapConfirmModalOpen.setValue(false)}
        onConfirm={store.onConfirm}
      ></SwapConfirmModal>
    </Container>
  );
});

export default ERC20;
