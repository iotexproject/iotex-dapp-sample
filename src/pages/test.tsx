import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { MatineRender, vanillaRender } from '../components/JSONRender/index';
import { JSONSchemaRenderData } from '@/components/JSONRender/json-render';
import { eventBus } from '../lib/event';
import { useStore } from '../store/index';
import { Container } from '@mantine/core';
import { JSONRender } from '@/components/JSONRender/jsonrender';
import { actions } from '../store/test';

interface Props {}

const json: JSONSchemaRenderData = {
  key: 'c0',
  component: 'div',
  children: [
    {
      key: 'c1',
      component: 'div',
      props: {
        style: { display: 'flex' }
      },
      children: [
        { key: 'c1-1', component: 'div', children: '1', $children: 'count.value' },
        { key: 'c1-2', component: 'div', children: '1', $children: 'count1.value' }
      ]
    },
    {
      key: 'c2',
      component: 'button',
      $events: {
        onClick: 'action1'
      },
      children: 'add'
    },
    {
      key: 'c3',
      component: 'button',
      $events: {
        onClick: 'action2'
      },
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
      <div style={{ marginTop: '40px' }}></div>
      <JSONRender json={json} data={test} eventBus={eventBus} componentMaps={MatineRender.componentMaps} />
    </Container>
  );
});
