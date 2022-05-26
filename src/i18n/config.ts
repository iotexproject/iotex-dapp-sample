import i18n from 'i18next';
import en from './en/translation.json';
import zh_CN from './zh-cn/translation.json';
import ru from './ru/translation.json';
import de from './de/translation.json';
import ja from './ja/translation.json';
import ko from './ko/translation.json';
import es from './es/translation.json';
import zh_TW from './zh-tw/translation.json';

import { initReactI18next } from 'react-i18next';
//refer https://react.i18next.com/

export const resources = {
  en: {
    translation: en
  },
  zh_CN: {
    translation: zh_CN
  },
  zh_TW: {
    translation: zh_TW
  },
  ru: {
    translation: ru
  },
  de: {
    translation: de
  },
  ja: {
    translation: ja
  },
  ko: {
    translation: ko
  },
  es: {
    translation: es
  }
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  interpolation: {
    escapeValue: false
  },
  resources
});

export default i18n;
