import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Box, Button } from '@mantine/core';
import { JSONSchemaRenderData } from './json-render';
import { _ } from '@/lib/lodash';

interface Props {
  json: JSONSchemaRenderData;
  data: any;
  eventBus?: { emit: any };
  componentMaps: { [key: string]: React.ComponentType<any> | string };
}

//@ts-ignore
export const JSONRender = observer((props: Props) => {
  const { json, data = {}, eventBus, componentMaps } = props;
  console.log('render');
  if (json.$children) {
    json.children = _.get(data, json.$children, '');
  }
  if (['button'].includes(json.component)) {
    json.props.onClick = () => {
      eventBus.emit(`${json.key}.onClick`);
    };
  }
  if (typeof componentMaps[json.component] !== 'undefined') {
    const Comp = componentMaps[json.component];
    return (
      <Comp {...json.props}>
        {['string', 'number', 'boolean'].includes(typeof json.children)
          ? json.children
          : (json.children as any[]).map((c) => <JSONRender json={c} data={data} eventBus={eventBus} componentMaps={componentMaps} />)}
      </Comp>
    );
  }
});
