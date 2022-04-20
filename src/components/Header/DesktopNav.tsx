import React from 'react';
import { Text, Button, Box, Image, Group } from '@mantine/core';
import { observer, useObserver, useLocalStore } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import { helper } from '@/lib/helper';
import Jazzicon from '../Jazzicon';
import { useColorScheme } from '@mantine/hooks';

export const DesktopNav = observer((props) => {
  const { god, lang } = useStore();

  const store = useLocalStore(() => ({
    showConnecter() {
      god.setShowConnecter(true);
    },

    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true;
    }
  }));

  const accountView = useObserver(() => {
    if (!god.currentNetwork.account) {
      return (
        <Button onClick={store.showConnecter}>
          {lang.t('connect.wallet')}
        </Button>
      );
    }
    const colorScheme = useColorScheme();
    return (
      <Button style={{ paddingRight: 0, paddingLeft: 4, background: colorScheme === 'dark' ? 'gray.100' : 'dark.100' }}>
        <Text style={{marginRight: 2, fontSize: 'sm'}}>
          <span style={{ marginRight: 1 }}>{god.currentChain.Coin.balance.format}</span>
          <span>{god.currentChain.Coin.symbol}</span>
        </Text>
        <Button
          px={4}
          onClick={store.showWalletInfo}
          sx={{
            color: 'white',
            bgGradient: god.currentChain.info.theme?.bgGradient,
            _hover: { bgGradient: god.currentChain.info.theme?.bgGradient },
            _active: { bgGradient: god.currentChain.info.theme?.bgGradient }
          }}
        >
          <Text mr={2}>{helper.string.truncate(god.currentNetwork.account, 12, '...')}</Text>
          <Jazzicon diameter={22} address={god.currentNetwork.account} style={{ border: '2px solid #617aff', borderRadius: '50px', padding: '1px' }}></Jazzicon>
        </Button>
      </Button>
    );
  });
  return (
    <Group  spacing={2} {...props}>
      <Button onClick={store.showConnecter} style={{ paddingLeft: 1, borderRadius: '40' }}>
        <Image style={{width: 8}} src={god.currentChain.logoUrl} />
        <Box ml={2}>{god.currentChain.name}</Box>
      </Button>
      {accountView}
    </Group>
  );
});
