// C-14.2 Language Loader

export class I18N {
  constructor(defaultLang='nl') {
    this.lang=defaultLang;
    this.strings={};
  }

  async load(lang) {
    this.lang=lang;
    const res=await fetch(`/src/i18n/${lang}.json`);
    this.strings=await res.json();
  }

  t(key) {
    return this.strings[key] || key;
  }
}
