/**
 * Per-brand editorial content for the standalone brand pages (`#/brand/:slug`).
 *
 * Layout mirrors the ATENE brand-page reference (Torhop):
 *   Hero (video + banner + story) → TOKUPACK SET → PRODUCTS USP → CTA.
 *
 * Media is intentionally left blank — drop in `heroVideoUrl`, `heroImageUrl`,
 * the TokuPack set image and USP card images as they become available. Empty
 * fields render as tasteful placeholders so a half-filled page still looks
 * intentional.
 */

export interface UspCard {
  /** Optional heading shown under the image (leave blank until copy is ready). */
  title?: string;
  /** Product / USP image. Blank → placeholder tile. */
  imageUrl?: string;
  /** Where "Explore" points (a product detail, doc, etc.). Defaults to the TokuPack request. */
  link?: string;
}

/** A card in the 3-up "TOKUPACK" series (featured layout: A / B / C). */
export interface TokupackSeriesCard {
  label: string;
  caption?: string;
  imageUrl?: string;
  link?: string;
}

/** A product tile in the featured best-seller showcase grid. */
export interface ShowcaseProduct {
  name?: string;
  imageUrl?: string;
  link?: string;
}

/** The featured best-seller / new-product showcase block. */
export interface ProductShowcase {
  heading: string;
  products: ShowcaseProduct[];
}

/** The featured closing collaboration banner. */
export interface CollabBanner {
  heading: string;
  ctaLabel: string;
  ctaHref?: string;
  imageUrl?: string;
}

export interface BrandContent {
  slug: string;
  name: string;
  tagline: string;
  /** Page template. Defaults to "standard"; VT & Purito use "featured". */
  layout?: 'standard' | 'featured';
  /** Brand animation video (mp4/webm URL or an embeddable iframe src). */
  heroVideoUrl?: string;
  /** Large hero/banner still. */
  heroImageUrl?: string;
  /** Brand story paragraph (usually JP). */
  story: string;
  tokupack: {
    /** The set's theme line, e.g. "ホームスパで毛穴を徹底ケア". */
    subtitle: string;
    /** Showcase image of the packed set. */
    imageUrl?: string;
    /** The individual products inside the set, with quantities. */
    items: string[];
  };
  usps: UspCard[];
  /** Featured single hero product (standard layout, shown after the USP grid). */
  singleProduct?: {
    name?: string;
    description?: string;
    imageUrl?: string;
    link?: string;
  };

  // --- "featured" layout only (VT, Purito) ---
  /** Secondary hero message shown under the tagline. */
  philosophy?: string;
  /** The 3-up "TOKUPACK" series cards (A / B / C). */
  tokupackSeries?: TokupackSeriesCard[];
  /** Best-seller / new-product showcase grid. */
  showcase?: ProductShowcase;
  /** Closing collaboration banner. */
  collab?: CollabBanner;
}

/** Three empty USP tiles — a sensible default until real product shots land. */
const placeholderUsps: UspCard[] = [{}, {}, {}];

export const brands: BrandContent[] = [
  {
    slug: 'torhop',
    name: 'Torhop',
    tagline: 'Sauna-Inspired Warming Care',
    heroVideoUrl: '',
    heroImageUrl: '',
    story:
      'Torhopはフィンランドの平穏さと神秘的な感性を込めて フィンランドの伝統サウナ方式を製品に具現したウォッシュオフ専門ブランドです。 新しい方式のホームスパ経験を通じて 日常の中で特別な休息をお届けします。',
    tokupack: {
      subtitle: 'ホームスパで毛穴を徹底ケア',
      imageUrl: '',
      items: [
        'サウナソルトジェルパック 90g',
        'オーシャンスリーピングパック 60g',
        'オーシャンバスソルト 40g',
        'フォレストバスソルト 40g',
      ],
    },
    usps: placeholderUsps,
  },
  {
    slug: 'purito-seoul',
    name: 'Purito Seoul',
    tagline: 'From Soil to Seoul',
    layout: 'featured',
    heroVideoUrl: '',
    heroImageUrl: '',
    story:
      '自然由来の成分と誠実なフォーミュラで、肌にやさしいスキンケアを届ける韓国発のブランド。土から生まれた素材の力で、あなたの毎日にすこやかな美しさを。',
    philosophy: 'すべての肌のためのクリーンビューティー',
    tokupack: { subtitle: '', items: [] },
    usps: [],
    tokupackSeries: [
      { label: 'TOKUPACK A', link: '#/tokupack' },
      { label: 'TOKUPACK B', link: '#/tokupack' },
      { label: 'TOKUPACK C', link: '#/tokupack' },
    ],
    showcase: {
      heading: '世界で人気の新商品・ベストセラーを限定でご紹介',
      products: [{}, {}, {}, {}, {}, {}],
    },
    collab: {
      heading: 'Purito Seoulとのコラボレーションを始めませんか？',
      ctaLabel: '今すぐLivestreamを予約！▶',
      ctaHref: '#reserve',
    },
  },
  {
    slug: 'vt-cosmetics',
    name: 'VT Cosmetics',
    tagline: 'In - Vogue and Timeless',
    layout: 'featured',
    heroVideoUrl: '',
    heroImageUrl: '',
    story:
      '肌を大切にする思いと、時代を超えて愛される洗練された商品で、よりあなたらしい毎日を共にするブランド。',
    philosophy: '肌本来の美しさを保つこと',
    tokupack: { subtitle: '', items: [] },
    usps: [],
    tokupackSeries: [
      { label: 'TOKUPACK A', link: '#/tokupack' },
      { label: 'TOKUPACK B', link: '#/tokupack' },
      { label: 'TOKUPACK C', link: '#/tokupack' },
    ],
    showcase: {
      heading: '世界で人気の新商品・ベストセラーを限定でご紹介',
      products: [
        { name: 'Reedle Shot 100' },
        { name: 'Spot Cream' },
        { name: 'PDRN Reedles Brush Hair Serum' },
        { name: 'Mask' },
        { name: 'Cream' },
        {},
      ],
    },
    collab: {
      heading: 'VT Cosmeticsとのコラボレーションを始めませんか？',
      ctaLabel: '今すぐLivestreamを予約！▶',
      ctaHref: '#reserve',
    },
  },
  {
    slug: 'beplain',
    name: 'Beplain',
    tagline: 'Enjoy plain skin, beplain',
    story: '',
    tokupack: { subtitle: '', items: [] },
    usps: placeholderUsps,
  },
  {
    slug: 'dr-deep',
    name: 'Dr.Deep',
    tagline: "Designing today's depth for the skin's tomorrow",
    story: '',
    tokupack: { subtitle: '', items: [] },
    usps: placeholderUsps,
  },
  {
    slug: 'lubylab',
    name: 'LUBYLAB',
    tagline: 'The Home-Surgical Approach',
    story: '',
    tokupack: { subtitle: '', items: [] },
    usps: placeholderUsps,
  },
  {
    slug: 'dailyweekly',
    name: 'DAILYWEEKLY',
    tagline: 'Daily Delight, Weekly Wonders',
    story: '',
    tokupack: { subtitle: '', items: [] },
    usps: placeholderUsps,
  },
  {
    slug: 'babaco',
    name: 'Babaco',
    tagline: 'Beauty begins with real care.',
    story: '',
    tokupack: { subtitle: '', items: [] },
    usps: placeholderUsps,
  },
  {
    slug: 'celonia',
    name: 'Celonia',
    tagline: 'Premium Anti-Aging Solution',
    story: '',
    tokupack: { subtitle: '', items: [] },
    usps: placeholderUsps,
  },
];

export function getBrand(slug: string): BrandContent | undefined {
  return brands.find((b) => b.slug === slug);
}
