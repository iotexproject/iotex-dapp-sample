import React from 'react';
import { UnstyledButton, Group, Text, createStyles, Box, Image, ThemeIcon, Avatar, useMantineTheme } from '@mantine/core';
import { ChevronRight, Search } from 'tabler-icons-react';
import Jazzicon from '../Jazzicon';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { helper } from '../../lib/helper';
import { SwitchThemeToggle } from './SwitchTheme';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    margin: '0',
    padding: '0',
    borderRadius: '10px',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
    }
  }
}));

export const User = observer(({ type }: { type: 'HeaderLeft' | 'HeaderTop' }) => {
  const { god } = useStore();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const store = useLocalObservable(() => ({
    showConnecter() {
      god.setShowConnecter(true);
    },
    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true;
    },
    currentAvatar: 1
  }));
  return (
    <Box sx={type == 'HeaderLeft' ? {} : { display: 'flex',alignItems:"center" }}>
      {god.currentNetwork.account ? (
        <UnstyledButton className={classes.user} sx={type == 'HeaderLeft' ? { flex: 1 } : {}}>
          <Group spacing={10} p="xs" onClick={store.showWalletInfo}>
            <Jazzicon diameter={30} address={god.currentNetwork.account || '0x......'} />
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
      ) : (
        <UnstyledButton
          onClick={store.showConnecter}
          className={classes.user}
          size="xs"
          style={{
            background: theme.fn.linearGradient(90, theme.colors.red[8], theme.colors.pink[6]),
            borderRadius: '50px',
            ...(type == 'HeaderLeft' ? { flex: 1 } : { marginRight: 'sm', height: '60%' })
          }}
        >
          <Group spacing={10} style={type == 'HeaderLeft' ? { padding: '10px' } : { padding: '5px 10px 5px 5px' }}>
            <Text color={'white'} weight="bold" ml="10px">
              Connect Wallet
            </Text>
          </Group>
        </UnstyledButton>
      )}
      <UnstyledButton className={classes.user} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Group spacing={10} p="xs" onClick={store.showConnecter} sx={{ flexWrap: 'nowrap' }}>
          <Avatar size={30} src={`//logo.chainbit.xyz/${god.Coin.symbol.toLowerCase()}`} />
          <Box>{god.currentNetwork.currentChain.name}</Box>
        </Group>
        <SwitchThemeToggle />
      </UnstyledButton>
    </Box>
  );
});
