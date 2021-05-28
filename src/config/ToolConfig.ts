import { ERC20 } from '../pages/ERC20';

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
    name: 'ERC20 Toolbox',
    path: '/erc20',
    component: ERC20,
    tags: ['ERC20']
  })
];
