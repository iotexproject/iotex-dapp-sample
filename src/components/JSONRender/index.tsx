import { Box, Button } from '@mantine/core';
import { Template } from '../Template';
import { JSONRender } from './json-render';
import { observer } from 'mobx-react-lite';

export const vanillaRender = new JSONRender({
  componentMaps: {
    div: 'div',
    text: ({ text }) => <text>{text}</text>,
    textarea: ({ text, id, store }) => (
      <textarea
        onChange={(e) => {
          console.log({ store, id });
          store[id].props.text = e.target.value;
        }}
        value={text}
      ></textarea>
    ),
    button: 'button',
    test: Template
  }
});

export const MatineRender = new JSONRender({
  componentMaps: {
    div: Box,
    button: Button,
    text: ({ text }) => <text>{text}</text>,
    test: ({ datas }) => (datas ? datas.map((i) => <div>{i.title}</div>) : '')
  }
});
