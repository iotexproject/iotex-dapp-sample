import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import each from 'lodash/each';
import flattenDeep from 'lodash/flattenDeep';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import keyBy from 'lodash/keyBy';

export const _ = {
  throttle,
  debounce,
  each,
  flattenDeep,
  omitBy,
  isNil,
  keyBy
};
