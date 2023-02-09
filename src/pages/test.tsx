import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { MatineRender, vanillaRender } from '../components/JSONRender/index';
import { JSONSchemaRenderData } from '@/components/JSONRender/json-render';
import { eventBus } from '../lib/event';
import { useStore } from '../store/index';
import { Container } from '@mantine/core';
import { JSONRender } from '@/components/JSONRender/jsonrender';

interface Props {}

const json: JSONSchemaRenderData = {
  key: 'c0',
  component: 'div',
  props: {},
  children: [
    {
      key: 'c1',
      component: 'div',
      props: {
        style: { display: 'flex' }
      },
      children: [
        { key: 'c1-1', component: 'div', props: {}, children: '1', $children: 'count.value' },
        { key: 'c1-2', component: 'div', props: {}, children: '1', $children: 'count1.value' }
      ]
    },
    {
      key: 'c2',
      component: 'button',
      props: {},
      children: 'add'
    },
    {
      key: 'c3',
      component: 'button',
      props: {},
      children: 'add'
    },
    {
      key: 'c4',
      component: 'test',
      $props: {
        datas: 'datas'
      },
      children: ''
    }
  ]
};

export default observer((props: Props) => {
  const { test } = useStore();

  return (
    <Container>
      <JSONRender json={json} data={test} eventBus={eventBus} componentMaps={vanillaRender.componentMaps} />
      <JSONRender json={json} data={test} eventBus={eventBus} componentMaps={MatineRender.componentMaps} />
    </Container>
  );
});
