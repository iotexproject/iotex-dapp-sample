import request from 'graphql-request';
import { execute, parse } from 'graphql';
import { Thunder } from '../__generated/sdk';
import { schema, smartGraph } from './index';

// http client
export const gql = Thunder(async (query, variables) => {
  const res = await request('http://localhost:3000/api/graphql', query, variables);
  return res;
});

// jsonrpc client
export const rpc = Thunder(async (query, variables) => {
  const res = await execute({
    schema,
    contextValue: { smartGraph, dataloader: smartGraph.dataloader },
    //@ts-ignore
    variableValues: variables,
    //@ts-ignore
    document: parse(query)
  });
  if (res.errors) {
    throw new Error(res.errors[0].message);
  }
  return res.data;
});

export const use = (client: 'rpc' | 'graphql') => (client == 'rpc' ? rpc : gql);
