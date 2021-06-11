import React from 'react';
import { Stack, BoxProps, Text, Button, Box, Img, Tag } from '@chakra-ui/react';
import { observer, useObserver, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { helper } from '../../lib/helper';
import { Badge } from '@chakra-ui/layout';

export const DesktopNav = observer((props: BoxProps) => {
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
      return <Button onClick={store.showConnecter}>{lang.t('connect.wallet')}</Button>;
    }
    return (
      <Box>
        <Button mr="2">
          {god.currentChain.Coin.balance.format} {god.currentChain.Coin.symbol}
        </Button>
        <Button onClick={store.showWalletInfo}>
          <Text>{helper.string.truncate(god.currentNetwork.account, 12, '...')}</Text>
        </Button>
      </Box>
    );
  });
  return (
    <Stack direction={'row'} spacing={2} {...props}>
      <Button onClick={store.showConnecter}>
        <Img w={6} src={god.currentChain.logoUrl} />
        <Box ml={2}>{god.currentChain.name}</Box>
      </Button>
      {accountView}
    </Stack>
  );
});
