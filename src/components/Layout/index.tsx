import React, { useState } from 'react';
import { AppShell, Navbar, Header, Footer, Aside, Text, MediaQuery, Burger, useMantineTheme, useMantineColorScheme, Group, ActionIcon, ScrollArea, Box } from '@mantine/core';
import { useStore } from '../../store/index';
import { Sun, MoonStars, Search } from 'tabler-icons-react';
import { observer } from 'mobx-react-lite';
import { NavbarSimple } from './Navbar';
import { SpotlightProvider } from '@mantine/spotlight';
import HeaderNav from '@/components/Header';

export const MainLayout = observer(({ children }: { children?: any }) => {
  const theme = useMantineTheme();
  const { user } = useStore();

  return (
    <SpotlightProvider actions={user.actions} searchIcon={<Search size={20} />} searchPlaceholder="Search..." shortcut="mod + k" nothingFoundMessage="Nothing found..." highlightQuery>
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
        header={
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Box p="sm">
              <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                <Burger opened={user.layout.sidebarOpen.value} onClick={() => user.layout.sidebarOpen.setValue(!user.layout.sidebarOpen.value)} size="sm" color={theme.colors.gray[6]} mr="xl" />
              </div>
            </Box>
          </MediaQuery>
          // <HeaderNav />
        }
      >
        {children}
      </AppShell>
    </SpotlightProvider>
  );
});

export default MainLayout;
