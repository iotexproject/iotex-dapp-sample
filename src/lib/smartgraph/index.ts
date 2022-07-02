import { makeSchema, declarativeWrappingPlugin } from 'nexus';
import { SmartGraph } from '@smartgraph/core';
import { plugins } from '@smartgraph/plugins';

import schemaJson from './schema.json';
import { UniswapPlugin } from './uniswap.plugin';
import { SubscriptionPlugin } from './subscription.plugins';

export const smartGraph = new SmartGraph({
  dev: true,
  plugins: [plugins.NetworkPlugin(), plugins.ERC20Extension(), plugins.LpTokenExtension(), UniswapPlugin(), SubscriptionPlugin()]
});

smartGraph.event.on('dataloader.notHitCache', console.log);

export const schema: any = makeSchema({
  types: smartGraph.parseAbi({ schema: schemaJson }),
  plugins: [declarativeWrappingPlugin()]
});
