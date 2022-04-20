import React, { useState } from 'react';
import { createStyles, Navbar, Group, Box } from '@mantine/core';
import { BellRinging, Fingerprint, Key, Code, Settings, TwoFA, DatabaseImport, Receipt2, SwitchHorizontal, Logout, Home, Coin, Sun, MoonStars } from 'tabler-icons-react';
import { useStore } from '../../store/index';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
      }
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25) : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7]
        }
      }
    }
  };
});

const data = [
  { link: '/', label: 'Home', icon: Home },
  { link: '/erc20', label: 'ERC20 Example', icon: Coin }
];

export const NavbarSimple = observer(() => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Home');
  const { user, god } = useStore();

  const links = data.map((item) => (
    <Link href={item.link} key={item.label}>
      <Box
        className={cx(classes.link, { [classes.linkActive]: item.label === active })}
        sx={{ cursor: 'pointer' }}
        onClick={(event) => {
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} />
        <span>{item.label}</span>
      </Box>
    </Link>
  ));

  return (
    <Navbar height={'100%'} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Code size="30" />
            <Box ml={'md'}>IoTeX Dapp V3</Box>
          </Box>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            user.toggleTheme();
          }}
        >
          {user.isDark ? <Sun className={classes.linkIcon} /> : <MoonStars className={classes.linkIcon} />}
          <span>Change Theme</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => god.setShowConnecter(true)}>
          <SwitchHorizontal className={classes.linkIcon} />
          <span>Change Network</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
});
