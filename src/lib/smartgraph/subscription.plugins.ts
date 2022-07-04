import { createPubSub } from '@graphql-yoga/node';
import { CrossChainCalls, SmartGraph } from '@smartgraph/core';
import { extendType, subscriptionType, stringArg, arg, list } from 'nexus';
import { PubSubAsyncIterator } from 'graphql-subscriptions/dist/pubsub-async-iterator';
import { withFilter } from 'graphql-subscriptions';

export const SubscriptionPlugin = SmartGraph.Plugin(() => {
  return {
    name: 'SubscriptionPlugin',
    onLoad({ contractMap }) {
      return {
        types: [
          subscriptionType({
            definition(t) {
              Object.values(contractMap).forEach((c) => {
                t.field(c.name, {
                  type: list(c.name),
                  args: {
                    calls: arg({
                      type: CrossChainCalls,
                      //@ts-ignore
                      list: true,
                      default: []
                    })
                  },
                  subscribe: withFilter(
                    (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context']) => {
                      const pubsubInterator = new PubSubAsyncIterator(ctx.smartGraph.pubsub, SmartGraph.PubSubEvent.CHAIN_UPDATE);

                      //@ts-ignore
                      // pubsubInterator.running = false;
                      //@ts-ignore
                      // pubsubInterator.pushQueue.push({ chianId: 4689 });
                      // console.log(pubsubInterator);
                      return pubsubInterator;
                    },
                    (payload, variables) => {
                      return (
                        variables.calls.findIndex((c) => {
                          return c.chainId == payload.chainId;
                        }) > -1
                      );
                    }
                  ),
                  resolve(root, args) {
                    return args.calls.map((i) => ({ ...i, contractName: c.name }));
                  }
                });
              });
            }
          })
        ]
      };
    }
  };
});
