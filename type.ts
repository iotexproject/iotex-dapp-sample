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
