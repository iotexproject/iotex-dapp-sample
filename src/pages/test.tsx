import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { MatineRender, vanillaRender } from '../components/JSONRender/index';
import { JSONSchemaRenderData } from '@/components/JSONRender/json-render';
import { EventEmitter } from 'events';
import { eventBus } from '../lib/event';
import { useStore } from '../store/index';
import { Container } from '@mantine/core';
import { observable } from 'mobx';
import { NumberState } from '../store/standard/base';
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
      props: {},
      children: [{ key: 'c1-1', component: 'div', props: {}, children: '1', $children: 'count' }]
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
    }
  ]
};

export default observer((props: Props) => {
  const { test } = useStore();
  const store = useLocalObservable(() => ({
    get count() {
      return test.count.value;
    }
  }));
  return (
    <Container>
      <JSONRender json={json} data={store} eventBus={eventBus} componentMaps={vanillaRender.componentMaps} />
      <JSONRender json={json} data={store} eventBus={eventBus} componentMaps={MatineRender.componentMaps} />
    </Container>
  );
});
