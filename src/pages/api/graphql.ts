import { createServer } from '@graphql-yoga/node';
import { NextApiRequest, NextApiResponse } from 'next';
import { smartGraph, schema } from '../../lib/smartgraph';

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  context: ({ req, res }) => {
    return { smartGraph, dataloader: smartGraph.dataloader, req, res };
  },
});

export default server;
