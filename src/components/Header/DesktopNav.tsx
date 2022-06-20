import React, { useEffect, useState } from 'react';
import { observer, useObserver, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import { helper } from '@/lib/helper';
import { Box, Center, createStyles, Menu, Text } from '@mantine/core';
import Jazzicon from '../Jazzicon';
import { AlignRight, ChevronDown, Home, LayersLinked } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none'
      }
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 1,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      // color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,

      cursor: 'pointer',
      fontFamily: 'Inter',
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
      }
    },
    linkLabel: {
      marginRight: 5
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

interface HeaderSearchProps {
  link: string;
  label: string;
  icon: any;
  links?: {
    link?: string;
    label?: string;
  }[];
}

const links: Array<HeaderSearchProps> = [
  {
    link: '/',
    label: 'Home',
    icon: Home
  },
  {
    link: '/api/graphql',
    label: 'Playground',
    icon: LayersLinked
  }
];

const DesktopNav = observer((props) => {
  const { god, lang } = useStore();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Home');

  const store = useLocalObservable(() => ({
    showConnecter() {
      god.setShowConnecter(true);
    },
    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true;
    },
    currentAvatar: 1
  }));
  const router = useRouter();
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => <Menu.Item key={item.link}>{item.label}</Menu.Item>);
    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <a href={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <ChevronDown size={12} />
              </Center>
            </a>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <Link href={link.link} key={link.label}>
        <Box
          className={cx(classes.link, { [classes.linkActive]: link.label === active })}
          sx={{ cursor: 'pointer' }}
          onClick={(event) => {
            setActive(link.label);
          }}
        >
          <link.icon className={classes.linkIcon} />
          <span>{link.label}</span>
        </Box>
      </Link>
      // <a
      //   key={link.label}
      //   href={link.link}
      //   className={classes.link}
      //   style={{
      //     color: router.asPath === link.link ? '#ff3998' : '#000',
      //     display: 'flex',
      //     alignItems: 'center'
      //   }}
      // >
      //   {link.icon && <link.icon size={20} />}
      //   <Text ml={5}>
      //     {link.label}
      //   </Text>
      // </a>
    );
  });
  const accountView = useObserver(() => {
    if (!god.currentNetwork.account) {
      return (
        <Text
          color={'pink'}
          style={{
            borderRadius: '1.25rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: '#fff',
            background: 'linear-gradient(90deg, rgb(224, 49, 49) 0%, rgb(230, 73, 128) 100%)'
          }}
          onClick={store.showConnecter}
          py="0.25rem"
          px="0.8rem"
        >
          Connect Wallet
        </Text>
      );
    }
    return (
      <>
        {god.currentNetwork.account && (
          <Box mr="1rem" color="pink">
            {/* <Person /> */}
            <Box style={{ borderRadius: '50%' }} ml={5}>
              <Jazzicon diameter={30} address={god.currentNetwork.account || '0x......'} />
            </Box>
          </Box>
        )}
        <Box
          style={{ display: 'flex', fontWeight: 'semibold', cursor: 'pointer', borderRadius: '1.25rem' }}
          sx={(theme) => ({
            background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
          })}
          onClick={store.showWalletInfo}
        >
          <Box style={{ background: '#edfff6', borderRadius: '1.25rem' }} py="0.25rem" px="8px" mr="0.5rem">
            <Text
              style={{
                color: 'rgb(67, 201, 186)'
              }}
            >
              0x
            </Text>
          </Box>
          <Text mr={2} pr="2" py="0.25rem">
            {helper.string.truncate(god.currentNetwork.account, 10, '...')}
          </Text>
        </Box>
      </>
    );
  });

  return (
    <>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        {items}
        {accountView}
      </Box>
    </>
  );
});

DesktopNav.displayName = 'DesktopNav';
export default DesktopNav;
