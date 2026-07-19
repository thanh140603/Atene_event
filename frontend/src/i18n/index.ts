import type { Dict, Lang, ResourcePack } from './config';
import { common } from './resources/common';
import { home } from './resources/home';
import { competition } from './resources/competition';
import { venue } from './resources/venue';
import { location } from './resources/location';
import { tokupack } from './resources/tokupack';
import { brand } from './resources/brand';

// Each pack contributes a unique set of top-level namespace keys (nav, home,
// competition, …) so a shallow per-language merge is collision-free.
const packs: ResourcePack[] = [
  common,
  home,
  competition,
  venue,
  location,
  tokupack,
  brand,
];

function build(lang: Lang): Dict {
  return packs.reduce<Dict>((acc, p) => ({ ...acc, ...(p[lang] ?? {}) }), {});
}

export const resources: Record<Lang, Dict> = {
  ja: build('ja'),
  en: build('en'),
  ko: build('ko'),
};
