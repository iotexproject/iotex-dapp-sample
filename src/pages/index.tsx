import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import MainLayout from '@/components/Layout';
import { Box } from '@mantine/core';

export const Home = observer(() => {
  const { lang } = useStore();

  const links = [
    { text: 'GitHub |', url: 'https://github.com/iotexproject/iotex-dapp-sample-v2' },
    { text: `${lang.t('issues')} |`, url: 'https://github.com/iotexproject/iotex-dapp-sample-v2/issues' },
    { text: `${lang.t('use.template')}`, url: 'https://github.com/iotexproject/iotex-dapp-sample-v2/generate' }
  ];

  return (
    <Box>
      <MainLayout />
    </Box>
  );
});

export default Home;
