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
import { ChevronLeftIcon, SettingsIcon, CheckIcon } from '@chakra-ui/icons';
import { useStore } from '../../store/index';
import TokenState from '../../store/lib/TokenState';
import { StringState } from '../../store/standard/base';
import { Text } from '@chakra-ui/layout';
import {TokenListWithSearch} from './tokens';
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
  const [tokenData, setToken] = useState<any>({});
  const store = useLocalObservable(() => ({
    deleteKeyword: new StringState(),
    tokenList: new StorageState<any[]>({ key: 'TokenStore.tokenList', default: [...token?.tokenList?.value] }),
    onClose() {
      props.onClose();
      setDrill(false);
    },
    onSelect(item: TokenState) {
      props.onSelect(item);
      store.onClose();
    },
    addToken(item: TokenState) {
      token.saveToken(item);
    },
    manageToken(arr) {
      token.manageToken(arr);
    }
  }));
  useEffect(() => {
    setTempList([...store.tokenList?.value]);
  }, []);
  const popoverColor = useColorModeValue('black', 'white');
  const onSearch = (val) => {
    if (val) fetch(val).then(response => response.json()).then(data => {
      if (data && data.name) {
        setToken({ ...data, url: val, enable: false });
      } else {
        // Enter valid list location
        setToken({});
      }
    });
    setToken({});
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
          <SettingsIcon cursor='pointer'/>
        </PopoverTrigger>
        <PopoverContent color={popoverColor} width={200}>
          <PopoverArrow/>
          <PopoverCloseButton/>
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
                 fallbackSrc='/images/token.svg'/>
        </Box>
        <Box p='4'>
          <Text fontWeight='500'>{obj?.name}</Text>
          <Text fontSize={12}><span>{tokens.length || 0} tokens {tokens.length && tool}</span></Text>
        </Box>
        <Spacer/>
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
          }}/>
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
               title='List URL' marginBottom={5}/>
        <Box border='none' height={500} overflowY='auto'>
          {tokenData && Object.keys(tokenData).length ?
            <Flex key={tokenData?.url + 'new'}
                  background={tempList.filter((i) => i.name === tokenData.name).length ? '#1AA034' : '#3C3F41'}
                  color={tempList.filter((i) => i.name === tokenData.name).length ? 'white' : '#BFBFBF'}
                  borderRadius={10} margin='10px 0 '>
              <Box p='4'>
                <Image borderRadius='full' boxSize='40px' src={tokenData?.logoURI} mr='4'
                       fallbackSrc='/images/token.svg'/>
              </Box>
              <Box p='4'>
                <Text fontWeight='500'>{tokenData?.name}</Text>
                <Text fontSize={12}><span>{tokenData?.tokens.length || 0} tokens</span></Text>
              </Box>
              <Spacer/>
              <Box p='4' paddingTop={6}>
                {
                  tempList.filter((i) => i.name === tokenData.name).length ?
                    <Text fontSize={12}><span><CheckIcon/> Loaded</span></Text> : <Button
                      ml='4'
                      px='4'
                      size='sm'
                      onClick={(e) => {
                        setTempList([tokenData, ...tempList]);
                        store.manageToken([tokenData, ...tempList]);
                        setTimeout(() => {
                          setToken('');
                          setListUrlInput('');
                        }, 500);
                      }}
                    >
                      Import
                    </Button>
                }
              </Box>
            </Flex> : <Text color='red'>{listUrlInput && 'Enter valid list location'}</Text>}
          {tempList.map((i) => createListCom(i))}
        </Box>
      </TabPanel>
      <TabPanel>
        <Box>
          <TokenListWithSearch onSelect={store.onSelect} blackList={props.blackList} isTokenManage={true}/>
        </Box>
        <Text fontSize={12} textAlign='center'>Tip: Custom tokens are stored locally in your browser</Text>
      </TabPanel>
    </TabPanels>
  </Tabs>);
  return (
    <Modal isOpen={props.isOpen} onClose={store.onClose} closeOnEsc closeOnOverlayClick>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>{isDrillDown ? <Grid gap={4}>
          <GridItem colSpan={2}><ChevronLeftIcon cursor='pointer' w={8} h={8}
                                                 onClick={() => {
                                                   setDrill(false);
                                                   // store.keyword.setValue('');
                                                   setToken({});
                                                   setListUrlInput('');
                                                 }}/></GridItem>
          <GridItem colStart={3} colEnd={6}>{lang.t('manage')}</GridItem>
        </Grid> : lang.t('select.token')}</ModalHeader>
        <ModalCloseButton/>
        {isDrillDown ? temCom :
          <Box>
            <TokenListWithSearch onSelect={store.onSelect} blackList={props.blackList} isTokenManage={false}/>
            <Button
              width='90%'
              margin='0 auto 10px 10px'
              onClick={() => setDrill(true)}
            >{lang.t('manage.token.list')}</Button>
          </Box>}
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => {
          onClose();
        }}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader/>
            <ModalBody>
              Please confirm you would like to remove this list by typing REMOVE
              <Input value={store.deleteKeyword.value} marginTop='15px'
                     onChange={(e) => store.deleteKeyword.setValue(e.target.value)}/>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => {
                if (store.deleteKeyword.value === 'REMOVE') {
                  const { name = '' } = editData;
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
