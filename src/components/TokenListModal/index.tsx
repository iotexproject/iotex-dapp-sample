import React, { useEffect, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { ChevronLeftIcon, SettingsIcon } from '@chakra-ui/icons';
import { useStore } from '../../store/index';
import TokenState from '../../store/lib/TokenState';
import { StringState } from '../../store/standard/base';
import { Text } from '@chakra-ui/layout';
import VirtualList from 'react-tiny-virtual-list';
import { reaction } from 'mobx';
import { StorageState } from '@/store/standard/StorageState';

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: TokenState) => any;
  blackList?: string[];
}

let timer;
export const TokenListModal = observer((props: PropsType) => {
  const { god, token, lang } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDrillDown, setDrill] = useState<boolean>(false);
  const [tempList, setTempList] = useState<any>([]);
  const [listUrlInput, setListUrlInput] = useState<string>('');
  const [editData, setEdit] = useState<any>({});
  const store = useLocalObservable(() => ({
    keyword: new StringState(),
    deleteKeyword: new StringState(),
    newToken: null as TokenState,
    tokenList: new StorageState<any[]>({ key: 'TokenStore.tokenList', default: [...token?.tokenList?.value] }),
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
    },
    manageToken(arr){
      token.manageToken(arr);
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
    setTempList([...store.tokenList?.value]);
  }, []);
  const tokenNameColor = useColorModeValue('gray.400', 'dark.300');
  const popoverColor = useColorModeValue('black', 'white');
  const onSearch = (val) => {
    console.log('val', val);
  };
  const onChange = (e) => {
    clearTimeout(timer);
    setListUrlInput(e.target.value);
    timer = setTimeout(() => onSearch(e.target.value), 1200);
  };
  function createListCom(obj: any) {
    const { tokens = [], url = '', version: { major = '', minor = '', patch = '' } = {}, enable = false } = obj;
    const tool =
      <Popover>
        <PopoverTrigger>
          <SettingsIcon cursor='pointer' />
        </PopoverTrigger>
        <PopoverContent color={popoverColor} width={200}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontSize={18}>{`v${major}.${minor}.${patch}`}</PopoverHeader>
          <PopoverBody fontSize={14}>
            <Text><a href={`https://tokenlists.org/token-list?url=${url}`} target='_blank'>View list</a></Text>
            <Text marginTop='3px' onClick={() => {
              onOpen();
              setEdit(obj);
            }}><a href='#'>Remove list</a></Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>;
    return (
      <Flex key={url} background={enable ? '#0094EC' : '#161522'} color={enable ? 'white' : '#BFBFBF'}
            borderRadius={10} margin='10px 0 '>
        <Box p='4'>
          <Image borderRadius='full' boxSize='40px' src={obj.logoURI} mr='4'
                 fallbackSrc='/images/token.svg' />
        </Box>
        <Box p='4'>
          <Text fontWeight='500'>{obj?.name}</Text>
          <Text fontSize={12}><span>{tokens.length || 0} tokens {tokens.length && tool}</span></Text>
        </Box>
        <Spacer />
        <Box p='4' paddingTop={6}>
          <Switch size='lg' defaultChecked={enable} onChange={() => {
            const managedList = tempList.map((l) => {
              let temL = { ...l };
              const { url: urlL = '' } = l;
              if (urlL === url) {
                temL.enable = !l.enable;
              }
              return temL;
            });
            setTempList(managedList);
            store.manageToken(managedList);
          }} />
        </Box>
      </Flex>
    );
  }

  const temCom = (<Tabs isFitted variant='enclosed' width='100%' style={{ paddingRight: '15px' }}>
    <TabList mb='1em'>
      <Tab>{lang.t('lists')}</Tab>
      <Tab>{lang.t('tokens')}</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <Input borderColor='inherit' placeholder='https:// or ipfs:// or ENS name' onChange={onChange}
               value={listUrlInput}
               title='List URL' marginBottom={5} />
        <Box border='none' height={600} overflowY='auto'>
          {tempList.map((i) => createListCom(i))}
        </Box>
      </TabPanel>
      <TabPanel>
        <Input placeholder={god.currentNetwork.info.token.tokenExample} />
        <Box border='none' height={600} overflowY='auto' />
        <Text fontSize={12} textAlign='center'>Tip: Custom tokens are stored locally in your browser</Text>
      </TabPanel>
    </TabPanels>
  </Tabs>);
  return (
    <Modal isOpen={props.isOpen} onClose={store.onClose} closeOnEsc closeOnOverlayClick>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isDrillDown ? <Grid gap={4}>
          <GridItem colSpan={2}><ChevronLeftIcon cursor='pointer' w={8} h={8}
                                                 onClick={() => {
                                                   setDrill(false);
                                                   store.keyword.setValue('');
                                                 }} /></GridItem>
          <GridItem colStart={3} colEnd={6}>{lang.t('manage')}</GridItem>
        </Grid> : lang.t('select.token')}</ModalHeader>
        <ModalCloseButton />
        {!isDrillDown && <Box px={4} pb={2}>
          <Input placeholder={lang.t('select.token.placeholder')} value={store.keyword.value}
                 onChange={(e) => store.keyword.setValue(e.target.value)} />
        </Box>}
        <Box ml={4}>
          {isDrillDown ? temCom : <VirtualList
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
                        <Text fontSize='xs' color={tokenNameColor}>
                          {i.name}
                          {i.saved && ' • Added by user'}
                        </Text>
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
          />}
          {!isDrillDown && <Button
            width='90%'
            margin='0 auto 10px 10px'
            onClick={() => setDrill(true)}
          >{lang.t('manage.token.list')}</Button>}
        </Box>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => {
          onClose();
        }}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader />
            <ModalBody>
              Please confirm you would like to remove this list by typing REMOVE
              <Input value={store.deleteKeyword.value} marginTop='15px'
                     onChange={(e) => store.deleteKeyword.setValue(e.target.value)} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => {
                if (store.deleteKeyword.value === 'REMOVE') {
                  const {name = ''} = editData;
                  const managedList = tempList.filter((i) => i.name !== name);
                  setTempList(managedList);
                  store.manageToken(managedList);
                }
                store.deleteKeyword.setValue('');
                onClose();
              }}>
                Confirm
              </Button>
              <Button variant='ghost' onClick={() => {
                onClose();
              }}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ModalContent>
    </Modal>
  );
});
