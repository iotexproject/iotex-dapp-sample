import React, { AllHTMLAttributes, ReactPropTypes } from 'react';
import { EventEmitter } from 'events';
import { _ } from '@/lib/lodash';

export interface JSONSchemaRenderData {
  component: string;
  key: string;
  props: AllHTMLAttributes<any> & { [key: string]: any };
  extra?: {
    props: Record<string, any>;
  };
  children?: JSONSchemaRenderData[] | string;
  $children?: string;
}

export class JSONRender {
  componentMaps: { [key: string]: React.ComponentType<any> | string } = {};

  constructor(props: Partial<JSONRender>) {
    Object.assign(this, props);
  }

  render({ json, data = {}, eventBus }: { json: JSONSchemaRenderData; data: any; eventBus?: { emit: any } }) {
    console.log('render');
    if (json.$children) {
      json.children = _.get(data, json.$children, '');
    }
    if (['button'].includes(json.component)) {
      json.props.onClick = () => {
        eventBus.emit(`${json.key}.onClick`);
      };
    }
    if (typeof this.componentMaps[json.component] !== 'undefined') {
      return React.createElement(
        this.componentMaps[json.component],
        json.props,
        json.children && (['string', 'number', 'boolean'].includes(typeof json.children) ? json.children : json.children.map((c) => this.render({ json: c, data, eventBus })))
      );
    }
  }
}
