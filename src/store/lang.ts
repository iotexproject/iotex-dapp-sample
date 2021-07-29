import { makeAutoObservable } from 'mobx';
import en from '../../public/translations/en.json';
import axios from 'axios';

type Translation = typeof en;

const fileNameMapping = {
  'en-US': 'en',
  'zh-CN': 'zh_CN',
  'ru': 'ru'
};

export class LangStore {
  constructor() {
    makeAutoObservable(this);
  }
  langPath = '/translations';
  lang: string = 'en';
  translations: { [key: string]: Translation } = {
    en
  };
  configs = [
    { name: 'English', lang: 'en' },
    { name: 'Chinese', lang: 'zh_CN' },
    { name: 'Russian', lang: 'ru'}
  ];
  get translation() {
    return this.translations[this.lang];
  }

  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const langFromQuery = urlParams.get('lang');
    const broswerLang = navigator.languages ? navigator.languages[0] : navigator.language;
    let lang = langFromQuery || localStorage.getItem('lang') || broswerLang;
    if (fileNameMapping[lang]) {
      lang = fileNameMapping[lang];
    }
    await this.loadTranslation(lang);
    this.lang = lang;
  }

  async setLang(lang: string) {
    await this.loadTranslation(lang);
    localStorage.setItem('lang', lang);
    this.lang = lang;
  }

  async loadTranslation(lang) {
    if (this.translations[lang]) {
      return;
    }
    const res = await axios.get(`${this.langPath}/${lang}.json`);
    if (res.data) {
      this.translations[lang] = res.data;
    }
  }

  t(str: keyof Translation, data?: any) {
    let processed = this.translation[str] || this.translations.en[str];
    if (!processed) {
      return str;
    }
    if (data) {
      Object.keys(data).forEach((key) => {
        processed = processed.replace(`\${${key}}`, data[key]);
      });
    }

    return processed;
  }
}
