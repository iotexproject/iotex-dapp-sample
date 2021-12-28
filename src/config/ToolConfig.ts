class Tool {
  name: string;
  path: string;
  component: any;
  tags: string[];
  constructor(args: Partial<Tool>) {
    Object.assign(this, args);
  }
}

export const ToolConfig = [
  new Tool({
    name: 'erc20.toolbox',
    path: '/erc20',
    tags: ['ERC20']
  }),
  new Tool({
    name: 'dex',
    path: '/dex',
    tags: ['DEX']
  })
];
