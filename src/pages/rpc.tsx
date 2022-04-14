import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Link from 'next/link';
import { Box, Container, LinkBox, SimpleGrid, LinkOverlay, Stack, Alert, Image, Link as ChakraLink } from '@chakra-ui/react';
import { ToolConfig } from '../config/ToolConfig';
import { Badge, Flex, Text } from '@chakra-ui/layout';
import { useStore } from '@/store/index';
import { useEffect } from 'react';
import { rpc } from '../lib/smartgraph/gql';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { UniswapRouter } from '../store/router';

export const Home = observer(() => {
  const { lang } = useStore();

  const store = useLocalObservable(() => ({
    data: null,
    async loadData() {
      const data = await rpc('query')({
        UniswapRouter: [
          { calls: [{ address: '0x95cB18889B968AbABb9104f30aF5b310bD007Fd8', chainId: 4689 }] },
          {
            swap: [
              {
                args: {
                  buyToken: 'IOTX',
                  sellToken: 'BUSD_b',
                  buyAmount: `${1000000000000000000 * Math.random()}`,
                  recipient: '0x2AcB8663B18d8c8180783C18b88D60b86de26dF2'
                }
              },
              {
                amount: true,
                data: true,
                router: true,
                path: {
                  address: true,
                  symbol: true
                }
              }
            ]
          }
        ]
      });
      const swap = plainToClass(UniswapRouter, data.UniswapRouter[0]);
      store.data = instanceToPlain(swap);
    }
  }));
  useEffect(() => {
    store.loadData();
  }, []);

  return (
    <Container maxW="7xl">
      <pre>{JSON.stringify(store.data, null, 2)}</pre>
    </Container>
  );
});

export default Home;
