import { makeAutoObservable } from 'mobx';
import i18n from 'i18n/config';
const fileNameMapping = {
  'en-US': 'en',
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  ru: 'ru',
  ja: 'ja',
  ko: 'ko',
  es: 'es',
  de: 'de',
  jp: 'jp',
};

export class LangStore {
  constructor() {
    makeAutoObservable(this);
  }

  lang: string = 'en';

  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const langFromQuery = urlParams.get('lang');
    const browserLang = navigator.languages ? navigator.languages[0] : navigator.language;
    let lang = langFromQuery || localStorage.getItem('lang') || browserLang;
    if (fileNameMapping[lang]) {
      lang = fileNameMapping[lang];
    }
    this.lang = lang;
    console.log('lang',this.lang)
    i18n.changeLanguage(lang);
  }

  async setLang(lang: string) {
    localStorage.setItem('lang', lang);
    this.lang = lang;
    i18n.changeLanguage(lang);
  }

  t(key: string) {
    return i18n.t(key);
  }
}
