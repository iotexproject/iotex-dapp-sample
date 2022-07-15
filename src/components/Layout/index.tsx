import React, { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import { useStore } from '../../store/index';
import { Sun, MoonStars, Search } from 'tabler-icons-react';
import { observer } from 'mobx-react-lite';
import { SpotlightProvider } from '@mantine/spotlight';
import HeaderTop from '@/components/Layout/HeaderTop';
import { HeaderLeft } from './HeaderLeft';
import { UserStore } from '@/store/user';
import { useMediaQuery } from '@mantine/hooks';

export const MainLayout = observer(({ children }: { children?: any }) => {
  const theme = useMantineTheme();
  const { user } = useStore();
  const navbarMode = (user as UserStore).layout.navbarMode;
  const isPC = useMediaQuery('(min-width: 768px)');
  const navbar = isPC ? (navbarMode === 'left' ? { navbar: <HeaderLeft /> } : null) : { navbar: <HeaderLeft /> };
  const header = isPC ? (navbarMode === 'top' ? { header: <HeaderTop /> } : null) : { header: <HeaderTop /> };

  return (
    <SpotlightProvider actions={user.actions} searchIcon={<Search size={20} />} searchPlaceholder="Search..." shortcut="mod + k" nothingFoundMessage="Nothing found..." highlightQuery>
      <AppShell
        //@ts-ignore
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
          }
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        {...navbar}
        {...header}
      >
        {children}
      </AppShell>
    </SpotlightProvider>
  );
});

export default MainLayout;
