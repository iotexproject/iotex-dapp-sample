import { SmartGraph } from '@smartgraph/core';
import { extendInputType } from 'nexus';

export const AntennaPlugin = SmartGraph.Plugin(() => {
  return {
    name: 'AntennaPlugin',
    types: [
      extendInputType({
        type: 'CrossChainCalls',
        definition(t) {
          t.field('antenna', {
            type: 'Boolean'
          });
        }
      })
    ]
  };
});

export class TemplateService {
  static async getPrice({ ctx, address, root, ttl = 60 }: { ctx: SmartGraph['Context']; address: string; root: any; ttl?: number }) {
    return ctx.smartGraph.wrap<string>(`${root.chainId}-Template.getPrice-${address}`, async () => {}, { ttl: 60 });
  }
}
