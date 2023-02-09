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
    }
  ]
};

const store = observable({
  count: new NumberState()
});

eventBus.on('c2.onClick', () => {
  store.count.setValue(store.count.value + 1);
});

export default observer((props: Props) => {
  const data = { count: store.count.value };

  return (
    <Container>
      {vanillaRender.render({ json, data, eventBus })}
      {MatineRender.render({ json, data, eventBus })}
    </Container>
  );
});
