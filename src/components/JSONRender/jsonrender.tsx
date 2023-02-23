import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Box, Button } from '@mantine/core';
import { JSONSchemaRenderData } from './json-render';
import { _ } from '@/lib/lodash';
import { computed, extendObservable, reaction, toJS } from 'mobx';
import { computedFn } from 'mobx-utils';

interface Props {
  json: JSONSchemaRenderData;
  datas?: any;
  store?: any;
  eventBus?: { emit: any };
  componentMaps: { [key: string]: React.ComponentType<any> | string };
}

//@ts-ignore
export const JSONRender = observer((props: Props) => {
  const { json, datas = {}, eventBus, componentMaps, store } = props;
  if (!json.props) json.props = {};

  console.log('render', json.id);
  if (json.$children) {
    json.children = _.get(datas, json.$children, '');
  }
  if (json.events) {
    Object.keys(json.events).forEach((key) => {
      json.props[key] = () => {
        const eventScript = store[json.id].events[key];
        return new Function(
          'ctx',
          `
      const {$} = ctx
      ${eventScript}
      `
        )({ $: store });
      };
    });
  }

  if (!store[json.id]) {
    const { children, ...others } = json;
    store[json.id] = others;
  }
  const _json = store[json.id];

  if (_json.$props) {
    Object.keys(_json.$props).forEach((key) => {
      // if (_json.props[key]) return;
      const val = _json.$props[key];
      const fn = new Function(
        'ctx',
        `
      const {datas} = ctx
      return ${val}`
      );
      //@ts-ignore
      _json.props[key] = computedFn(fn)({ datas });
      // reaction(
      //   () => _.get(datas, val),
      //   (val) => {
      //     _json.props[key] = val;
      //   },
      //   { fireImmediately: true }
      // );
    }, {});
  }

  const Comp = componentMaps[_json.component];

  if (typeof Comp !== 'undefined') {
    return (
      <Comp {...toJS(_json.props)} store={store} id={json.id}>
        {['string', 'number', 'boolean', 'undefined'].includes(typeof json.children)
          ? json.children
          : (json.children as any[]).map((c) => <JSONRender json={c} datas={datas} eventBus={eventBus} componentMaps={componentMaps} store={store} />)}
      </Comp>
    );
  }
  return <></>;
});
