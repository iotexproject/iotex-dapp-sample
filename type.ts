export interface CallParams {
  address: string;
  abi: any;
  method: string;
  params?: any[];
  options?: any;
  handler?: any;
  read?: boolean;
}
