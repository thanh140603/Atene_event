import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DEFAULT_LANG, LANGS, STORAGE_KEY, type Dict, type Lang } from './config';
import { resources } from './index';

export type TFunc = (
  key: string,
  vars?: Record<string, string | number>,
) => string;

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TFunc;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function isLang(value: string | null): value is Lang {
  return !!value && (LANGS as readonly string[]).includes(value);
}

function detectInitial(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  // A ?lang= query param wins (shareable localized links), then the saved choice.
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) return fromUrl;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (isLang(saved)) return saved;
  return DEFAULT_LANG;
}

/** Resolve a dot-path key ("home.hero.tagline") to a string, if present. */
function lookup(dict: Dict, key: string): string | undefined {
  const value = key.split('.').reduce<unknown>((obj, part) => {
    if (obj && typeof obj === 'object') {
      return (obj as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);
  return typeof value === 'string' ? value : undefined;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }, []);

  const t = useCallback<TFunc>(
    (key, vars) => {
      const str =
        lookup(resources[lang], key) ?? lookup(resources.en, key) ?? key;
      if (!vars) return str;
      return str.replace(/\{(\w+)\}/g, (_, name: string) =>
        vars[name] != null ? String(vars[name]) : `{${name}}`,
      );
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within a LanguageProvider');
  return ctx;
}

export function useT(): TFunc {
  return useI18n().t;
}

export function useLang(): { lang: Lang; setLang: (lang: Lang) => void } {
  const { lang, setLang } = useI18n();
  return { lang, setLang };
}
