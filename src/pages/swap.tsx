import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Container, LoadingOverlay, SegmentedControl, Button } from '@mantine/core';
import { useEffect } from 'react';
import { rpc, gql } from '../lib/smartgraph/gql';
import { plainToInstance, plainToClass, classToPlain, instanceToPlain, plainToClassFromExist } from 'class-transformer';
import { UniswapRouterEntity } from '../store/entity';
import MainLayout from '../components/Layout/index';
import { Prism } from '@mantine/prism';
import { PromiseState } from '@/store/standard/PromiseState';
import { useStore } from '../store/index';

const demoCode = `

// smartgraph.ts
import { SmartGraph } from '@smartgraph/core';
export const smartGraph = new SmartGraph({
  plugins: [plugins.NetworkPlugin(), plugins.ERC20Extension(), plugins.LpTokenExtension(), UniswapPlugin()]
});
...

//page.tsx
import {rpc} from "@/src/lib/smartgraph/gql"

const swapQuery = await rpc('query')({
  UniswapRouter: [ { calls: [{ address: '0x147CdAe2BF7e809b9789aD0765899c06B361C5cE', chainId: 4689 }] }, {
      address: true,
      chainId: true,
      swap: [{args: {sellToken: 'IOTX',buyToken: '0xb8744ae4032be5e5ef9fab94ee9c3bf38d5d2ae0', buyAmount: 1000000000000000000,recipient: '0x2AcB8663B18d8c8180783C18b88D60b86de26dF2'}}, {
          amount: true,
          data: true,
          router: true,
          value: true,
          path: {
            address: true,
            symbol: true,
            decimals: true,
            totalSupply: true
          }
        }
      ]
    }
  ]
});
return plainToInstance(UniswapRouter, data.UniswapRouter[0]);

<Button loading={store.swapQuery.loading.value} onClick={() => store.swapQuery.value._swap.call()}>
  Swap
</Button>

`;

export const Home = observer(() => {
  const { god, ledger } = useStore();
  const store = useLocalObservable(() => ({
    swapQuery: new PromiseState({
      function: async ({ buyAmount = '1000000000000000000' }: { buyAmount?: string } = {}): Promise<UniswapRouterEntity> => {
        console.log(ledger.ledger.value);

        const data = await rpc('query')({
          UniswapRouter: [
            { calls: [{ address: '0x147CdAe2BF7e809b9789aD0765899c06B361C5cE', chainId: 4689, antenna: ledger.ledger.value }] },
            {
              address: true,
              chainId: true,
              swap: [
                {
                  args: {
                    sellToken: 'IOTX',
                    buyToken: '0xb8744ae4032be5e5ef9fab94ee9c3bf38d5d2ae0',
                    buyAmount,
                    recipient: '0xd023cfc198718bf1133ed99beadc227e340fd6d3'
                  }
                },
                {
                  amount: true,
                  data: true,
                  router: true,
                  value: true,
                  path: {
                    address: true,
                    symbol: true,
                    decimals: true,
                    totalSupply: true
                  }
                }
              ]
            }
          ]
        });
        if (store.swapQuery.value) {
          return plainToClassFromExist(store.swapQuery.value, data.UniswapRouter[0]);
        }

        const instance = plainToInstance(UniswapRouterEntity, data.UniswapRouter[0]);
        return instance;
      }
    }),
    async handleSwap() {
      if (!store.swapQuery.value.swap) {
        await store.swapQuery.call();
      }
      store.swapQuery.value._swap.call();
    }
  }));
  useEffect(() => {
    store.swapQuery.call();
  }, []);
  return (
    <MainLayout>
      <Prism language="tsx">{demoCode}</Prism>
      <Button loading={store.swapQuery.loading.value} onClick={() => store.handleSwap()}>
        Swap
      </Button>
      <pre style={{ position: 'relative', minHeight: '200px' }}>
        <LoadingOverlay visible={store.swapQuery.loading.value} />
        <Prism language="json">{JSON.stringify(store.swapQuery.value?.swap || {}, null, 2)}</Prism>
      </pre>
    </MainLayout>
  );
});

export default Home;
