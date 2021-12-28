export interface CallParams<P = any[]> {
  address: string;
  abi: any;
  method: string;
  params?: P;
  options?: Partial<{
    value: string;
    gasLimit: string;
    gasPrice: string;
  }>;
  handler?: any;
  read?: boolean;
}

export interface ZeroQuoteRes {
  chainId: number;
  price: string;
  guaranteedPrice: string;
  to: string;
  data: string;
  value: string;
  gas: string;
  estimatedGas: string;
  gasPrice: string;
  protocolFee: string;
  minimumProtocolFee: string;
  buyTokenAddress: string;
  sellTokenAddress: string;
  buyAmount: string;
  sellAmount: string;
  sources: Source[];
  orders: Order[];
  allowanceTarget: string;
  sellTokenToEthRate: string;
  buyTokenToEthRate: string;
}

interface Order {
  makerToken: string;
  takerToken: string;
  makerAmount: string;
  takerAmount: string;
  fillData: FillData;
  source: string;
  sourcePathId: string;
  type: number;
}

interface FillData {
  isSellBase?: boolean;
  poolAddress?: string;
  tokenAddressPath?: string[];
  router?: string;
}

interface Source {
  name: string;
  proportion: string;
  intermediateToken?: string;
  hops?: string[];
}
