import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { helper } from '@/lib/helper';
import { eventBus } from '@/lib/event';
import { metamaskUtils } from '@/lib/metaskUtils';
import { Box, Button, Group, Modal, Text, Tooltip, Image, Badge, Tabs, Stack, Center } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'tabler-icons-react';

export const TransactionResultModal = observer(() => {
  const {
    god,
    history,
    history: { curTransactionHistoryItem, transactionHistory }
  } = useStore();

  const curNetwork = god.currentNetwork.chain.map[god.currentChain.chainId];

  const registerToken = () => {
    metamaskUtils.registerToken(
      curTransactionHistoryItem.coin?.address,
      curTransactionHistoryItem.coin?.name,
      curTransactionHistoryItem.coin?.decimals ? curTransactionHistoryItem.coin?.decimals : 18,
      window.location.origin + curTransactionHistoryItem.coin?.logo
    );
  };
  return (
    <>
      <Modal opened={history.isTransactionDialogOpen} onClose={() => history.toggleTransactionDialog()} title="Transaction successfully">
        {/* <Box px={4} pb={2}>
          <Input placeholder={t('select-token-placeholder')} value={store.keyword.value} onChange={(e) => store.keyword.setValue(e.target.value)} />
        </Box> */}
        <Box px="6">
          <Text>Your {curNetwork?.name} TX hash</Text>
          <Link href={`${curNetwork?.explorerURL}/tx/${curTransactionHistoryItem?.hash}`}>{curTransactionHistoryItem?.hash}</Link>
          {/* <Copy ml="2" display={'inline'} color="base" value={curTransactionHistoryItem?.hash}></Copy> */}
        </Box>

        <Group px="6" mt="10" mb="10" spacing={4}>
          {curTransactionHistoryItem?.coin && (
            <Button
              fullWidth
              onClick={() => {
                registerToken();
              }}
            >
              Add {curTransactionHistoryItem?.coin?.name} to METAMASK
            </Button>
          )}
          <Button fullWidth onClick={() => history.toggleTransactionDialog()}>
            Okay
          </Button>
        </Group>
      </Modal>
    </>
  );
});

export const GlobalHistoryIcon = observer(() => {
  const {
    history,
    history: { isOpen, transactionHistory }
  } = useStore();

  const store = useLocalObservable(() => ({
    unreadCount: 0,
    setCount() {
      store.unreadCount = history.transactionHistory.value.filter((item) => !item.isRead).length;
    }
  }));

  useEffect(() => {
    store.setCount();
  }, [isOpen]);

  useEffect(() => {
    eventBus.on('history.insert', () => {
      store.setCount();
    });
  }, []);

  return (
    <>
      <Tooltip label="History">
        <Box
          onClick={() => {
            history.toggleOpen();
            history.clearHitoryRead();
          }}
        >
          <Image src="/images/icon_history.svg" />
          {/* <>
            {store.unreadCount != 0 && (
            //   <Badge
            //     display="flex"
            //     justifyContent="center"
            //     alignItems="center"
            //     transform={'scale(.8)'}
            //     h="20px"
            //     w="20px"
            //     borderRadius="full"
            //     bg="red.500"
            //     color="white"
            //     position="absolute"
            //     top="-10px"
            //     right="-10px"
            //   >
            //     {store.unreadCount}
            //   </Badge>
            )}
          </> */}
        </Box>
      </Tooltip>
    </>
  );
});

export const HistoryModal = observer(() => {
  const { history, god } = useStore();
  const searchProps = {
    placeholder: 'Search by address',
    validator(value: string) {
      if (value === '' || helper.address.validateAddress(value)) {
        return true;
      }
      return 'Please enter a valid address!';
    }
  };
  //   const columns: Column[] = [
  //     {
  //       title: 'ACTION',
  //       dataKey: 'title',
  //       headerProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       cellProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       render: (value, record) => {
  //         return (
  //           <Box fontWeight={'bold'} color="base">
  //             {value.toUpperCase()}
  //           </Box>
  //         );
  //       }
  //     },
  //     {
  //       title: 'TIME',
  //       dataKey: 'timestamp',
  //       headerProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       cellProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       render: (value, record) => {
  //         return (
  //           <VStack align="start">
  //             <Box>{dayjs(value).format('DD/MM/YYYY')}</Box>
  //             <Box>{dayjs(value).format('hh:mm:ss A')}</Box>
  //           </VStack>
  //         );
  //       }
  //     },
  //     {
  //       title: 'FROM',
  //       dataKey: 'from',
  //       headerProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       search: true,
  //       searchProps,
  //       onSearch(value: string) {
  //         console.log(value);
  //       },
  //       cellProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       render: (value, record) => {
  //         return (
  //           <>
  //             {value ? (
  //               <HStack>
  //                 <Box>{helper.address.formatAddress(value)}</Box>
  //                 <Copy ml="0.26rem" value={value} isConvert />
  //               </HStack>
  //             ) : (
  //               '-'
  //             )}
  //           </>
  //         );
  //       }
  //     },
  //     {
  //       title: 'TO',
  //       dataKey: 'to',
  //       search: true,
  //       searchProps,
  //       onSearch(value: string) {
  //         console.log(value);
  //         history.setFilterTo(value);
  //       },
  //       headerProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       cellProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       render: (value, record) => {
  //         return (
  //           <>
  //             {value ? (
  //               <HStack>
  //                 <Box>{helper.address.formatAddress(value)}</Box>
  //                 <Copy ml="0.26rem" value={value} isConvert />
  //               </HStack>
  //             ) : (
  //               '-'
  //             )}
  //           </>
  //         );
  //       }
  //     },

  //     {
  //       title: 'HASH',
  //       dataKey: 'hash',
  //       headerProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       cellProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       render: (value, record) => {
  //         return (
  //           <>
  //             {value ? (
  //               <HStack color="base">
  //                 {record.status === 'loading' && <InfoOutlineIcon mr="0.5rem" color="warning" />}
  //                 <Anchor href={god.getNetworkByChainId(record.chainId).explorerURL + '/tx/' + value}>{helper.address.formatAddress(value)}</Anchor>
  //                 <Copy ml="0.26rem" value={value} isConvert />
  //               </HStack>
  //             ) : (
  //               '-'
  //             )}
  //           </>
  //         );
  //       }
  //     },
  //     {
  //       title: 'AMOUNT',
  //       dataKey: 'amount',
  //       headerProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       cellProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       render: (value, record) => {
  //         return (
  //           <>
  //             <Box ml="6">{value}</Box>
  //           </>
  //         );
  //       }
  //     },
  //     {
  //       title: 'STATUS',
  //       dataKey: 'status',
  //       headerProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       cellProps: () => {
  //         return {
  //           whiteSpace: 'nowrap'
  //         };
  //       },
  //       render: (value, record) => {
  //         return (
  //           <HStack>
  //             {value == 'success' && <CheckCircleIcon color="base" />}
  //             {value == 'loading' && <Spinner color="warning" size={'xs'} />}
  //             <Box color={value == 'success' ? 'base' : 'warning'}>{value.toUpperCase()}</Box>
  //           </HStack>
  //         );
  //       }
  //     }
  //   ];

  const tabStyle = {
    bg: 'input',
    fontWeight: 'bold',
    w: '200px',
    borderRadius: '15px',
    _selected: { bg: 'backgroundAlt', color: 'base', boxShadow: 'baseShadow' },
    _focus: { border: 'none' }
  };
  return (
    <Modal
      size="6xl"
      opened={history.isOpen}
      onClose={() => {
        history.toggleOpen();
        history.setFilterMoudle(history.moduleList[0]);
      }}
      title="History"
    >
      <Box mx={4}>
        {/* <Tabs mb="4" variant="soft" colorScheme="mimo" w="full">
          <TabList bg="input" borderRadius={'15px'} display={'flex'} justifyContent="space-between">
            {history.moduleList?.map((item, index) => {
              return (
                <Tab
                  key={index}
                  fontSize={['sm', 'unset']}
                  {...tabStyle}
                  onClick={(i) => {
                    history.setFilterMoudle(item);
                    history.setFilterFrom('');
                    history.setFilterTo('');
                  }}
                >
                  {item.toUpperCase()}
                </Tab>
              );
            })}
          </TabList>
        </Tabs> */}
        {/* <Scroll overflow={'auto'}>
            <Table columns={columns} dataSource={history.history || []}></Table>
            <Paginator
              total={history.pagenation.total}
              pageSize={history.pagenation.pageSize}
              current={history.pagenation.currentPage}
              onPageChange={(page) => history.setCurrentPage(page)}
              onSizeChange={(size) => history.setPageSize(size)}
            ></Paginator>
          </Scroll> */}
      </Box>
    </Modal>
  );
});

export const TransactionSubmitDialog = observer(() => {
  const { t } = useTranslation();
  const { god } = useStore();

  return (
    <Modal opened={god.showTransactionSubmitDialog.value} onClose={() => god.showTransactionSubmitDialog.setValue(false)} title={t('transaction-submitted')}>
      <Center>
        <svg xmlns="http://www.w3.org/2000/svg" width="97" height="97" viewBox="0 0 24 24" fill="none" stroke="#42a2eb" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="16 12 12 8 8 12"></polyline>
          <line x1="12" y1="16" x2="12" y2="8"></line>
        </svg>
      </Center>

      <Center
        mb={10}
        mt={10}
        sx={(theme) => ({
          color: '#42a2eb',
          cursor: 'pointer',
          ':hover': {
            textDecoration: 'underline'
          }
        })}
      >
        <Link href={`${god.currentChain?.explorerURL}/tx/${god.curTransaction?.hash}`} color="base">
          <Group>
            <Text>{t('view-on-explorername', { explorerName: god.currentChain.explorerName })}</Text>
            <ExternalLink color="#42a2eb" style={{ marginTop: '-3px' }}></ExternalLink>
          </Group>
        </Link>
      </Center>
    </Modal>
  );
});
