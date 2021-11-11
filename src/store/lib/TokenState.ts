import { makeObservable, observable, makeAutoObservable } from 'mobx';
import { NetworkState } from './NetworkState';
import { BigNumberState } from '../standard/BigNumberState';
import { CallParams } from '../../../type';
import erc20Abi from '@/constants/abi/erc20.json';
import { BooleanState } from '../standard/base';
import { EthNetworkConfig } from '../../config/NetworkConfig';
import { helper } from '../../lib/helper';
import BigNumber from 'bignumber.js';
import { WriteFunction } from './ContractState';

export class TokenState {
  abi = erc20Abi;
  name: string = '';
  symbol: string = '';
  address: string = '';
  logoURI: string;
  chainId: number = 0;
  decimals: number = 18;

  network: NetworkState = EthNetworkConfig;
  allowanceForRouter = new BigNumberState({});

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

  setDecimals(val) {
    this.decimals = val;
    this.balance.setDecimals(val);
    this.allowanceForRouter.setDecimals(val);
  }

  // new
  transfer = new WriteFunction<[string, string]>({ name: 'transfer', contract: this });
  approve = new WriteFunction<[string, string]>({
    name: 'approve',
    contract: this,
    onAfterCall({ args, receipt }) {
      if (receipt.status) {
        const amount = args.params[1];
        this.allowanceForRouter.setValue(new BigNumber(amount));
      }
    }
  });

  // old
  // transfer(args: Partial<CallParams<[string, string]>>) {
  //   return this.network.execContract(Object.assign({ address: this.address, abi: this.abi, method: 'transfer' }, args));
  // }

  // async approve(args: Partial<CallParams>) {
  //   this.info.loading.setValue(true);
  //   const amount = args.params[1];
  //   const [err, res] = await helper.promise.runAsync(this.network.execContract(Object.assign({ address: this.address, abi: this.abi, method: 'approve' }, args)));
  //   if (!err) {
  //     const receipt = await res.wait();
  //     if (receipt.status) {
  //       this.allowanceForRouter.setValue(new BigNumber(amount));
  //     }
  //   }
  //   this.info.loading.setValue(false);
  // }

  preMulticall(args: Partial<CallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}
