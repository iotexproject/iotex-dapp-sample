import React from 'react';
import { observer } from 'mobx-react-lite';
import { Burger, Container, createStyles, Group, Header, Text } from '@mantine/core';
import DesktopNav from './DesktopNav';
import { WalletInfo } from '../WalletInfo';
import { useStore } from '@/store/index';


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
  },
}));



export const index = observer(() => {
  const { classes } = useStyles();
  const { user } = useStore();
  return (
    <Header height={56}>
      <Container size={'xl'}>
        <div className={classes.inner}>
          <Text>IoTeX Dapp Sample</Text>
          <Group spacing={5} className={classes.links}>
            <DesktopNav />
          </Group>
          <Burger opened={user.layout.sidebarOpen.value} onClick={() => user.layout.sidebarOpen.setValue(!user.layout.sidebarOpen.value)} className={classes.burger} size="sm" />
        </div>
      </Container>
      {/* TODO */}
      {/* <WalletInfo /> */}
    </Header>
  );
})

index.displayName = 'index'
export default index