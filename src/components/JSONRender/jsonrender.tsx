import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Box, Button } from '@mantine/core';
import { JSONSchemaRenderData } from './json-render';
import { _ } from '@/lib/lodash';
import { extendObservable, toJS } from 'mobx';

interface Props {
  json: JSONSchemaRenderData;
  data?: any;
  store?: any;
  eventBus?: { emit: any };
  componentMaps: { [key: string]: React.ComponentType<any> | string };
}

//@ts-ignore
export const JSONRender = observer((props: Props) => {
  const { json, data = {}, eventBus, componentMaps, store } = props;
  if (!json.props) json.props = {};

  console.log('render');
  if (json.$children) {
    json.children = _.get(data, json.$children, '');
  }
  if (json.$events) {
    Object.keys(json.$events).forEach((key) => {
      json.props[key] = (e) => {
        eventBus.emit(json.$events[key], e);
      };
    });
  }

  if (json.$props) {
    const p = Object.keys(json.$props).reduce((acc, key) => {
      acc[key] = _.get(data, json.$props[key], '');
      return acc;
    }, {});
    Object.assign(json.props, p);
  }

  if (!store[json.key]) {
    store[json.key] = json.props;
  }

  const Comp = componentMaps[json.component];

  if (typeof Comp !== 'undefined') {
    return (
      <Comp {...toJS(store[json.key])}>
        {['string', 'number', 'boolean', 'undefined'].includes(typeof json.children)
          ? json.children
          : (json.children as any[]).map((c) => <JSONRender json={c} data={data} eventBus={eventBus} componentMaps={componentMaps} store={store} />)}
      </Comp>
    );
  }
  return <></>;
});
