import React, { useCallback, useEffect, useState } from 'react';
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
  ModalCloseButton,
  ModalContent,
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
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';
import { ChevronLeftIcon, QuestionIcon, SettingsIcon } from '@chakra-ui/icons';
import { useStore } from '../../store/index';
import TokenState from '../../store/lib/TokenState';
import { StringState } from '../../store/standard/base';
import { Text } from '@chakra-ui/layout';
import VirtualList from 'react-tiny-virtual-list';
import { reaction } from 'mobx';

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: TokenState) => any;
  blackList?: string[];
}

const mockData = [
  {
    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    name: 'Aave',
    symbol: 'AAVE',
    logoURI: 'https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110',
    tokens: [1, 2, 3, 4, 5, 6],
    status: 'on',
    tokenUrl: 'https://static.optimism.io/optimism.tokenlist.json',
    version: 'v1.0.1'
  },
  {
    address: '0xfF20817765cB7f73d4bde2e66e067E58D11095C2',
    name: 'Amp',
    symbol: 'AMP',
    logoURI: 'https://assets.coingecko.com/coins/images/12409/thumb/amp-200x200.png?1599625397',
    tokens: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    status: 'on',
    tokenUrl: 'https://static.optimism.io/optimism.tokenlist.json',
    version: '2.0.1'
  },
  {
    address: '0x960b236A07cf122663c4303350609A66A7B288C0',
    name: 'Aragon Network Token',
    symbol: 'ANT',
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x960b236A07cf122663c4303350609A66A7B288C0/logo.png',
    tokens: [1, 2, 3, 4, 5],
    status: 'off',
    tokenUrl: 'https://static.optimism.io/optimism.tokenlist.json',
    version: '3.0.1'
  }
];
export const TokenListModal = observer((props: PropsType) => {
  const { god, token, lang } = useStore();
  const [isDrillDown, setDrill] = useState<boolean>(false);
  const [tempList, setTempList] = useState<any>([]);
  const [addError, setAddError] = useState<string | undefined>();
  const [listUrlInput, setListUrlInput] = useState<string>('');
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
    setTempList([...mockData]);
  }, []);
  const handleInput = useCallback((e) => {
    setListUrlInput(e.target.value);
  }, []);
  const tokenNameColor = useColorModeValue('gray.400', 'dark.300');
  const popoverColor = useColorModeValue('black', 'white');

  function createListCom(obj: any) {
    const { status = '', tokens = [], address = '', version = '', tokenUrl = '' } = obj;
    const tool =
      <Popover>
        <PopoverTrigger>
          <SettingsIcon cursor='pointer' />
        </PopoverTrigger>
        <PopoverContent color={popoverColor} width={200}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontSize={18}>{version}</PopoverHeader>
          <PopoverBody fontSize={14}>
            <Text><a href={`https://tokenlists.org/token-list?url=${tokenUrl}`} target="_blank">View list</a></Text>
            <Text marginTop='3px'><a href='#'>Remove list</a></Text>
          </PopoverBody>
        </PopoverContent>
     </Popover>;
    return (
      <Flex background={status === 'on' ? '#0094EC' : '#161522'} color={status === 'on' ? 'white' : '#BFBFBF'}
            borderRadius={10} margin='10px 0 '>
        <Box p='4'>
          <Image borderRadius='full' boxSize='40px' src={obj.logoURI} mr='4'
                 fallbackSrc='/images/token.svg' />
        </Box>
        <Box p='4'>
          <Text fontWeight='500'>{obj.symbol}</Text>
          <Text fontSize={12}>{tokens.length ? <span>{tokens.length} tokens {tool}</span> :
            <span>0 tokens</span>}</Text>
        </Box>
        <Spacer />
        <Box p='4' paddingTop={6}>
          <Switch size='lg' defaultChecked={status === 'on'} onChange={() => {
            setTempList(tempList.map((l) => {
              let temL = { ...l };
              const { address: addressL = '' } = l;
              if (addressL === address) {
                temL.status = l.status === 'on' ? 'off' : 'on';
              }
              return temL;
            }));
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
        <Input borderColor='inherit' placeholder='https:// or ipfs:// or ENS name' onChange={handleInput}
               title='List URL' marginBottom={5} />
        <Box border='none' height={600} overflowY='auto'>
          {tempList.map((i) => createListCom(i))}
        </Box>
      </TabPanel>
      <TabPanel>
        <Input placeholder={god.currentNetwork.info.token.tokenExample}
               onChange={handleInput} />
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
        { /*mock data*/
          !isDrillDown && store.tokens.length && store.tokens.length > 10 &&
          <Box ml={4}><Text fontWeight='500'>Common bases <Tooltip
            label='These tokens are commonly paired with other tokens.'>
            <QuestionIcon cursor='help' />
          </Tooltip></Text> <Grid gap={4}
                                  templateColumns='repeat(4, 1fr)'> {store.tokens.slice(0, 10).map((obj) =>
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
      </ModalContent>
    </Modal>
  );
});
