import { useLang } from './LanguageProvider';
import type { Lang } from './config';

/**
 * A brand-content string that may carry per-language variants.
 * `ja` is the source language (the delivered copy) and is always present;
 * missing translations fall back to it. Plain strings stay language-neutral
 * (brand slogans, volumes like "50ml", …).
 */
export type LocalizedString = string | { ja: string; en?: string; ko?: string };

/** Resolve a LocalizedString for a specific language (ja fallback). */
export function pickL(
  value: LocalizedString | undefined,
  lang: Lang,
): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'string') return value;
  return value[lang] ?? value.ja;
}

/**
 * Hook returning a resolver bound to the active language:
 *   const l = useL();  …  <h1>{l(brand.story)}</h1>
 */
export function useL(): (value?: LocalizedString) => string | undefined {
  const { lang } = useLang();
  return (value) => pickL(value, lang);
}
