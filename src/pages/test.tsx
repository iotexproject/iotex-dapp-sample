import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { MatineRender, vanillaRender } from '../components/JSONRender/index';
import { JSONSchemaRenderData } from '@/components/JSONRender/json-render';
import { eventBus } from '../lib/event';
import { useStore } from '../store/index';
import { Container, Textarea } from '@mantine/core';
import { JSONRender } from '@/components/JSONRender/jsonrender';
import { action, toJS } from 'mobx';

import loadable from '@loadable/component';
import { _ } from '@/lib/lodash';
const ReactJson = loadable(() => import('react-json-view'));

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
        { key: 'c1-1', component: 'text', props: { text: 1 } },
        { key: 'c1-2', component: 'text', props: { text: 1 } }
      ]
    },
    {
      key: 'c2',
      component: 'button',
      events: {
        onClick: "$['c1-1'].props.text += $['c1-1'].props.text"
      },
      children: 'add'
    },
    {
      key: 'c3',
      component: 'button',
      events: {
        onClick: "$['c1-2'].props.text += $['c1-2'].props.text"
      },
      children: 'add'
    }
  ]
};

export default observer((props: Props) => {
  const { test } = useStore();

  return (
    <Container>
      <JSONRender json={json} store={test.store} eventBus={eventBus} componentMaps={vanillaRender.componentMaps} />
      <ReactJson
        src={toJS(test)}
        onEdit={(e) => {
          console.log(e);
          const path = e.namespace.join('.') + '.' + e.name;
          _.set(test, path, e.new_value);
        }}
      />
      {/* <div style={{ marginTop: '40px' }}></div>;<textarea style={{ height: '500px' }} value={JSON.stringify(toJS(test.store), null, 2)}></textarea>
      {/* <JSONRender json={json} store={test.store} eventBus={eventBus} componentMaps={MatineRender.componentMaps} /> */}
    </Container>
  );
});
