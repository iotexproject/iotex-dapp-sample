import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { helper } from '@/lib/helper';
import { eventBus } from '@/lib/event';
import { metamaskUtils } from '@/lib/metaskUtils';
import { Box, Button, Group, Modal, Text, Tooltip, Image, Badge, Tabs, Stack, Center, Anchor } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'tabler-icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { TransactionItem } from '@/store/history';
import { Table } from '../Common/Table';
import { Copy } from '../Common/Copy';

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

interface GlobalHistoryIconProps {
  [key: string]: any;
}
export const GlobalHistoryIcon = observer(({ ...restProps }: GlobalHistoryIconProps) => {
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
          {...restProps}
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

  const columns: ColumnDef<TransactionItem>[] = [
    {
      header: 'TITLE',
      accessorKey: 'title',
      cell: (v) => <Text style={{ width: 'fit-content' }}>{v.getValue()}</Text>
    },
    {
      header: 'TIMESTAMP',
      accessorKey: 'timestamp',
      cell: (v) => (
        <>
          <Text> {dayjs(v.getValue() as any).format('DD/MM/YYYY')}</Text>
          <Text> {dayjs(v.getValue() as any).format('hh:mm:ss A')}</Text>
        </>
      )
    },
    {
      header: 'FROM',
      accessorKey: 'from',
      cell: (v) => <Box>{helper.address.formatAddress(v.getValue())}</Box>
    },
    {
      header: 'TO',
      accessorKey: 'to',
      cell: (v) => <Box>{helper.address.formatAddress(v.getValue())}</Box>
    },

    {
      header: 'HASH',
      accessorKey: 'hash',
      cell: ({
        getValue,
        row: {
          original: { chainId }
        }
      }) => (
        <Group>
          <Anchor target="_blank" href={god.getNetworkByChainId(chainId).explorerURL + '/tx/' + getValue()}>
            {helper.address.formatAddress(getValue())}
          </Anchor>

          <Copy value={getValue() as string}></Copy>
        </Group>
      )
      //   render: (value, record) => {
      //     return (
      //       <>
      //         {value ? (
      //           <Stack color="base">
      //             {/* {record.status === 'loading' && <InfoOutlineIcon mr="0.5rem" color="warning" />} */}
      //             <Anchor href={god.getNetworkByChainId(record.chainId).explorerURL + '/tx/' + value}>{helper.address.formatAddress(value)}</Anchor>
      //             {/* <Copy ml="0.26rem" value={value} isConvert /> */}
      //           </Stack>
      //         ) : (
      //           '-'
      //         )}
      //       </>
      //     );
      //   }
    },
    {
      header: 'AMOUNT',
      accessorKey: 'amount',
      cell: (v) => <i>{v.getValue()}</i>
      //   render: (value, record) => {
      //     return (
      //       <>
      //         <Box ml="6">{value}</Box>
      //       </>
      //     );
      //   }
    },
    {
      header: 'STATUS',
      accessorKey: 'status',
      cell: (v) => <i>{v.getValue()}</i>
      //   render: (value, record) => {
      //     return (
      //       <></>
      //       // <HStack>
      //       //   {value == 'success' && <CheckCircleIcon color="base" />}
      //       //   {value == 'loading' && <Spinner color="warning" size={'xs'} />}
      //       //   <Box color={value == 'success' ? 'base' : 'warning'}>{value.toUpperCase()}</Box>
      //       // </HStack>
      //     );
      //   }
    }
  ];

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
        <Table columns={columns} data={history.history} highlightOnHover></Table>
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
