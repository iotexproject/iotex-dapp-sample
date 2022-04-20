import { makeSchema, declarativeWrappingPlugin } from 'nexus';
import { SmartGraph } from '@smartgraph/core';
import { plugins } from '@smartgraph/plugins';

import schemaJson from './schema.json';
import { UniswapPlugin } from './uniswap.plugin';

export const smartGraph = new SmartGraph({
  plugins: [plugins.NetworkPlugin(), plugins.ERC20Extension(), plugins.LpTokenExtension(), UniswapPlugin()]
});

export const schema: any = makeSchema({
  types: smartGraph.parseAbi({ schema: schemaJson }),
  plugins: [declarativeWrappingPlugin()]
});
