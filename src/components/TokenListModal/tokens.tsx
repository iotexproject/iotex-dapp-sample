import React, { useEffect, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Box,
  Button,
  Image,
  Input,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon, ExternalLinkIcon, CheckIcon } from '@chakra-ui/icons';
import { useStore } from '../../store/index';
import TokenState from '../../store/lib/TokenState';
import { StringState } from '../../store/standard/base';
import { Text } from '@chakra-ui/layout';
import VirtualList from 'react-tiny-virtual-list';
import { reaction } from 'mobx';
import { StorageState } from '@/store/standard/StorageState';

interface PropsType {
  onSelect?: (item: TokenState) => any;
  blackList?: string[];
  isTokenManage?:boolean;
}

export const TokenListWithSearch = observer((props: PropsType) => {
  const { god, token, lang } = useStore();
  const store = useLocalObservable(() => ({
    keyword: new StringState(),
    newToken: null as TokenState,
    localStorageToken: new StorageState<any[]>({ key: 'TokenStore.localStorageToken', default: token?.localStorageToken?.value || [] }),
    get tokens() {
      if (!token.currentTokens) return [];
      if (store.newToken) return [store.newToken];
      if (store.keyword) {
        return token.currentTokens.filter((i) => {
          if (store.keyword.value.length == 42 && i.address.toLowerCase() == store.keyword.value.toLowerCase()) {
            return true;
          }
          if (i.symbol.toLowerCase().includes(store.keyword.value.toLowerCase())) {
            return true;
          }
          return false;
        });
      }
      return token.currentTokens;
    },
    onSelect(item: TokenState) {
      props.onSelect(item);
    },
    addToken(item: TokenState) {
      token.saveToken(item);
      store.keyword.setValue('');
      store.newToken = null;
    },
  }));
  useEffect(() => {
    reaction(
      () => store.keyword.value,
      async (val) => {
        if (god.currentNetwork.isAddress(val)) {
          if (token.currentTokens.findIndex((i) => i.address == val) > -1) return;
          const newToken = new TokenState({ isNew: true, address: val });
          console.log('newToken', newToken);
          await god.currentNetwork.multicall(
            [
              newToken.preMulticall({ method: 'symbol', handler: (v: any) => (newToken.symbol = v.toString()) }),
              newToken.preMulticall({ method: 'name', handler: (v: any) => (newToken.name = v.toString()) }),
              newToken.preMulticall({
                method: 'decimals',
                handler: (v: any) => (newToken.decimals = Number(v.toString()))
              }),
              god.currentNetwork.account ? newToken.preMulticall({
                method: 'balanceOf',
                params: [god.currentNetwork.account],
                handler: newToken._balance
              }) : null
            ].filter((i) => !!i)
          );
          store.newToken = newToken;
        } else {
          store.newToken = null;
        }
      }
    );
  }, []);
  const localList = [];
  if ( store.localStorageToken &&  store.localStorageToken.value && Object.keys(store.localStorageToken.value).length){
      for (const i in store.localStorageToken.value){
        localList.concat(store.localStorageToken.value[i].map(l => new TokenState({ ...l })) || [])
      }
  }
  const tokenNameColor = useColorModeValue('gray.400', 'dark.300');
  return (
    <Box>
      <Box px={4} pb={2}>
        <Input placeholder={props.isTokenManage ? 'oxoooooooooo' : lang.t('select.token.placeholder')} value={store.keyword.value}
               onChange={(e) => store.keyword.setValue(e.target.value)}/>
      </Box>
      <Box ml={4}>
        <VirtualList
          width='100%'
          height={500}
          itemSize={50}
          style={{ paddingRight: '15px' }}
          itemCount={props.isTokenManage ? localList.length : store.tokens.length}
          renderItem={({ index, style }) => {
            const i = props.isTokenManage ? localList[index] : store.tokens[index];
            return (
              <ListItem my={1} key={index} {...style} cursor='pointer' display='flex' alignItems='center'
                        justifyContent='space-between'>
                <Button
                  p='2'
                  disabled={props.blackList?.includes(i.address)}
                  variant={'ghost'}
                  display={'flex'}
                  w='full'
                  justifyContent={'space-between'}
                  textAlign={'left'}
                  onClick={() => !store.newToken && store.onSelect(i)}
                >
                  <Box display='flex' alignItems='center'>
                    <Image borderRadius='full' boxSize='24px' src={i?.logoURI} mr='4'
                           fallbackSrc='/images/token.svg'/>
                    <Box>
                      <Text fontWeight='500'>{i?.symbol}</Text>
                      <Text fontSize='xs' color={tokenNameColor}>
                        {i?.name}
                        {i?.saved && ' • Added by user'}
                      </Text>
                    </Box>
                  </Box>
                  <Box display='flex' alignItems='center'>
                    <Text>{i?.balance.format}</Text>
                    {i?.isNew && (
                      <Button
                        ml='4'
                        px='4'
                        size='sm'
                        onClick={(e) => {
                          e.stopPropagation();
                          store.addToken(i);
                        }}
                      >
                        Import
                      </Button>
                    )}
                  </Box>
                </Button>
              </ListItem>
            );
          }}
        />
      </Box>
    </Box>
  );
});
