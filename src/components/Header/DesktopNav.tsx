import React, { useEffect } from 'react';
import { observer, useObserver, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import { helper } from '@/lib/helper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Text } from '@mantine/core';
import Jazzicon from '../Jazzicon';

const DesktopNav = observer((props) => {
  const { god, lang } = useStore();
  const router = useRouter();

  const store = useLocalObservable(() => ({
    showConnecter() {
      god.setShowConnecter(true);
    },
    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true;
    },
    currentAvatar: 1
  }));
  useEffect(() => {
    const orignalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, newValue) {
      let setItemEvent = new Event('setItemEvent');
      // @ts-ignore
      setItemEvent.newValue = newValue;
      window.dispatchEvent(setItemEvent);
      orignalSetItem.apply(this, arguments);
    };
    function rightCartData() {
      setTimeout(() => {
        const res = localStorage.getItem('currentAvatar');
        store.currentAvatar = res ? parseInt(res) : 1;
      }, 0);
    }
    window.addEventListener('setItemEvent', rightCartData);

    return () => {
      window.removeEventListener('setItemEvent', rightCartData);
    };
  }, []);
  const links = [
    { name: lang.t('Home'), path: '/' },
  ];

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
        <Box style={{ display: 'flex', background: '#FFF0E8', fontWeight: 'semibold', cursor: 'pointer', borderRadius: '1.25rem' }} onClick={store.showWalletInfo}>
          <Box style={{ background: '#edfff6', borderRadius: '1.25rem' }} py="0.25rem" px="8px" mr="0.5rem">
            <Text
              style={{
                // backgroundImage: 'linear-gradient(rgb(67, 201, 186), rgb(150, 67, 201))',
                // backgroundClip: 'text',
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
        {links.map((item) => {
          return (
            <Link href={item.path} key={item.name}>
              <Text
                color={router.asPath === item.path ? '#ff3998' : 'base'}
                style={{ cursor: 'pointer', fontFamily: 'Inter' }}
                sx={{
                  '&:hover': {
                    color: '#ff3998'
                  }
                }}
                mr="1.8rem"
              >
                {item.name}
              </Text>
            </Link>
          );
        })}

        {god.currentNetwork.account && (
          <Link href={'/profile'}>
            <Box mr="1rem" color="pink">
              {/* <Person /> */}
              <Box style={{  borderRadius: '50%' }}>
                <Jazzicon diameter={30} address={god.currentNetwork.account || '0x......'} />
              </Box>
            </Box>
          </Link>
        )}
        {accountView}
      </Box>
    </>
  );
});

DesktopNav.displayName = 'DesktopNav';
export default DesktopNav;
