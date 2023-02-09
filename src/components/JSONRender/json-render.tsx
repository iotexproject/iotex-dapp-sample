import React, { AllHTMLAttributes, ReactPropTypes } from 'react';
import { _ } from '@/lib/lodash';
import { Observer, observer } from 'mobx-react-lite';

export interface JSONSchemaRenderData {
  component: string;
  key: string;
  props?: AllHTMLAttributes<any> & { [key: string]: any };
  $props?: AllHTMLAttributes<any> & { [key: string]: any };
  extra?: {
    props: Record<string, any>;
  };
  children?: JSONSchemaRenderData[] | string | number | boolean;
  $children?: string;
}

export class JSONRender {
  componentMaps: { [key: string]: React.ComponentType<any> | string } = {};
  caches = new Map<string, any>();

  constructor(props: Partial<JSONRender>) {
    Object.assign(this, props);
  }

  render({ json, data = {}, eventBus }: { json: JSONSchemaRenderData; data: any; eventBus?: { emit: any } }) {
    // if (this.caches.has(json.key)) return this.caches.get(json.key);
    console.log('render');
    if (json.$children) {
      json.children = _.get(data, json.$children, '') + performance.now();
    }
    if (['button'].includes(json.component)) {
      json.props.onClick = () => {
        eventBus.emit(`${json.key}.onClick`);
      };
    }

    if (typeof this.componentMaps[json.component] !== 'undefined') {
      //@ts-ignore
      // const element = observer((props) =>
      //   React.createElement(
      //     this.componentMaps[json.component],
      //     props,
      //     ['string', 'number', 'boolean'].includes(typeof json.children) ? json.children : json.children.map((c) => this.render({ json: c, data, eventBus }))
      //   )
      // );
      if (['string', 'number', 'boolean'].includes(typeof json.children)) {
        //@ts-ignore
        // const ele = (props) => React.createElement(this.componentMaps[json.component], props, json.children);
        const Comp = this.componentMaps[json.component];
        console.log(Comp);
        const ele = (data) => <Comp {...data}>{json.children}</Comp>;

        console.log(ele);
        // return observer(ele);
        return observer(ele);
      }

      return (json.children as any[]).map((c) => this.render({ json: c, data, eventBus }));
    }
  }
}
