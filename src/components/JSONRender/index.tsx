import { Box, Button } from '@mantine/core';
import { Template } from '../Template';
import { JSONRender } from './json-render';

export const vanillaRender = new JSONRender({
  componentMaps: {
    div: 'div',
    button: 'button',
    test: Template
  }
});

export const MatineRender = new JSONRender({
  componentMaps: {
    div: Box,
    button: Button,
    test: ({ datas }) => (datas ? datas.map((i) => <div>{i.title}</div>) : '')
  }
});
