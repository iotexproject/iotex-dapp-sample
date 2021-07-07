import { makeObservable, observable, makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { BigNumberState } from '../standard/BigNumberState';
import { CallParams } from '../../../type';
import erc20Abi from '@/constants/abi/erc20.json';
import { BooleanState } from '../standard/base';
import { EthNetworkConfig } from '../../config/NetworkConfig';

export class TokenState {
  abi = erc20Abi;
  name: string = '';
  symbol: string = '';
  address: string = '';
  logoURI: string;
  chainId: number = 0;
  decimals: number = 18;

  network: NetworkState = EthNetworkConfig;
  balance: BigNumberState;
  info: {
    loading: BooleanState;
    [key: string]: any;
  } = {
    loading: new BooleanState()
  };
  isNew = false;
  saved = false;

  constructor(args: Partial<TokenState>) {
    Object.assign(this, args);
    this.balance = new BigNumberState({ decimals: this.decimals, loading: true });
    makeAutoObservable(this);
  }

  transfer(args: Partial<CallParams<[string, string]>>) {
    return this.network.execContract(Object.assign({ address: this.address, abi: this.abi, method: 'transfer' }, args));
  }
  approve(args: Partial<CallParams<[string, string]>>) {
    return this.network.execContract(Object.assign({ address: this.address, abi: this.abi, method: 'approve' }, args));
  }

  preMulticall(args: Partial<CallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}
