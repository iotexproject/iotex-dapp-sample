import { helper } from '@/lib/helper';
import { useStore } from '@/store/index';
import { ChainState } from '@/store/lib/ChainState';
import { Text, Modal, Group, Avatar, Box, Grid, Indicator, Center, Stack, Button } from '@mantine/core';
import _ from 'lodash';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AlertCircle } from 'tabler-icons-react';

interface NetworkCheckDialog {
  [key: string]: any;
}
// [4690, 1, 56, 97]
export const WrongNetworkDialog = observer(({ ...restProps }: NetworkCheckDialog) => {
  const {
    user,
    user: { networkChecker },
    god
  } = useStore();
  const router = useRouter();
  const supportChainId = networkChecker?.supportChainIds[router.pathname] || [];

  useEffect(() => {
    console.log(user?.wetherWrongnetwork(router.pathname), router.pathname);
    if (user?.wetherWrongnetwork(router.pathname)) {
      user.setWrongNetworkDialog(true);
    }
  }, [god.updateTicker.value]);

  const getSupportChainArray = (): ChainState[] => {
    return _.filter(god.network.chain.map, (v) => supportChainId.some((i) => i === v.chainId));
  };

  return (
    <>
      <Modal
        transition="rotate-left"
        opened={networkChecker?.isWrongNetworkDialogOpen.value}
        onClose={() => user.setWrongNetworkDialog(false)}
        title={
          <Group>
            <AlertCircle size={16} color="orange" />
            <Text style={{ fontWeight: 'bolder' }}>WRONG NETWORK</Text>
          </Group>
        }
      >
        <Text p={5}>
          Your current network is <Avatar style={{ display: 'inline-block' }} size={17} mr={4} src={god.currentChain.logoUrl}></Avatar>
          <Text color="green" style={{ display: 'inline-block' }}>
            {god.currentChain.name}
          </Text>{' '}
          . Please connect to a supported network below or in your wallet.
        </Text>

        <Group mt={20} grow>
          {/*  getSupportChainArray*/}
          {getSupportChainArray().map((i) => (
            <Box
              sx={(theme) => ({
                padding: '10px',
                cursor: 'pointer',
                '&:hover': {
                  borderRadius: '10px',
                  transition: 'all .3s',
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[1]
                }
              })}
            >
              <Group position="center">
                <Indicator inline size={16} offset={7} withBorder position="bottom-end" disabled={god.currentChain.chainId != i.chainId} color={'green'}>
                  <Avatar
                    src={i.logoUrl}
                    size="md"
                    onClick={() => {
                      helper.setChain(god, i.chainId).then((res) => {
                        user.setWrongNetworkDialog(false);
                      });
                    }}
                  ></Avatar>
                </Indicator>
              </Group>

              <Text mt={1} size="xs" align={'center'}>
                {i.name}
              </Text>
            </Box>
          ))}
        </Group>

        <Text mt={15} color="textSubtle" align="left">
          (Click the top button to switch the chain)
        </Text>
        <Button onClick={() => user.setWrongNetworkDialog(false)} fullWidth mt={15}>
          OK
        </Button>
      </Modal>
    </>
  );
});
