import numeral from 'numeral';
import BN from 'bignumber.js';
import { createStandaloneToast } from '@chakra-ui/react';
import { CallParams } from '../../type';
import { ContractState, ReadFunction } from '../store/lib/ContractState';
import { BigNumberState } from '../store/standard/BigNumberState';
import BigNumber from 'bignumber.js';
import { NumberState, StringState } from '../store/standard/base';
import { CacheState } from '../store/standard/CacheState';

export const helper = {
  toast: createStandaloneToast(),
  promise: {
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async runAsync<T, U = Error>(promise: Promise<T>): Promise<[U | null, T | null]> {
      return promise.then<[null, T]>((data: T) => [null, data]).catch<[U, null]>((err) => [err, null]);
    }
  },
  env: {
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
    toPrecisionFloor: (str: number | string, options?: { decimals?: number; format?: string }) => {
      const { decimals = 6, format = '' } = options || {};
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

      return new BN(result).toFixed();
    },
    getBN: (value: number | string | BN) => {
      return value instanceof BN ? value : typeof value === 'string' ? new BN(Number(value)) : new BN(value);
    }
  },
  c: {
    preMulticall(contract: ContractState, args: Partial<CallParams>) {
      if (!contract.address) return;
      return Object.assign({ address: contract.address, abi: contract.abi }, args);
    },
    autoLoad(contract: ContractState) {
      return Object.values(contract)
        .filter((i: ReadFunction) => i.autoLoad)
        .map((i: ReadFunction) => i.preMulticall({}));
    }
  },
  state: {
    handleCallBack(callback, val) {
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
      if (callback instanceof CacheState) {
        callback.set(val);
      }
    }
  }
};
