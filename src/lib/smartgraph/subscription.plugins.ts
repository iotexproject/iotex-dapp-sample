import { createPubSub } from '@graphql-yoga/node';
import { SmartGraph } from '@smartgraph/core';
import { extendType, subscriptionType, stringArg } from 'nexus';
import { withFilter } from 'graphql-subscriptions';

export const SubscriptionPlugin = SmartGraph.Plugin(() => {
  return {
    name: 'SubscriptionPlugin',
    onLoad({ contractMap }) {
      return {
        types: [
          subscriptionType({
            definition(t) {
              Object.values(contractMap).forEach((contract) => {
                t.field(contract.name, {
                  type: contract.name,
                  args: {
                    address: stringArg(),
                    chainId: stringArg()
                  },
                  subscribe: withFilter(
                    (root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context']) => {
                      return ctx.smartGraph.pubsub.asyncIterator(SmartGraph.PubSubEvent.CHAIN_UPDATE);
                    },
                    (payload, variables) => {
                      // console.log(123, payload, variables);
                      return payload.chainId == variables.chainId;
                    }
                  ),
                  resolve(eventData, args) {
                    // console.log(456, eventData, args);
                    return { ...eventData, ...args };
                  }
                });
              });

              // t.string('test', {
              //   args: {
              //     chainId: stringArg(),
              //     address: stringArg()
              //   },
              //   subscribe(root: SmartGraph['ROOT'], args, ctx: SmartGraph['Context']) {
              //     //@ts-ignore
              //     root = { address: args.address, chainId: args.chainId };
              //     return (async function* () {
              //       while (true) {
              //         const res = await SmartGraph.load({ ctx, root }, [
              //           {
              //             contractName: 'ERC20',
              //             method: 'decimals',
              //             params: [],
              //             address: root.address
              //           }
              //         ]);
              //         await new Promise((res) => setTimeout(res, 5000));
              //         yield res[0];
              //       }
              //     })();
              //   },
              //   resolve(eventData) {
              //     return eventData;
              //   }
              // });
            }
          })
        ]
      };
    }
  };
});
