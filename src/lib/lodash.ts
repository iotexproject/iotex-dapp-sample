import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import each from 'lodash/each';
import flattenDeep from 'lodash/flattenDeep';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import keyBy from 'lodash/keyBy';
import get from 'lodash/get';
import set from 'lodash/set';

export const _ = {
  get,
  set,
  throttle,
  debounce,
  each,
  flattenDeep,
  omitBy,
  isNil,
  keyBy
};
