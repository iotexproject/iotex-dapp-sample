import React, { useState } from 'react';
import { AppShell, Navbar, Header, Footer, Aside, Text, MediaQuery, Burger, useMantineTheme, useMantineColorScheme, Group, ActionIcon, ScrollArea, Box } from '@mantine/core';
import { useStore } from '../../store/index';
import { Sun, MoonStars } from 'tabler-icons-react';
import { observer } from 'mobx-react-lite';
import { NavbarSimple } from './Navbar';

export const MainLayout = observer(({ children }: { children?: any }) => {
  const theme = useMantineTheme();
  const { user } = useStore();

  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
        }
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<NavbarSimple />}
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
    >
      {children}
    </AppShell>
  );
});

export default MainLayout;
