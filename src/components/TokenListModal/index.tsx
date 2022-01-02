import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ListItem,
  Image,
  Button,
  Box,
  Input,
  Grid,
  GridItem,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';
import { ChevronLeftIcon, QuestionIcon } from '@chakra-ui/icons';
import { useStore } from '../../store/index';
import TokenState from '../../store/lib/TokenState';
import { StringState } from '../../store/standard/base';
import { Text } from '@chakra-ui/layout';
import VirtualList from 'react-tiny-virtual-list';
import { useEffect, useState } from 'react';
import { reaction } from 'mobx';

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: TokenState) => any;
  blackList?: string[];
}

export const TokenListModal = observer((props: PropsType) => {
  const { god, token, lang } = useStore();
  const [isDrillDown, setDrill] = useState<boolean>(false);
  const store = useLocalObservable(() => ({
    keyword: new StringState(),
    newToken: null as TokenState,
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
    onClose() {
      store.keyword.setValue('');
      store.newToken = null;
      props.onClose();
      setDrill(false);
    },
    onSelect(item: TokenState) {
      props.onSelect(item);
      store.onClose();
    },
    addToken(item: TokenState) {
      token.saveToken(item);
      store.keyword.setValue('');
      store.newToken = null;
    }
  }));

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
  const tokenNameColor = useColorModeValue('gray.400', 'dark.300');
  const temCom = [];
  return (
    <Modal isOpen={props.isOpen} onClose={store.onClose} closeOnEsc closeOnOverlayClick>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isDrillDown ? <Grid gap={4}>
          <GridItem colSpan={2}><ChevronLeftIcon cursor='pointer' w={8} h={8}
                                                 onClick={() => setDrill(false)} /></GridItem>
          <GridItem colStart={3} colEnd={6}>{lang.t('manage')}</GridItem>
        </Grid> : lang.t('select.token')}</ModalHeader>
        <ModalCloseButton />
        {!isDrillDown && <Box px={4} pb={2}>
          <Input placeholder={lang.t('select.token.placeholder')} value={store.keyword.value}
                 onChange={(e) => store.keyword.setValue(e.target.value)} />
        </Box>}
        {
          !isDrillDown &&
          <Box ml={4}><Text fontWeight='500'>Common bases <Tooltip
            label='These tokens are commonly paired with other tokens.'>
            <QuestionIcon cursor='help' />
          </Tooltip></Text> <Grid gap={4}
                                  templateColumns='repeat(4, 1fr)'> {store.tokens.length && store.tokens.length > 10 && store.tokens.slice(0, 10).map((obj) =>
            <GridItem w='100%' onClick={() => store.onSelect(obj)}>
              <Button variant={'ghost'} w='100%' display='flex' alignItems='center'>
                <Image borderRadius='full' boxSize='24px' src={obj.logoURI} mr='4'
                       fallbackSrc='/images/token.svg' />
                <Text fontWeight='500'>{obj.symbol}</Text>
              </Button>
            </GridItem>
          )}
          </Grid>
          </Box>
        }
        <Box ml={4}>
          <VirtualList
            width='100%'
            height={500}
            itemSize={50}
            style={{ paddingRight: '15px' }}
            itemCount={store.tokens.length}
            renderItem={({ index, style }) => {
              const i = store.tokens[index];
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
                    onClick={() => store.onSelect(i)}
                  >
                    <Box display='flex' alignItems='center'>
                      <Image borderRadius='full' boxSize='24px' src={i.logoURI} mr='4'
                             fallbackSrc='/images/token.svg' />
                      <Box>
                        <Text fontWeight='500'>{i.symbol}</Text>
                      </Box>
                    </Box>
                    <Box display='flex' alignItems='center'>
                      <Text>{i.balance.format}</Text>
                      {i.isNew && (
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
          {!isDrillDown && <Button
            width='90%'
            margin='0 auto 10px 10px'
            onClick={() => setDrill(true)}
          >{lang.t('manage.token.list')}</Button>}
        </Box>
      </ModalContent>
    </Modal>
  );
});
