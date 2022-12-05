import numeral from 'numeral';
import BN from 'bignumber.js';
import { CallParams } from '../../type';
import { BigNumberState } from '../store/standard/BigNumberState';
import BigNumber from 'bignumber.js';
import { NumberState, StringState } from '../store/standard/base';
import { DynamicMappingState } from '@/store/standard/MappingState';
import { metamaskUtils } from './metaskUtils';
import { TransactionReceipt, TransactionRequest, TransactionResponse } from '@ethersproject/providers';
import { Deferrable } from 'ethers/lib/utils';
import { rootStore } from '../store/index';
import { hooks } from './hooks';
import { ethers, utils } from 'ethers';
import { _ } from './lodash';
import { showNotification } from '@mantine/notifications';
import { eventBus } from './event';
import { TransactionModule, TransctionCoin } from '@/store/history';

export interface RouterParsed {
  pathname: string;
  hash: string;
  query: Record<string, string | string[] | undefined>;
}

export const toast = {
  success: (msg: string) => {
    showNotification({
      title: rootStore.lang.t('notification'),
      color: 'green',
      message: msg
    });
  },
  error: (msg: string) => {
    showNotification({
      title: rootStore.lang.t('error'),
      color: 'red',
      message: msg
    });
  },
  warning: (msg: string) => {
    showNotification({
      title: rootStore.lang.t('warning'),
      color: 'yellow',
      message: msg
    });
  }
};

export const helper = {
  recordHistory(params: { chainId: number; amount: string; module: TransactionModule; title: string; receipt: TransactionReceipt; coin?: TransctionCoin }) {
    //If you give the "coin" argument, it will automatically pop up
    eventBus.emit('history.insert', {
      uuid: this.uuid,
      timestamp: Date.now(),
      from: params.receipt.from,
      to: params.receipt.to,
      hash: params.receipt.transactionHash,
      isRead: false,
      status: 'success',
      ...params
    });
    return this.uuid;
  },
  setChain(god, chainId) {
    if (god.chainId === chainId) return;
    return new Promise((resolve, reject) => {
      const chain = god.currentNetwork.chain.map[chainId];
      console.log(chain);
      metamaskUtils
        .setupNetwork({
          chainId: chain.chainId,
          blockExplorerUrls: [chain.explorerURL],
          chainName: chain.name,
          nativeCurrency: {
            decimals: chain.Coin.decimals || 18,
            name: chain.Coin.symbol,
            symbol: chain.Coin.symbol
          },
          rpcUrls: [chain.rpcUrl]
        })
        .then((res) => {
          god.setChain(chainId);
          setTimeout(() => {
            resolve(res);
          }, 1000);
        })
        .catch((err) => {
          toast.error(err.message);
          reject(err);
        });
    });
  },
  promise: {
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async runAsync<T, U = Error>(promise: Promise<T>): Promise<[U | null, T | null]> {
      return promise.then<[null, T]>((data: T) => [null, data]).catch<[U, null]>((err) => [err, null]);
    }
  },
  get: {
    larger: (a: number, b: number): number => {
      return a > b ? a : b;
    }
  },
  env: {
    //@ts-ignore
    isBrower: typeof window === 'undefined' ? false : true,
    isIopayMobile: global?.navigator?.userAgent && (global?.navigator?.userAgent.includes('IoPayAndroid') || global?.navigator?.userAgent.includes('IoPayiOs')),
    isPc() {
      const userAgentInfo = global?.navigator?.userAgent;
      const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
      let flag = true;
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }
  },
  object: {
    crawlObject(object, options) {
      const newObj = JSON.parse(JSON.stringify(object));
      return helper.object.crawl(newObj, options);
    },
    crawl(object, options) {
      Object.keys(object).forEach((i) => {
        if (typeof object[i] === 'object') {
          helper.object.crawl(object[i], options);
        } else {
          const handler = options[typeof object[i]];
          if (handler) {
            object[i] = handler(object[i]);
          }
        }
      });
      return object;
    }
  },
  json: {
    safeParse(val: any) {
      try {
        return JSON.parse(val);
      } catch (error) {
        return val;
      }
    }
  },
  string: {
    toFixString(str, length) {
      if (str && str.length > length) {
        return str.substr(0, length) + '...';
      } else {
        return str;
      }
    },
    truncate(fullStr = '', strLen, separator) {
      if (fullStr.length <= strLen) return fullStr;

      separator = separator || '...';

      var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2);

      return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
    }
  },
  number: {
    countNonZeroNumbers: (str: string) => {
      let index = 0;
      const length = str.length;
      for (; index < length && (str[index] === '0' || str[index] === '.'); index += 1);
      return length - index - Number(str.includes('.'));
    },
    numberWithCommas(num: number) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    toPrecisionFloor: (str: number | string, options?: { decimals?: number; format?: string; toLocalString?: boolean }) => {
      const { decimals = 6, format = '', toLocalString = false } = options || {};
      if (!str || isNaN(Number(str))) return '';

      if (helper.number.countNonZeroNumbers(String(str)) <= decimals) return String(str);
      const numStr = new BN(str).toFixed();
      let result = '';
      let index = 0;
      const numLength = numStr.length;

      for (; numStr[index] === '0' && index < numLength; index += 1);

      if (index === numLength) return '0';

      if (numStr[index] === '.') {
        // number < 0
        result = '0';
        for (; (numStr[index] === '0' || numStr[index] === '.') && index < numLength; index += 1) {
          result = result + numStr[index];
        }
      }
      let resultNumLength = 0;
      for (; index < numLength && (resultNumLength < decimals || !result.includes('.')); index += 1) {
        result = result + numStr[index];

        if (numStr[index] !== '.') resultNumLength += 1;
      }
      if (format) {
        return numeral(Number(result)).format(format);
      }

      if (toLocalString) {
        console.log(helper.number.numberWithCommas(Number(new BN(result).toFixed())));
        return helper.number.numberWithCommas(Number(new BN(result).toFixed()));
      }

      return new BN(result).toFixed();
    },
    getBN: (value: number | string | BN) => {
      return value instanceof BN ? value : typeof value === 'string' ? new BN(Number(value)) : new BN(value);
    }
  },
  address: {
    formatAddress(address) {
      if (!address) return;
      return address.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
    },
    validateEthAddress(address: string) {
      return /^0x[a-fA-F0-9]{40}$/.test(address);
    },
    validateIoAddress(address: string) {
      return /^io[a-zA-Z0-9]{39}$/.test(address);
    },
    validateAddress(address: string) {
      return helper.address.validateEthAddress(address) || helper.address.validateIoAddress(address);
    }
  },
  state: {
    handleCallBack(callback, val, key?) {
      try {
        if (callback instanceof BigNumberState) {
          callback.setValue(new BigNumber(val.toString()));
        }
        if (callback instanceof NumberState) {
          callback.setValue(Number(val.toString()));
        }
        if (callback instanceof StringState) {
          callback.setValue(val.toString());
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  c: {
    async sendTx({
      chainId,
      address,
      data,
      gasPrice = 0,
      value = 0,
      autoRefresh = true,
      autoAlert = false,
      showTransactionSubmitDialog = true,
      onSubmit,
      onSuccess,
      onError
    }: {
      chainId: number | string;
      address: string;
      data: string;
      value?: string | number;
      gasPrice?: string | number;
      autoRefresh?: boolean;
      autoAlert?: boolean;
      showTransactionSubmitDialog?: boolean;
      onSubmit?: ({ res }: { res: ethers.providers.TransactionResponse }) => void;
      onSuccess?: ({ res }: { res: TransactionResponse }) => void;
      onError?: (e: Error) => void;
    }): Promise<TransactionReceipt> {
      chainId = Number(chainId);

      try {
        if (!chainId || !address || !data) throw new Error('chainId, address, data is required');
        if (!rootStore.god.currentNetwork.account) {
          await hooks.waitAccount();
        }

        if (rootStore.god.currentChain.chainId !== chainId) {
          await helper.setChain(rootStore.god, chainId);
        }
        let sendTransactionParam: Deferrable<TransactionRequest> = _.omitBy(
          { to: address, data, value: value ? ethers.BigNumber.from(value) : null, gasPrice: gasPrice ? ethers.BigNumber.from(gasPrice) : null },
          _.isNil
        );
        const res = await rootStore.god.eth.signer.sendTransaction(sendTransactionParam);

        if (showTransactionSubmitDialog) {
          rootStore.god.showTransactionSubmitDialog.setValue(true);
          rootStore.god.curTransaction = res;
        }
        const receipt = await res.wait();
        if (autoRefresh) {
          rootStore.god.pollingData();
        }
        if (receipt.status) {
          onSuccess && onSuccess({ res });
        }
        return receipt;
      } catch (error) {
        console.log(error);
        if (autoAlert) {
          showNotification({
            title: 'Error',
            message: error.data?.message || error.message,
            color: 'red'
          });
        }
        onError && onError(error);
        throw error;
      }
    }
  }
};
