import React from 'react';
import { UnstyledButton, Group, Text, createStyles, Box, Image } from '@mantine/core';
import { ChevronRight, Search } from 'tabler-icons-react';
import Jazzicon from '../Jazzicon';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { helper } from '../../lib/helper';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    border: '2px solid #edf2f7', 
    borderRadius: '10px',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: '2px',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
    }
  }
}));

export const User = observer(() => {
  const { god } = useStore();
  const { classes } = useStyles();

  const store = useLocalObservable(() => ({
    showConnecter() {
      god.setShowConnecter(true);
    },
    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true;
    },
    currentAvatar: 1,
  }));
  if (!god.currentNetwork.account) {
    return (
      <Group>
        <Text color={'pink'} onClick={store.showConnecter} style={{ cursor: 'pointer', background: '#FFF0E8', borderRadius: '1.25rem'}} py="0.25rem" px="0.8rem">
          Connect Wallet
        </Text>
      </Group>
    );
  }
  return (
    <Group direction="column">
      <UnstyledButton className={classes.user} onClick={store.showConnecter} style={{ display: 'flex', alignItems: 'center'}}>
        <Image width={38} src={god.currentNetwork.currentChain.logoUrl} style={{ marginRight: 8 }}></Image>
        <Box>{god.currentNetwork.currentChain.name}</Box>
      </UnstyledButton>
      <UnstyledButton className={classes.user} sx={{ flex: 1 }} onClick={store.showWalletInfo}>
        <Group spacing={10}>
          <Jazzicon diameter={30} address={god.currentNetwork.account || '0x......'} style={{ border: '2px solid #617aff', borderRadius: '50px', padding: '1px' }} />
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {helper.string.truncate(god.currentNetwork.account || '0x......', 12, '...')}
            </Text>
            <Text color="dimmed" size="xs">
              <span style={{ marginRight: 4 }}>{god.currentChain.Coin.balance.format}</span>
              <span>{god.currentChain.Coin.symbol}</span>
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </Group>
  );
});
