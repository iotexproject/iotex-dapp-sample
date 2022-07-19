import React from 'react';
import { observer } from 'mobx-react-lite';
import { Burger, Container, createStyles, Group, Header, MediaQuery, Text } from '@mantine/core';
import { WalletInfo } from '../WalletInfo';
import { useStore } from '@/store/index';
import { HeaderLeft, Logo } from './HeaderLeft';
import { Links } from './Links';
import { User } from './User';
import { UserStore } from '@/store/user';
import { GlobalHistoryIcon, HistoryModal, TransactionResultModal } from '../HistoryModal';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  }
}));

export const HeaderTop = observer(() => {
  const { classes } = useStyles();
  const { user } = useStore();
  const isShow = (user as UserStore).layout.navbarMode === 'top' ? {} : { largerThan: 'sm' };
  return (
    //@ts-ignore
    <MediaQuery {...isShow} styles={{ display: 'none' }}>
      <Header height={56}>
        {/* @ts-ignore */}
        <Container size={'2xl'}>
          <div className={classes.inner}>
            <Logo></Logo>
            <Group spacing={5} className={classes.links}>
              <Links />
              <User type="HeaderTop" />
              <GlobalHistoryIcon />
              <HistoryModal />
              <TransactionResultModal />
            </Group>
            <Burger opened={user.layout.sidebarOpen.value} onClick={() => user.layout.sidebarOpen.setValue(!user.layout.sidebarOpen.value)} className={classes.burger} size="sm" />
          </div>
        </Container>
        <WalletInfo />
      </Header>
    </MediaQuery>
  );
});

export default HeaderTop;
