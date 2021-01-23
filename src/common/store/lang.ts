import { observable, action, computed } from "mobx";
import remotedev from "mobx-remotedev";
import en from "../../../public/translations/en.json";
import { Dict } from "../../type";
import axios from "axios";
import { publicConfig } from "../../../configs/public";
import { _ } from "../utils/lodash";

type Translation = typeof en;

const fileNameMapping = {
  "en-US": "en",
  "zh-CN": "zh_CN",
};

@remotedev({ name: "lang" })
export class LangStore {
  langPath = "/translations";
  @observable lang: string = "en";
  @observable translations: { [key: string]: Translation } = {
    en,
  };
  @computed
  get translation() {
    return this.translations[this.lang];
  }

  @action.bound
  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const langFromQuery = urlParams.get("lang");
    const broswerLang = navigator.languages ? navigator.languages[0] : navigator.language;
    let lang = langFromQuery || localStorage.getItem("lang") || broswerLang;
    if (fileNameMapping[lang]) {
      lang = fileNameMapping[lang];
    }
    await this.loadTranslation(lang);
    this.lang = lang;
  }

  @action.bound
  async setLang(lang: string) {
    await this.loadTranslation(lang);
    localStorage.setItem("lang", lang);
    this.lang = lang;
  }

  @action.bound
  async loadTranslation(lang) {
    if (this.translations[lang]) {
      return;
    }
    const res = await axios.get(`${this.langPath}/${lang}.json`);
    if (res.data) {
      this.translations[lang] = res.data;
    }
  }

  t(str: keyof Translation, data?: Dict) {
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
