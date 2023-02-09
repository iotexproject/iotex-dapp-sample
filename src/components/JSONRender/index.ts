import { Box, Button } from '@mantine/core';
import { JSONRender } from './json-render';

export const vanillaRender = new JSONRender({
  componentMaps: {
    div: 'div',
    button: 'button'
  }
});

export const MatineRender = new JSONRender({
  componentMaps: {
    div: Box,
    button: Button
  }
});
