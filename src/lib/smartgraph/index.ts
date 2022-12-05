import { makeSchema, declarativeWrappingPlugin } from 'nexus';
import { SmartGraph } from '@smartgraph/core';
import { plugins } from '@smartgraph/plugins';
import { encodeInputData } from 'iotex-antenna/lib/contract/abi-to-byte';

import schemaJson from './schema.json';
import { UniswapPlugin } from './uniswap.plugin';
import { AntennaPlugin } from './antenna.plugin';
import { _ } from '../lodash';
import { helper } from '@/lib/helper';
import { from } from '@iotexproject/iotex-address-ts';

export const smartGraph = new SmartGraph({
  plugins: [plugins.NetworkPlugin(), plugins.ERC20Extension(), plugins.LpTokenExtension(), UniswapPlugin(), AntennaPlugin()],
  //@ts-ignore
  encodeFunction(args: { contract: string; method: string; params: any[]; root }) {
    const contract = smartGraph.getContract(args.contract);

    if (args.root.antenna) {
      const abi = _.keyBy(contract.abi, 'name');

      let params = args.params.reduce((p, c, i) => {
        p[abi[args.method].inputs[i].name] = c;
        return p;
      }, {});
      params = helper.object.crawlObject(params, {
        string(val: string) {
          if (val.startsWith('0x')) {
            return from(val).string();
          }
          return val;
        }
      });
      console.log(params);

      // console.log(params, _.keyBy(contract.abi, 'name')['swapETHForExactTokens']['inputs'], args.method);
      return encodeInputData(abi, args.method, params);
    }
    return contract.interface.encodeFunctionData(args.method, args.params);
  }
});

export const schema: any = makeSchema({
  types: smartGraph.parseAbi({ schema: schemaJson }),
  plugins: [declarativeWrappingPlugin()]
});
