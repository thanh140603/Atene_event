export const LANGS = ['ja', 'en', 'ko'] as const;
export type Lang = (typeof LANGS)[number];

/** A (possibly nested) translation dictionary for one language. */
export type Dict = Record<string, unknown>;
/** A namespace's translations across every supported language. */
export type ResourcePack = Record<Lang, Dict>;

export const DEFAULT_LANG: Lang = 'ja';
export const STORAGE_KEY = 'atene.lang';

/** Full names shown in the language menu. */
export const LANG_LABELS: Record<Lang, string> = {
  ja: '日本語',
  en: 'English',
  ko: '한국어',
};

/** Two-letter labels shown in the compact rail switcher. */
export const LANG_SHORT: Record<Lang, string> = {
  ja: 'JP',
  en: 'EN',
  ko: 'KO',
};
