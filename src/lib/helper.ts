import numeral from 'numeral';
import BN from 'bignumber.js';
import { createStandaloneToast } from '@chakra-ui/react';
import { CallParams } from '../../type';
import { ContractState, ReadFunction } from '../store/lib/ContractState';
import { BigNumberState } from '../store/standard/BigNumberState';
import BigNumber from 'bignumber.js';
import { NumberState, StringState } from '../store/standard/base';
import { DynamicMappingState } from '@/store/standard/MappingState';
import { metamaskUtils } from './metaskUtils';
import toast from 'react-hot-toast';
import { theme } from './theme';

export interface RouterParsed {
  pathname: string;
  hash: string;
  query: Record<string, string | string[] | undefined>;
}

export const helper = {
  interceptorNull: (c, option?: { extraValue?: any[]; crossChain?: Boolean }) => {
    if (option?.crossChain) {
      if (!(c instanceof Array)) throw new Error('c is not an Array when CrossChain mode');
      if (!c.every(Boolean)) throw 'interceptor undefined value in crossChain mode';
    } else {
      if (!(c instanceof Object)) throw new Error('c is not an Object');
      if (
        !Object.values(c)
          .filter((i) => i instanceof DynamicMappingState)
          .map((i: any) => i.current)
          .every(Boolean)
      ) {
        throw 'interceptor undefined value';
      }
    }

    if (option?.extraValue) {
      if (!option?.extraValue?.every(Boolean)) {
        throw 'interceptor undefined value in extra value';
      }
    }
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
          resolve(res);
        })
        .catch((err) => {
          toast.error(err.message);
          reject(err);
        });
    });
  },
  toast: createStandaloneToast({ theme }),
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
  c: {
    preMulticall(contract: ContractState, args: Partial<CallParams>) {
      if (!contract.address) return;
      return Object.assign({ address: contract.address, abi: contract.abi, chainId: contract.chainId }, args);
    },
    autoLoad(contract: ContractState) {
      const autoLoads: ReadFunction[] = Object.values(contract).filter((i) => i.autoLoad && !i.cacheLoaded && !i.address);
      if (contract.cache && contract.cache?.data) {
        autoLoads.forEach((i) => {
          const value = contract.cache.data[i.name];
          if (value) {
            i.cacheLoaded = true;
            i.setValue(value);
          }
        });
      }
      return autoLoads.filter((i) => !i.cacheLoaded).map((i: ReadFunction) => i.preMulticall({}));
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
        if (callback instanceof ReadFunction) {
          callback.setValue(val.toString());
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};
