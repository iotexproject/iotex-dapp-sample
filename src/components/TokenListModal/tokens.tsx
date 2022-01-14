import React, { useEffect, useRef, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Input,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  useColorModeValue
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons';
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
  isTokenManage?: boolean;
}

export const TokenListWithSearch = observer((props: PropsType) => {
  const initRef = useRef();
  const { god, token, lang } = useStore();
  const store = useLocalObservable(() => ({
    keyword: new StringState(),
    newToken: null as TokenState,
    localStorageToken: new StorageState<any[]>({
      key: 'TokenStore.localStorageToken',
      default: token?.localStorageToken?.value || []
    }),
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
    }
  }));
  const [errorMsg, setMsg] = useState('');
  const [tempList, setTempList] = useState<any>([]);
  useEffect(() => {
    reaction(
      () => store.keyword.value,
      async (val) => {
        if (god.currentNetwork.isAddress(val)) {
          if (token.currentTokens.findIndex((i) => i.address == val) > -1) return;
          const newToken = new TokenState({ isNew: true, address: val });
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
  let localList = [];
  if (store.localStorageToken && store.localStorageToken.value && Object.keys(store.localStorageToken.value).length) {
    for (const i in store.localStorageToken.value) {
      localList = localList.concat(store.localStorageToken.value[i].map(l => new TokenState({ ...l })) || []);
    }
  }
  useEffect(() => {
    setTempList([...localList]);
  }, [Object.keys(store.localStorageToken.value).length]);
  const tokenNameColor = useColorModeValue('gray.400', 'dark.300');
  const popoverColor = useColorModeValue('black', 'white');
  return (
    <Box>
      <Box px={4} pb={2}>
        <Input placeholder={props.isTokenManage ? 'oxoooooooooo' : lang.t('select.token.placeholder')}
               value={store.keyword.value}
               onChange={(e) => {
                 store.keyword.setValue(e.target.value);
                 if (props.isTokenManage && e.target.value) {
                   if (!god.currentNetwork.isAddress(e.target.value)) {
                     setMsg('Enter valid token address');
                   } else {
                     setMsg('');
                   }
                 } else {
                   setMsg('');
                 }
               }} />
      </Box>
      <Box ml={4}>
        {errorMsg ? <Text color='red'>{errorMsg}</Text> :
          store.keyword.value && props.isTokenManage && store.tokens.length && store.tokens.length === 1 ?
            <Flex key={store.tokens[0].address}>
              <Box p='4'>
                <Image borderRadius='full' boxSize='40px' src={store.tokens[0]?.logoURI} mr='4'
                       fallbackSrc='/images/token.svg' />
              </Box>
              <Box p='4'>
                <Text fontWeight='500'>{store.tokens[0]?.symbol}</Text>
              </Box>
              <Spacer />
              <Box p='4' paddingTop={6}>
                {
                  store.tokens[0].isNew ? <Button
                      ml='4'
                      px='4'
                      size='sm'
                      onClick={() => {
                        store.addToken(store.tokens[0]);
                        setTempList([store.tokens[0], ...localList]);
                      }}
                    >
                      Import
                    </Button>
                    : <Text fontSize={12} color='green'><span><CheckIcon /> Actived</span></Text>
                }
              </Box>
            </Flex> : null
        }
        <VirtualList
          width='100%'
          height={500}
          itemSize={50}
          style={{ paddingRight: '15px' }}
          itemCount={props.isTokenManage ? tempList.length : store.tokens.length}
          renderItem={({ index, style }) => {
            const i = props.isTokenManage ? tempList[index] : store.tokens[index];
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
                  onClick={() => !store.newToken && !props.isTokenManage && store.onSelect(i)}
                >
                  <Box display='flex' alignItems='center'>
                    <Image borderRadius='full' boxSize='24px' src={i?.logoURI} mr='4'
                           fallbackSrc='/images/token.svg' />
                    <Box>
                      <Text fontWeight='500'>{i?.symbol}</Text>
                      <Text fontSize='xs' color={tokenNameColor}>
                        {i?.name}
                        {i?.saved && !props.isTokenManage && ' • Added by user'}
                      </Text>
                    </Box>
                  </Box>
                  {
                    props.isTokenManage ? <Box display='flex' alignItems='center'>
                      <Popover closeOnBlur={false} initialFocusRef={initRef} key={i?.address}>
                        {({ isOpen, onClose }) => (
                          <>
                            <PopoverTrigger>
                              <DeleteIcon cursor='pointer'/>
                            </PopoverTrigger>
                            <PopoverContent color={popoverColor}>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverHeader fontSize={18}>Confirmation</PopoverHeader>
                              <PopoverBody whiteSpace='pre-wrap'>
                                Are you sure you want to continue with your action?
                              </PopoverBody>
                              <PopoverFooter d='flex' justifyContent='flex-end'>
                                <ButtonGroup size='sm'>
                                  <Button variant='outline' onClick={() => onClose()}>Cancel</Button>
                                  <Button colorScheme='red' onClick={() => {
                                    token.deleteToken(i?.address);
                                    setTempList([...tempList.filter((l) => l.address !== i.address)])
                                    onClose();
                                  }}>Apply</Button>
                                </ButtonGroup>
                              </PopoverFooter>
                            </PopoverContent>
                          </>
                        )}
                      </Popover>&nbsp;
                      <a title='view' target='_blank'
                         href={`https://etherscan.io/address/${i?.address}`}><ExternalLinkIcon /></a>
                    </Box> : <Box display='flex' alignItems='center'>
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
                  }
                </Button>
              </ListItem>
            );
          }}
            />
            </Box>
            </Box>
            );
          });
