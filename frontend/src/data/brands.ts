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

import type { LocalizedString } from '../i18n/localized';

export interface UspCard {
  /** Optional heading shown under the image (leave blank until copy is ready). */
  title?: LocalizedString;
  /** Product / USP image. Blank → placeholder tile. */
  imageUrl?: string;
  /** Where "Explore" points (a product detail, doc, etc.). Defaults to the TokuPack request. */
  link?: string;
}

/** A sellable product in the carousel under PRODUCTS USP (from `DETAILS/<n>/`). */
export interface BrandProduct {
  /** Stable id used in the product-detail route (`#/brand/:slug/product/:id`). */
  id: string;
  /** Product name (shown on the card + used as alt text). */
  name?: LocalizedString;
  /** Main product shot — the image sitting directly in `DETAILS/<n>/`. */
  imageUrl: string;
  /**
   * Gallery shots for the detail page's thumbnail section. Usually
   * `DETAILS/<n>/JP_Thumb…`, but the delivered folder names are not
   * reliable (some folders have thumbnails/details swapped) — wire by
   * looking at the images, not the folder name.
   */
  galleryImages?: string[];
  /** Full-width detail pages, stacked USP-style (usually `DETAILS/<n>/JP_Detailed/`). */
  detailImages?: string[];
  /** Pricing / spec rows on the detail page — render only when present. */
  listPrice?: string;
  salePrice?: string;
  discountLabel?: string;
  volume?: string;
  /** Where "Explore" points. Defaults to the product detail page. */
  link?: string;
}

/** A card in the 3-up "TOKUPACK" series (featured layout: A / B / C). */
export interface TokupackSeriesCard {
  label: string;
  caption?: LocalizedString;
  imageUrl?: string;
  link?: string;
}

/** A product tile in the featured best-seller showcase grid. */
export interface ShowcaseProduct {
  name?: LocalizedString;
  imageUrl?: string;
  link?: string;
}

/** The featured best-seller / new-product showcase block. */
export interface ProductShowcase {
  heading: LocalizedString;
  products: ShowcaseProduct[];
}

/**
 * One TOKUPACK set of a multi-set brand (`brands/<n>. <Brand>/TOKUPACK SET <x>/`).
 * Rendered as a card in the brand page's set grid; Explore opens the set's
 * own sub-page (`#/brand/:slug/set/:id`) = TOKUPACK SET → USP → DETAILS.
 */
export interface TokupackSetPage {
  /** Route id — the delivered set-folder number ("1" / "2" / "3"). */
  id: string;
  /** Grid label under the card ("TOKUPACK A"). */
  label: string;
  /** Card image on the brand page (the loose `…TPSET_<X>…` file in the brand root). */
  cardImageUrl: string;
  /** The sub-page's set section (copy from `<set>/x.1 TOKUPACK SET/text*.txt`). */
  tokupack: BrandContent['tokupack'];
  /** The sub-page's USP catalog pages (`<set>/x.2 USP/` — set 1 says "x.1 PRODUCT USP"). */
  usps: UspCard[];
  /** Carousel headline + products (`<set>/x.3 DETAILS/`). */
  productsHeadline?: LocalizedString;
  products?: BrandProduct[];
}

/** The featured closing collaboration banner. */
export interface CollabBanner {
  heading: LocalizedString;
  ctaLabel: LocalizedString;
  ctaHref?: string;
  imageUrl?: string;
}

export interface BrandContent {
  slug: string;
  name: string;
  /** Brand logo image — shown in the intro section instead of the name text. */
  logoUrl?: string;
  tagline: LocalizedString;
  /** Page template. Defaults to "standard"; VT & Purito use "featured". */
  layout?: 'standard' | 'featured';
  /** Brand animation video (mp4/webm URL or an embeddable iframe src). */
  heroVideoUrl?: string;
  /** Large hero/banner still. */
  heroImageUrl?: string;
  /** Brand story paragraph (ja = the delivered copy). */
  story: LocalizedString;
  tokupack: {
    /** The set's theme line, e.g. "ホームスパで毛穴を徹底ケア". */
    subtitle: LocalizedString;
    /** Showcase image of the packed set. */
    imageUrl?: string;
    /** The individual products inside the set, with quantities. */
    items: LocalizedString[];
    /** Price rows from the set's text file (通常販売価格 / 割引 / ライブ配信価格). */
    pricing?: { label: LocalizedString; value: string; highlight?: boolean }[];
  };
  usps: UspCard[];
  /** Headline for the product-lineup carousel (from `DETAILS/text.txt`). */
  productsHeadline?: LocalizedString;
  /** Product carousel shown below PRODUCTS USP (standard layout). */
  products?: BrandProduct[];
  /** Featured single hero product (standard layout, shown after the USP grid). */
  singleProduct?: {
    name?: LocalizedString;
    description?: LocalizedString;
    imageUrl?: string;
    link?: string;
  };
  /**
   * Multi-set brands (VT, Celonia, Purito): the brand page shows a card grid
   * (one card per set) instead of the single TOKUPACK SET → USP → carousel
   * flow, and each set gets its own sub-page at `#/brand/:slug/set/:id`
   * with exactly that flow. See BRAND_MULTI_SET_LAYOUT.md.
   */
  tokupackSets?: TokupackSetPage[];

  // --- "featured" layout only (VT, Purito) ---
  /** Secondary hero message shown under the tagline. */
  philosophy?: LocalizedString;
  /** The 3-up "TOKUPACK" series cards (A / B / C). */
  tokupackSeries?: TokupackSeriesCard[];
  /** Best-seller / new-product showcase grid. */
  showcase?: ProductShowcase;
  /** Closing collaboration banner. */
  collab?: CollabBanner;
}

/** The three standard price rows every set's text file uses, pre-localized. */
const L_REGULAR_PRICE = {
  ja: '通常販売価格',
  en: 'Regular price',
  ko: '정상 판매가',
};
const L_LIVE_DISCOUNT = {
  ja: 'ライブ配信限定割引',
  en: 'Livestream-only discount',
  ko: '라이브 방송 한정 할인',
};
const L_LIVE_PRICE = {
  ja: 'ライブ配信価格',
  en: 'Livestream price',
  ko: '라이브 방송 가격',
};

/**
 * Per-brand media delivered under `src/public/brands/<n>. <Brand>/` and served
 * at "/brands/..." (see vite `publicDir`). Each brand folder contains:
 *   TOKUPACK SET/   → the packed-set showcase image (+ set copy in text.txt)
 *   PRODUCT(S) USP/ → full-width product-catalog pages, stacked in order
 *   DETAILS/        → product detail shots
 * Folder/file names contain spaces & non-ASCII, so paths run through encodeURI.
 */
const BR = '/brands';
const u = (p: string) => encodeURI(p);
/** Numbered image sequence: seq(3, (i) => `.../img_${i}.jpg`) → 3 encoded URLs. */
const seq = (n: number, f: (i: number) => string) =>
  Array.from({ length: n }, (_, k) => u(f(k + 1)));
const pad2 = (i: number) => String(i).padStart(2, '0');

/**
 * VT's リードルショット 100 ships in both TOKUPACK SET 1 and 2 (the delivered
 * `DETAILS/1` folders are identical copies) — defined once, referenced by both
 * sets so `#/brand/vt-cosmetics/product/1` stays unambiguous.
 */
const VT_REEDLE_S100: BrandProduct = {
  id: '1',
  // Name / pricing from `TOKUPACK SET 1/1.3 DETAILS/1/text.txt`.
  name: {
    ja: 'リードルショット 100',
    en: 'Reedle Shot 100',
    ko: '리들샷 100',
  },
  listPrice: '¥3,520',
  volume: '50ml',
  imageUrl: u(`${BR}/7. VT/TOKUPACK SET 1/1.3 DETAILS/1/REEDLE-S100_Sub.jpg`),
  galleryImages: [
    u(`${BR}/7. VT/TOKUPACK SET 1/1.3 DETAILS/1/JP_Thumb/Copy of REEDLE-S100_Sub.jpg`),
  ],
  // Pages 6 / 10 / 14 were delivered as GIFs.
  detailImages: seq(
    20,
    (i) =>
      `${BR}/7. VT/TOKUPACK SET 1/1.3 DETAILS/1/JP_Detailed/Copy of ${i}.${[6, 10, 14].includes(i) ? 'gif' : 'jpg'}`,
  ),
};

/** Celonia's sheet mask ships in TOKUPACK SET 1 and 3 — defined once. */
const CELONIA_SHEET_MASK: BrandProduct = {
  id: '1',
  // Name / pricing from `TOKUPACK SET 1/1.3 DETAILS/1/text.txt`.
  name: {
    ja: 'シグネチャーバイオ シートマスク',
    en: 'Signature Bio Sheet Mask',
    ko: '시그니처 바이오 시트 마스크',
  },
  listPrice: '¥4,400',
  volume: '33g x 5',
  // The delivered file name really ends in "l .jpg" (trailing space).
  imageUrl: u(
    `${BR}/8. Celonia/TOKUPACK SET 1/1.3 DETAILS/1/Copy of Main thumbnail .jpg`,
  ),
  galleryImages: [
    'Copy of Main thumbnail .jpg',
    'Copy of 3.jpg',
    'Copy of 4.jpg',
    'Copy of 5.jpg',
    'Copy of 6.jpg',
    'Copy of 7.jpg',
    'Copy of 8.jpg',
    'Copy of 9.jpg',
    'Copy of 10.jpg',
    'Copy of 11.jpg',
    'Copy of 12.1.jpg',
    'Copy of 12.2.jpg',
    'Copy of 13.jpg',
  ].map((f) =>
    u(`${BR}/8. Celonia/TOKUPACK SET 1/1.3 DETAILS/1/JP_Thumb/${f}`),
  ),
  // Page 15 was delivered as a PNG.
  detailImages: seq(
    15,
    (i) =>
      `${BR}/8. Celonia/TOKUPACK SET 1/1.3 DETAILS/1/JP_Detailed/Copy of ${i}.${i === 15 ? 'png' : 'jpg'}`,
  ),
};

/** Celonia's skin booster ships in all three TOKUPACK sets — defined once. */
const CELONIA_SKIN_BOOSTER: BrandProduct = {
  id: '2',
  // Name / pricing from `TOKUPACK SET 1/1.3 DETAILS/2/text.txt`.
  name: {
    ja: 'バイオソリューション スキンブースター 10ml',
    en: 'Bio Solution Skin Booster 10ml',
    ko: '바이오 솔루션 스킨부스터 10ml',
  },
  listPrice: '¥6,050',
  volume: '10ml',
  imageUrl: u(`${BR}/8. Celonia/TOKUPACK SET 1/1.3 DETAILS/2/Copy of 2.png`),
  // Some delivered names carry double spaces — kept verbatim.
  galleryImages: [
    'Copy of 2.png',
    'Copy of 3.jpg',
    'Copy of 7.jpg',
    'Copy of 8.jpg',
    'Copy of 9.jpg',
    'Copy of 10.jpg',
    'Copy of 11.jpg',
    'Copy of 13.jpg',
    'Copy of 13.2.jpg',
    'Copy of 14.jpg',
    'Copy of 16.jpg',
    'Copy of All 2 resize.jpg',
    'Copy of All 3 resize.jpg',
    'Copy of all DP resize.jpg',
    'Copy of CELONIA  resize.jpg',
    'Copy of Skinbooster resize.jpg',
    'Copy of Skinbooster  resize.jpg',
  ].map((f) =>
    u(`${BR}/8. Celonia/TOKUPACK SET 1/1.3 DETAILS/2/JP_Thumb/${f}`),
  ),
  // Page 18 was delivered as a PNG.
  detailImages: seq(
    18,
    (i) =>
      `${BR}/8. Celonia/TOKUPACK SET 1/1.3 DETAILS/2/JP_Detailed/Copy of ${i}.${i === 18 ? 'png' : 'jpg'}`,
  ),
};

/** Purito's peel-shot pad ships in TOKUPACK SET 1 and 3 — defined once. */
const PURITO_PEEL_SHOT: BrandProduct = {
  id: '3',
  // Name / pricing from `TOKUPACK SET 1/DETAILS/3/text.txt`.
  name: {
    ja: 'ピールショット エクスフォリエイティング パッド',
    en: 'Peel Shot Exfoliating Pad',
    ko: '필샷 엑스폴리에이팅 패드',
  },
  listPrice: '¥2,875',
  volume: '64g (8 pads)',
  imageUrl: u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/3/3.png`),
  galleryImages: [
    'Copy of 84.png',
    'Copy of 20251202 퓨리토_00163.jpg',
    'Copy of 20251202 퓨리토_00541.jpg',
    'Copy of 20251202 퓨리토_00573.jpg',
    'Copy of 20251202 퓨리토_00593 1.jpg',
    'Copy of 20251202 퓨리토_00632.jpg',
  ].map((f) => u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/3/jp_thumb/${f}`)),
  detailImages: [
    u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/3/jp_detailed/Copy of full (5).png`),
  ],
};

export const brands: BrandContent[] = [
  {
    slug: 'torhop',
    name: 'Torhop',
    // `?v=2` busts browser caches from before the logo was swapped (same file name).
    logoUrl: u(`${BR}/1. TORHOP/Copy of Torhop.png`) + '?v=2',
    tagline: 'Sauna-Inspired Warming Care',
    heroVideoUrl: '',
    heroImageUrl: '',
    // ja copy from `1. TORHOP/text2.txt` — line breaks preserved.
    story: {
      ja: 'Torhopはフィンランドの平穏さと神秘的な感性を込めて\nフィンランドの伝統サウナ方式を製品に具現したウォッシュオフ\n専門ブランドです。 新しい方式のホームスパ経験を通じて\n日常の中で特別な休息をお届けします。',
      en: 'Torhop is a wash-off skincare brand that captures the calm and mystique of Finland, bringing the traditional Finnish sauna ritual into its products. Through a new kind of home-spa experience, we deliver a special moment of rest in your everyday life.',
      ko: 'Torhop은 핀란드의 평온함과 신비로운 감성을 담아\n핀란드 전통 사우나 방식을 제품으로 구현한 워시오프\n전문 브랜드입니다. 새로운 방식의 홈스파 경험을 통해\n일상 속 특별한 휴식을 선사합니다.',
    },
    // ja copy from `TOKUPACK SET/text (1).txt`.
    tokupack: {
      subtitle: {
        ja: 'ホームスパで叶える、毛穴の徹底ケア',
        en: 'Thorough pore care, home-spa style',
        ko: '홈스파로 완성하는 철저한 모공 케어',
      },
      imageUrl: u(`${BR}/1. TORHOP/TOKUPACK SET/2607_일본행사 썸네일 (1).jpg`),
      items: [
        {
          ja: 'サウナソルトジェルパック 90g',
          en: 'Sauna Salt Gel Pack 90g',
          ko: '사우나 솔트 젤팩 90g',
        },
        {
          ja: 'オーシャンスリーピングパック 60g',
          en: 'Ocean Sleeping Pack 60g',
          ko: '오션 슬리핑팩 60g',
        },
        {
          ja: 'オーシャンバスソルト 40g',
          en: 'Ocean Bath Salt 40g',
          ko: '오션 배스솔트 40g',
        },
        {
          ja: 'フォレストバスソルト 40g',
          en: 'Forest Bath Salt 40g',
          ko: '포레스트 배스솔트 40g',
        },
      ],
      pricing: [
        { label: L_REGULAR_PRICE, value: '¥9,179' },
        { label: L_LIVE_DISCOUNT, value: '50%OFF' },
        { label: L_LIVE_PRICE, value: '¥4,500', highlight: true },
      ],
    },
    // ja copy from `DETAILS/text.txt`.
    productsHeadline: {
      ja: '自宅でもスパのように、毛穴をスッキリケアするホームスパルーチン完成',
      en: 'A complete home-spa routine that clears your pores like a spa treatment — at home.',
      ko: '집에서도 스파처럼, 모공을 말끔히 케어하는 홈스파 루틴 완성',
    },
    usps: [
      {
        imageUrl: u(
          `${BR}/1. TORHOP/PRODUCTS USP/Torhop_제품카탈로그jp(일본 틱톡 오프라인 행사용)_260714_제품01 (1).png`,
        ),
      },
      {
        imageUrl: u(
          `${BR}/1. TORHOP/PRODUCTS USP/Torhop_제품카탈로그jp(일본 틱톡 오프라인 행사용)_260714_제품02 (1).png`,
        ),
      },
      {
        imageUrl: u(
          `${BR}/1. TORHOP/PRODUCTS USP/Torhop_제품카탈로그jp(일본 틱톡 오프라인 행사용)_260714_제품03 (1).png`,
        ),
      },
    ],
    products: [
      {
        id: '1',
        // Name / pricing from `DETAILS/1/text.txt`.
        name: {
          ja: 'サウナンジャン ソルトマスク',
          en: 'Saunanjang Salt Mask',
          ko: '사우난지앙 솔트 마스크',
        },
        listPrice: '¥3,630',
        volume: '90g',
        imageUrl: u(`${BR}/1. TORHOP/DETAILS/1/b4 (1).jpg`),
        galleryImages: seq(
          11,
          (i) =>
            `${BR}/1. TORHOP/DETAILS/1/JP_Detailed/Copy of 리뉴얼-썸네일_사우난지앙_${pad2(i)}.jpg`,
        ),
        detailImages: seq(
          11,
          (i) =>
            `${BR}/1. TORHOP/DETAILS/1/JP_Thumbnail/Copy of salt-mask90g_jp_${pad2(i)}.jpg`,
        ),
      },
      {
        id: '2',
        // Name / pricing from `DETAILS/2/text.txt`.
        name: {
          ja: 'フィンランデ オーロラ グロウマスク',
          en: 'Finlande Aurora Glow Mask',
          ko: '핀란데 오로라 글로우 마스크',
        },
        listPrice: '¥3,949',
        volume: '60g',
        imageUrl: u(`${BR}/1. TORHOP/DETAILS/2/슬리핑팩_연출컷 (9).jpg`),
        galleryImages: seq(
          7,
          (i) =>
            `${BR}/1. TORHOP/DETAILS/2/JP_Thumb/Copy of 260714_아마존_오로라마스크-썸네일_일본어${pad2(i)}.jpg`,
        ),
        detailImages: seq(
          2,
          (i) =>
            `${BR}/1. TORHOP/DETAILS/2/JP_Detailed/Copy of 250425_오로라슬리핑팩 상세페이지 ${i}(일어).jpg`,
        ),
      },
      {
        id: '3',
        // `DETAILS/3/text.txt` only provides the name — no pricing/volume rows.
        name: {
          ja: 'オーシャン／フォレスト バスソルト 各1個',
          en: 'Ocean / Forest Bath Salt (1 of each)',
          ko: '오션/포레스트 배스솔트 각 1개',
        },
        imageUrl: u(`${BR}/1. TORHOP/DETAILS/3/3.png`),
        galleryImages: seq(
          6,
          (i) => `${BR}/1. TORHOP/DETAILS/3/JP_Thumb/Copy of thum${i}.jpg`,
        ),
        detailImages: [
          u(`${BR}/1. TORHOP/DETAILS/3/JP_Detailed/Copy of 배스솔트 듀오 01.jpg`),
        ],
      },
    ],
  },
  {
    slug: 'purito-seoul',
    name: 'Purito Seoul',
    logoUrl: u(`${BR}/9. Purito/Copy of Purito.png`),
    tagline: 'From Soil to Seoul',
    heroVideoUrl: '',
    heroImageUrl: '',
    // ja copy from `9. Purito/text2.txt` — line breaks preserved.
    story: {
      ja: '自然から、現代Kビューティーの中心・ソウルへ。\n\nPuritoは、自然が持つ健やかな力と、\n一人ひとりの肌状態に寄り添うソウル発の洗練されたスキンケアメソッドを融合し、\nあなたの肌本来の美しさを引き出します。',
      en: "From nature to Seoul, the heart of modern K-beauty.\n\nPurito fuses the wholesome power of nature with a refined Seoul-born skincare method that attends to each person's skin, drawing out your skin's natural beauty.",
      ko: '자연에서, 현대 K뷰티의 중심 서울로.\n\nPurito는 자연이 지닌 건강한 힘과\n한 사람 한 사람의 피부 상태에 다가가는 서울발 세련된 스킨케어 메소드를 융합해\n당신의 피부 본연의 아름다움을 이끌어냅니다.',
    },
    // Not rendered — the multi-set grid replaces the single-set section.
    tokupack: { subtitle: '', items: [] },
    usps: [],
    // No dedicated set images were delivered — the root `combo<n>.png` files
    // serve as both the grid card and the sub-page set image.
    tokupackSets: [
      {
        id: '1',
        label: 'TOKUPACK A',
        cardImageUrl: u(`${BR}/9. Purito/combo1.png`),
        // Copy from `TOKUPACK SET 1/Tokupack set1/text (1).txt`.
        tokupack: {
          subtitle: {
            ja: '人気の4ステップスキンケアを1セットで体験。',
            en: 'Experience the popular 4-step skincare in one set.',
            ko: '인기 4단계 스킨케어를 한 세트로 체험.',
          },
          imageUrl: u(`${BR}/9. Purito/combo1.png`),
          items: [
            {
              ja: 'ピールショットパッド 1箱（8枚）',
              en: 'Peel Shot Pad, 1 box (8 pads)',
              ko: '필샷 패드 1박스 (8매)',
            },
            {
              ja: 'マイティバンブー パンテノールクリーム 100ml',
              en: 'Mighty Bamboo Panthenol Cream 100ml',
              ko: '마이티 뱀부 판테놀 크림 100ml',
            },
            {
              ja: 'ワンダーリリーフ センテラセラム（無香料）60ml',
              en: 'Wonder Releaf Centella Serum (Unscented) 60ml',
              ko: '원더 릴리프 센텔라 세럼 (무향) 60ml',
            },
            {
              ja: 'デイリーソフトタッチ サンスクリーン 60ml',
              en: 'Daily Soft Touch Sunscreen 60ml',
              ko: '데일리 소프트터치 선스크린 60ml',
            },
          ],
          pricing: [
            { label: L_REGULAR_PRICE, value: '¥13,125' },
            { label: L_LIVE_DISCOUNT, value: '54%OFF' },
            { label: L_LIVE_PRICE, value: '¥5,999', highlight: true },
          ],
        },
        usps: [
          { imageUrl: u(`${BR}/9. Purito/TOKUPACK SET 1/USP/Copy of 1.png`) },
        ],
        // Copy from `TOKUPACK SET 1/DETAILS/text2.txt`.
        productsHeadline: {
          ja: '世界で愛されるPURITOのベストセラーを厳選。',
          en: "A curated pick of PURITO's best-sellers loved worldwide.",
          ko: '전 세계에서 사랑받는 PURITO 베스트셀러를 엄선.',
        },
        products: [
          {
            id: '1',
            // Name / pricing from `TOKUPACK SET 1/DETAILS/1/text.txt`.
            name: {
              ja: 'マイティバンブー パンテノールクリーム',
              en: 'Mighty Bamboo Panthenol Cream',
              ko: '마이티 뱀부 판테놀 크림',
            },
            listPrice: '¥3,500',
            volume: '100ml',
            imageUrl: u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/1/1.png`),
            galleryImages: [5, 6, 7, 8, 9, 10].map((n) =>
              u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/1/JP_Thumb/Copy of ${n}.png`),
            ),
            detailImages: [
              u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/1/JP_Detailed/Copy of 1.png`),
              u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/1/JP_Detailed/Copy of 2.png`),
              u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/1/JP_Detailed/Copy of 3.jpg`),
            ],
          },
          {
            id: '2',
            // Name / pricing from `TOKUPACK SET 1/DETAILS/2/text.txt`.
            name: {
              ja: 'ワンダーリリーフ センテラセラム（無香料）',
              en: 'Wonder Releaf Centella Serum (Unscented)',
              ko: '원더 릴리프 센텔라 세럼 (무향)',
            },
            listPrice: '¥3,500',
            volume: '60ml',
            imageUrl: u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/2/2.png`),
            galleryImages: [33, 34, 35].map((n) =>
              u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/2/JP_Thumb/Copy of ${n}.png`),
            ),
            detailImages: seq(
              9,
              (i) =>
                `${BR}/9. Purito/TOKUPACK SET 1/DETAILS/2/JP_Detailed/Copy of detailpage_언센티드세럼.v.3.1_r${i}_c1.png`,
            ),
          },
          PURITO_PEEL_SHOT,
          {
            id: '4',
            // Name / pricing from `TOKUPACK SET 1/DETAILS/4/text.txt`.
            name: {
              ja: 'デイリー ソフトタッチ サンスクリーン',
              en: 'Daily Soft Touch Sunscreen',
              ko: '데일리 소프트터치 선스크린',
            },
            listPrice: '¥3,250',
            volume: '60ml',
            imageUrl: u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/4/4.png`),
            galleryImages: [67, 69, 70, 71].map((n) =>
              u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/4/jp_thumb/Copy of ${n}.png`),
            ),
            // UUID-named avif/webp pages — delivered order unknown, kept sorted.
            detailImages: [
              'Copy of 4f738319-2313-41c1-9688-1d2f5bac4196.avif',
              'Copy of 6ff39e0d-25e4-4c1e-bf70-27a9e3922591.avif',
              'Copy of 29a503ff-c1a2-44dd-8c01-e5ae8c12ed55.avif',
              'Copy of 79fc8780-dc30-43f2-8617-fe3e9f935748.avif',
              'Copy of 274b82f2-8229-44ea-b596-d45f985132ea.avif',
              'Copy of 691e5d98-37ef-41da-b506-2c0f840d96bd.webp',
              'Copy of 4044ccb5-57bd-43af-b97e-836865531345.avif',
              'Copy of 97954ad4-8ecc-494c-960d-1f3e1c294800.webp',
              'Copy of 163679e5-3bc7-4f02-b4ea-84f3631b2707.avif',
              'Copy of 07081745-9db3-41fd-80d2-ca5bf18dece2.avif',
              'Copy of b6f36cc5-a1c1-4b65-a6cc-c3dd5ec18f84.avif',
              'Copy of da2bc680-d7d2-4443-8766-83a85eeeba9f.webp',
              'Copy of ddf30df7-cd05-4e68-a75a-2a0a29cf3333.webp',
              'Copy of e003f12c-d1c4-40bf-a842-b2a99b8ac693.avif',
              'Copy of eea822fb-8250-4a5d-a31b-2f9ede285703.avif',
              'Copy of f0602f2b-6a8c-4e67-b821-24e702abe6f1.webp',
            ].map((f) =>
              u(`${BR}/9. Purito/TOKUPACK SET 1/DETAILS/4/jp_detailed/${f}`),
            ),
          },
        ],
      },
      {
        id: '2',
        label: 'TOKUPACK B',
        cardImageUrl: u(`${BR}/9. Purito/combo2.png`) + '?v=2',
        // Copy from `TOKUPACK SET2/Tokupack set2/text (1).txt`.
        tokupack: {
          subtitle: {
            ja: '肌悩みに合わせて使える高機能美容液セット。',
            en: 'A high-performance serum set matched to your skin concerns.',
            ko: '피부 고민에 맞춰 쓰는 고기능 세럼 세트.',
          },
          imageUrl: u(`${BR}/9. Purito/combo2.png`) + '?v=2',
          items: [
            {
              ja: 'レチノール・レチナール2000 NAD+配合セラム 30ml',
              en: 'Retinol/Retinal 2000 NAD+ Serum 30ml',
              ko: '레티놀·레티날 2000 NAD+ 세럼 30ml',
            },
            {
              ja: 'アゼライン酸10% コウジ酸・ティーツリー配合セラム 30ml',
              en: 'Azelaic Acid 10% Kojic Acid & Tea Tree Serum 30ml',
              ko: '아젤라익애씨드 10% 코직산·티트리 세럼 30ml',
            },
            {
              ja: 'マルチPDRN コラーゲン・EGF配合セラム 30ml',
              en: 'Multi PDRN Collagen & EGF Serum 30ml',
              ko: '멀티 PDRN 콜라겐·EGF 세럼 30ml',
            },
            {
              ja: '＼ GIFT ／ デイリーソフトタッチ サンスティック 20g',
              en: 'GIFT: Daily Soft Touch Sun Stick 20g',
              ko: 'GIFT: 데일리 소프트터치 선스틱 20g',
            },
          ],
          pricing: [
            { label: L_REGULAR_PRICE, value: '¥13,500' },
            { label: L_LIVE_DISCOUNT, value: '52%OFF' },
            { label: L_LIVE_PRICE, value: '¥6,500', highlight: true },
          ],
        },
        usps: [
          { imageUrl: u(`${BR}/9. Purito/TOKUPACK SET2/USP/Copy of 2.png`) },
        ],
        // Copy from `TOKUPACK SET2/DETAILS/text2.txt`.
        productsHeadline: {
          ja: '肌悩みに合わせて使える高機能美容液セット。',
          en: 'A high-performance serum set matched to your skin concerns.',
          ko: '피부 고민에 맞춰 쓰는 고기능 세럼 세트.',
        },
        products: [
          {
            id: '5',
            // Name / pricing from `TOKUPACK SET2/DETAILS/5/text.txt`.
            name: {
              ja: 'アゼライン酸10％ コウジ酸·ティーツリー セラム',
              en: 'Azelaic Acid 10% Kojic Acid & Tea Tree Serum',
              ko: '아젤라익애씨드 10% 코직산·티트리 세럼',
            },
            listPrice: '¥4,500',
            volume: '30ml',
            imageUrl: u(`${BR}/9. Purito/TOKUPACK SET2/DETAILS/5/5.png`),
            galleryImages: [56, 75, 76, 78, 79].map((n) =>
              u(`${BR}/9. Purito/TOKUPACK SET2/DETAILS/5/JP_THUMB/Copy of ${n}.png`),
            ),
            detailImages: [
              u(`${BR}/9. Purito/TOKUPACK SET2/DETAILS/5/jp_detailed/Copy of full (2).png`),
            ],
          },
          {
            id: '6',
            // Name / pricing from `TOKUPACK SET2/DETAILS/6/text.txt`.
            name: {
              ja: 'マルチ PDRN コラーゲン EGF セラム',
              en: 'Multi PDRN Collagen EGF Serum',
              ko: '멀티 PDRN 콜라겐 EGF 세럼',
            },
            listPrice: '¥4,500',
            volume: '30ml',
            imageUrl: u(`${BR}/9. Purito/TOKUPACK SET2/DETAILS/6/6.png`),
            galleryImages: [
              'Copy of 60.png',
              'Copy of 61.png',
              'Copy of 62.png',
              'Copy of 64.png',
              'Copy of 65.png',
              'Copy of AMZ_Thumb_PDRN세럼_00_r2_c1.png',
              'Copy of AMZ_Thumb_PDRN세럼_00_r3_c1.png',
            ].map((f) =>
              u(`${BR}/9. Purito/TOKUPACK SET2/DETAILS/6/JP_THUMB/${f}`),
            ),
            detailImages: [
              u(`${BR}/9. Purito/TOKUPACK SET2/DETAILS/6/JP_DETAILED/Copy of full (4).png`),
            ],
          },
          {
            id: '7',
            // Name / pricing from `TOKUPACK SET2/DETAILS/7/text.txt`.
            name: {
              ja: 'レチノール·レチナール 2000 NAD+ セラム',
              en: 'Retinol/Retinal 2000 NAD+ Serum',
              ko: '레티놀·레티날 2000 NAD+ 세럼',
            },
            listPrice: '¥4,500',
            volume: '30ml',
            imageUrl: u(`${BR}/9. Purito/TOKUPACK SET2/DETAILS/7/7.png`),
            galleryImages: [54, 66, 67, 69, 70, 71].map((n) =>
              u(`${BR}/9. Purito/TOKUPACK SET2/DETAILS/7/JP_THUMB/Copy of ${n}.png`),
            ),
            detailImages: [
              u(`${BR}/9. Purito/TOKUPACK SET2/DETAILS/7/JP_DETAILED/Copy of full (3).png`),
            ],
          },
          {
            id: '8',
            // Name / pricing from `TOKUPACK SET2/DETAILS/8/text.txt`.
            name: {
              ja: 'デイリー ソフトタッチ サンスティック',
              en: 'Daily Soft Touch Sun Stick',
              ko: '데일리 소프트터치 선스틱',
            },
            listPrice: '¥3,250',
            volume: '20g',
            imageUrl: u(`${BR}/9. Purito/TOKUPACK SET2/DETAILS/8/8.png`),
            galleryImages: [72, 73, 75].map((n) =>
              u(`${BR}/9. Purito/TOKUPACK SET2/DETAILS/8/jp_thumb/Copy of ${n}.png`),
            ),
            // The delivered jp_detailed folder is empty — no DETAILS section.
          },
        ],
      },
      {
        id: '3',
        label: 'TOKUPACK C',
        cardImageUrl: u(`${BR}/9. Purito/combo3.png`) + '?v=2',
        // Copy from `TOKUPACK SET3/TOKUPACK SET3/text (1).txt`.
        tokupack: {
          subtitle: {
            ja: '敏感肌のためのやさしい保湿ケア。',
            en: 'Gentle moisture care for sensitive skin.',
            ko: '민감성 피부를 위한 순한 보습 케어.',
          },
          imageUrl: u(`${BR}/9. Purito/combo3.png`) + '?v=2',
          items: [
            {
              ja: 'ピールショットパッド 1箱（8枚）',
              en: 'Peel Shot Pad, 1 box (8 pads)',
              ko: '필샷 패드 1박스 (8매)',
            },
            {
              ja: 'ジェントル エクスフォリエイティング フェイスクレンザー 150ml',
              en: 'Gentle Exfoliating Face Cleanser 150ml',
              ko: '젠틀 엑스폴리에이팅 페이스 클렌저 150ml',
            },
            {
              ja: 'PDRN ジェントル リファイニング トナー 200ml',
              en: 'PDRN Gentle Refining Toner 200ml',
              ko: 'PDRN 젠틀 리파이닝 토너 200ml',
            },
            {
              ja: 'カーミング ジェルクリーム 100ml',
              en: 'Calming Gel Cream 100ml',
              ko: '카밍 젤크림 100ml',
            },
          ],
          pricing: [
            { label: L_REGULAR_PRICE, value: '¥12,225' },
            { label: L_LIVE_DISCOUNT, value: '48%OFF' },
            { label: L_LIVE_PRICE, value: '¥6,333', highlight: true },
          ],
        },
        usps: [
          { imageUrl: u(`${BR}/9. Purito/TOKUPACK SET3/USP/Copy of 3.png`) },
        ],
        // Copy from `TOKUPACK SET3/DETAILS/text2.txt`.
        productsHeadline: {
          ja: 'オーツ由来成分でうるおいを与え、肌バリアをサポート。',
          en: 'Oat-derived ingredients deliver moisture and support the skin barrier.',
          ko: '귀리 유래 성분으로 촉촉함을 주고 피부 장벽을 지원.',
        },
        products: [
          {
            id: '9',
            // Name / pricing from `TOKUPACK SET3/DETAILS/9/text.txt`.
            name: {
              ja: 'オートイン ジェントル エクスフォリエイティング フェイスクレンザー',
              en: 'Oat-In Gentle Exfoliating Face Cleanser',
              ko: '오트인 젠틀 엑스폴리에이팅 페이스 클렌저',
            },
            listPrice: '¥3,250',
            volume: '150ml',
            imageUrl: u(`${BR}/9. Purito/TOKUPACK SET3/DETAILS/9/10.png`),
            galleryImages: [54, 55, 56, 57, 58, 59, 60, 61, 62, 63].map((n) =>
              u(`${BR}/9. Purito/TOKUPACK SET3/DETAILS/9/jp_thumb/Copy of ${n}.png`),
            ),
            // UUID-named avif/webp/png pages — delivered order unknown, kept sorted.
            detailImages: [
              'Copy of 5c5a076b-9ca9-4c94-88bd-98d0024ddac0.avif',
              'Copy of 6b940af1-fe64-4616-b6ad-d374b7cc6085.png',
              'Copy of 7d447a0f-16b5-4e2c-a196-baf5f41e78e3.avif',
              'Copy of 9a227838-f9f0-4d24-adb8-a210662a87df.avif',
              'Copy of 79fc8780-dc30-43f2-8617-fe3e9f935748 (1).avif',
              'Copy of 97b06e2b-0ed8-45ee-8e51-c178618a51dc.avif',
              'Copy of 531c8f77-aebb-4bd9-8e65-1508ae0f0baa.avif',
              'Copy of 912f33f3-13af-4abb-af17-a0839c67b6cf.png',
              'Copy of 31241833-577a-4ff5-b663-cbedabb53b73.avif',
              'Copy of e19d0cf6-35ff-4424-bbb3-fe97de4173bd.avif',
              'Copy of f0602f2b-6a8c-4e67-b821-24e702abe6f1 (2).webp',
            ].map((f) =>
              u(`${BR}/9. Purito/TOKUPACK SET3/DETAILS/9/jp_detailed/${f}`),
            ),
          },
          {
            id: '10',
            // Name / pricing from `TOKUPACK SET3/DETAILS/10/text.txt`.
            name: {
              ja: 'オート PDRN ジェントル リファイニング トナー',
              en: 'Oat PDRN Gentle Refining Toner',
              ko: '오트 PDRN 젠틀 리파이닝 토너',
            },
            listPrice: '¥3,200',
            volume: '200ml',
            imageUrl: u(`${BR}/9. Purito/TOKUPACK SET3/DETAILS/10/11.png`),
            galleryImages: [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53].map(
              (n) =>
                u(`${BR}/9. Purito/TOKUPACK SET3/DETAILS/10/jp_thumb/Copy of ${n}.png`),
            ),
            // UUID-named pages, sorted; " (1)" duplicates of pages already in
            // the list are skipped.
            detailImages: [
              'Copy of 0c59d300-d67f-4af4-897c-79400a00afc5.avif',
              'Copy of 55ee9573-166b-425a-bff5-61176b0400a6.avif',
              'Copy of 79fc8780-dc30-43f2-8617-fe3e9f935748 (2).avif',
              'Copy of 82b4e54e-5a97-446c-a58e-2b09b91c3e62.webp',
              'Copy of 92a03a30-e4ec-4af3-99fc-1e291a340787.webp',
              'Copy of 2773fd0c-a7c4-4cf2-81a5-dddd0baf881d.avif',
              'Copy of 29064a0f-f792-42ea-aa27-5bc3ad3bafc0.avif',
              'Copy of ad37552b-0f13-43de-a29b-5964e06dc393.avif',
              'Copy of d24d2170-075e-4a75-8201-6f16b8131b24.png',
              'Copy of f0602f2b-6a8c-4e67-b821-24e702abe6f1 (3).webp',
            ].map((f) =>
              u(`${BR}/9. Purito/TOKUPACK SET3/DETAILS/10/jp_detailed/${f}`),
            ),
          },
          {
            id: '11',
            // Name / pricing from `TOKUPACK SET3/DETAILS/11/text.txt`.
            name: {
              ja: 'オートイン カーミング ジェルクリーム',
              en: 'Oat-In Calming Gel Cream',
              ko: '오트인 카밍 젤크림',
            },
            listPrice: '¥2,900',
            volume: '100ml',
            imageUrl: u(`${BR}/9. Purito/TOKUPACK SET3/DETAILS/11/12.png`),
            galleryImages: [29, 30, 31, 32].map((n) =>
              u(`${BR}/9. Purito/TOKUPACK SET3/DETAILS/11/jp_thumb/Copy of ${n}.png`),
            ),
            detailImages: [
              u(`${BR}/9. Purito/TOKUPACK SET3/DETAILS/11/jp_detailed/Copy of 1.png`),
              u(`${BR}/9. Purito/TOKUPACK SET3/DETAILS/11/jp_detailed/Copy of 2.png`),
            ],
          },
          PURITO_PEEL_SHOT,
        ],
      },
    ],
  },
  {
    slug: 'vt-cosmetics',
    name: 'VT Cosmetics',
    logoUrl: u(`${BR}/7. VT/Copy of VT.png`),
    tagline: 'In - Vogue and Timeless',
    heroVideoUrl: '',
    heroImageUrl: '',
    // ja copy from `7. VT/text2.txt` — line breaks preserved.
    story: {
      ja: 'VTは、肌を大切にする思いと時代を超えて愛される洗練された商品でよりあなたらしい毎日を共にするブランドです。\n「肌本来の美しさを保つこと」それが私たちVTの求める「美」のあり方です。',
      en: "VT is a brand that walks with you through a daily life that is more you — with heartfelt care for the skin and refined products loved across generations.\n\"Preserving the skin's natural beauty\" — that is the form of beauty we at VT pursue.",
      ko: 'VT는 피부를 소중히 여기는 마음과 시대를 넘어 사랑받는 세련된 제품으로 더 나다운 매일을 함께하는 브랜드입니다.\n"피부 본연의 아름다움을 지키는 것" 그것이 우리 VT가 추구하는 "미"의 모습입니다.',
    },
    // Not rendered — the multi-set grid replaces the single-set section.
    tokupack: { subtitle: '', items: [] },
    usps: [],
    tokupackSets: [
      {
        id: '1',
        label: 'TOKUPACK A',
        cardImageUrl: u(`${BR}/7. VT/Copy of Copy of VT_TPSET_A_RE.jpg`),
        // Copy from `TOKUPACK SET 1/1.1 TOKUPACK SET 1/text (1).txt`.
        tokupack: {
          subtitle: {
            ja: '顔＆頭皮のリードルS Wケアセット',
            en: 'Reedle S double-care set for face & scalp',
            ko: '얼굴 & 두피 리들S W케어 세트',
          },
          imageUrl: u(
            `${BR}/7. VT/TOKUPACK SET 1/1.1 TOKUPACK SET 1/Copy of VT_TPSET_A_RE.jpg`,
          ),
          items: [
            {
              ja: 'PDRN+ リードルSブラシヘアセラム 100ml',
              en: 'PDRN+ Reedle S Brush Hair Serum 100ml',
              ko: 'PDRN+ 리들S 브러시 헤어 세럼 100ml',
            },
            {
              ja: 'リードル S100 50ml',
              en: 'Reedle S100 50ml',
              ko: '리들 S100 50ml',
            },
          ],
          pricing: [
            { label: L_REGULAR_PRICE, value: '¥6,160' },
            { label: L_LIVE_DISCOUNT, value: '25%OFF' },
            { label: L_LIVE_PRICE, value: '¥4,620', highlight: true },
          ],
        },
        usps: [
          {
            imageUrl: u(
              `${BR}/7. VT/TOKUPACK SET 1/1.1 PRODUCT USP/Copy of 20260713_TTS_POP_01-3.png`,
            ),
          },
        ],
        // Copy from `TOKUPACK SET 1/1.3 DETAILS/text.txt`.
        productsHeadline: {
          ja: '顔と頭皮を同時にケアするVTリードルS Wケアセット。潤いと健やかさを与え、毎日のスキン＆ヘアケアを簡単に。',
          en: "VT's Reedle S double-care set treats face and scalp at once. It delivers moisture and health, making daily skin & hair care simple.",
          ko: '얼굴과 두피를 동시에 케어하는 VT 리들S W케어 세트. 촉촉함과 건강함을 주어 매일의 스킨 & 헤어 케어를 간편하게.',
        },
        products: [
          VT_REEDLE_S100,
          {
            id: '2',
            // Name / pricing from `TOKUPACK SET 1/1.3 DETAILS/2/text.txt`.
            name: {
              ja: 'PDRN＋リードルショット ブラシヘアセラム',
              en: 'PDRN+ Reedle Shot Brush Hair Serum',
              ko: 'PDRN+ 리들샷 브러시 헤어 세럼',
            },
            listPrice: '¥2,640',
            volume: '100ml',
            imageUrl: u(
              `${BR}/7. VT/TOKUPACK SET 1/1.3 DETAILS/2/PDRN+-REEDLE-S-BRUSH-HAIR-SERUM_Sub.jpg`,
            ),
            galleryImages: [
              u(
                `${BR}/7. VT/TOKUPACK SET 1/1.3 DETAILS/2/JP_Thumb/Copy of PDRN+-REEDLE-S-BRUSH-HAIR-SERUM_Sub.jpg`,
              ),
            ],
            // `Copy of 18.png` duplicates `Copy of 18.jpg` — jpg sequence used.
            detailImages: seq(
              24,
              (i) =>
                `${BR}/7. VT/TOKUPACK SET 1/1.3 DETAILS/2/JP_Detailed/Copy of ${i}.jpg`,
            ),
          },
        ],
      },
      {
        id: '2',
        label: 'TOKUPACK B',
        cardImageUrl: u(`${BR}/7. VT/Copy of Copy of VT_TPSET_B_RE.jpg`),
        // Copy from `TOKUPACK SET 2/2.1 TOKUPACK SET/text (1).txt`.
        tokupack: {
          subtitle: {
            ja: 'VTベストセラーセット',
            en: 'VT best-seller set',
            ko: 'VT 베스트셀러 세트',
          },
          imageUrl: u(
            `${BR}/7. VT/TOKUPACK SET 2/2.1 TOKUPACK SET/Copy of VT_TPSET_B_RE.jpg`,
          ),
          items: [
            {
              ja: 'リドルショット100',
              en: 'Reedle Shot 100',
              ko: '리들샷 100',
            },
            {
              ja: 'PDRN+カプセルクリーム',
              en: 'PDRN+ Capsule Cream',
              ko: 'PDRN+ 캡슐 크림',
            },
          ],
          pricing: [
            { label: L_REGULAR_PRICE, value: '¥6,160' },
            { label: L_LIVE_DISCOUNT, value: '25%OFF' },
            { label: L_LIVE_PRICE, value: '¥4,620', highlight: true },
          ],
        },
        usps: [
          {
            imageUrl: u(
              `${BR}/7. VT/TOKUPACK SET 2/2.2 USP/Copy of 20260713_TTS_POP_02-3.png`,
            ),
          },
        ],
        // Copy from `TOKUPACK SET 2/2.3 DETAILS/text.txt`.
        productsHeadline: {
          ja: 'このセットで、肌のキメと潤いを整え、毎日のスキンケアと集中保湿を手軽に両立できます。',
          en: 'This set refines skin texture and moisture, making daily skincare and focused hydration easy to combine.',
          ko: '이 세트로 피부결과 수분을 정돈해 매일의 스킨케어와 집중 보습을 손쉽게 병행할 수 있습니다.',
        },
        products: [
          VT_REEDLE_S100,
          {
            id: '3',
            // Name / pricing from `TOKUPACK SET 2/2.3 DETAILS/3/text.txt`.
            name: {
              ja: 'PDRN＋カプセルクリーム 100',
              en: 'PDRN+ Capsule Cream 100',
              ko: 'PDRN+ 캡슐 크림 100',
            },
            listPrice: '¥2,640',
            volume: '50ml',
            imageUrl: u(
              `${BR}/7. VT/TOKUPACK SET 2/2.3 DETAILS/3/PDRN+-CAPSULE-CREAM_Sub.jpg`,
            ),
            galleryImages: [
              u(
                `${BR}/7. VT/TOKUPACK SET 2/2.3 DETAILS/3/JP_Thumb/PDRN+-CAPSULE-CREAM_Sub.jpg`,
              ),
            ],
            detailImages: seq(
              13,
              (i) =>
                `${BR}/7. VT/TOKUPACK SET 2/2.3 DETAILS/3/JP_Detailed/Copy of ${i}.jpg`,
            ),
          },
        ],
      },
      {
        id: '3',
        label: 'TOKUPACK C',
        cardImageUrl: u(`${BR}/7. VT/Copy of Copy of VT_TPSET_C_RE.jpg`),
        // Copy from `TOKUPACK SET 3/3.1 TOKUPACK SET/text (1).txt`.
        tokupack: {
          subtitle: {
            ja: 'ハリと潤いのある弾力肌セット',
            en: 'Firm & hydrated bouncy-skin set',
            ko: '탄력과 촉촉함의 탱탱 피부 세트',
          },
          imageUrl: u(
            `${BR}/7. VT/TOKUPACK SET 3/3.1 TOKUPACK SET/Copy of VT_TPSET_C_RE.jpg`,
          ),
          items: [
            {
              ja: 'レチナール ペプチド スポットクリーム',
              en: 'Retinal Peptide Spot Cream',
              ko: '레티날 펩타이드 스팟 크림',
            },
            {
              ja: 'レチナール ペプチド デイリーマスク（25枚)',
              en: 'Retinal Peptide Daily Mask (25 sheets)',
              ko: '레티날 펩타이드 데일리 마스크 (25매)',
            },
          ],
          pricing: [
            { label: L_REGULAR_PRICE, value: '¥4,840' },
            { label: L_LIVE_DISCOUNT, value: '25%OFF' },
            { label: L_LIVE_PRICE, value: '¥3,630', highlight: true },
          ],
        },
        usps: [
          {
            imageUrl: u(
              `${BR}/7. VT/TOKUPACK SET 3/3.2 USP/Copy of 20260713_TTS_POP_03-3.png`,
            ),
          },
        ],
        // Copy from `TOKUPACK SET 3/3.3 DETAILS/text (1).txt`.
        productsHeadline: {
          ja: '肌のキメを整え、ハリと潤いを与える集中ケアセット',
          en: 'An intensive-care set that refines skin texture and delivers firmness and moisture',
          ko: '피부결을 정돈하고 탄력과 수분을 주는 집중 케어 세트',
        },
        products: [
          {
            id: '4',
            // Name / pricing from `TOKUPACK SET 3/3.3 DETAILS/4/text.txt`.
            name: {
              ja: 'レチナール ペプチド スポットクリーム',
              en: 'Retinal Peptide Spot Cream',
              ko: '레티날 펩타이드 스팟 크림',
            },
            listPrice: '¥2,200',
            volume: '15ml',
            imageUrl: u(
              `${BR}/7. VT/TOKUPACK SET 3/3.3 DETAILS/4/RETINAL-PEPTIDE-SPOT-CREAM_Sub.jpg`,
            ),
            galleryImages: [
              u(
                `${BR}/7. VT/TOKUPACK SET 3/3.3 DETAILS/4/JP_Thumb/RETINAL-PEPTIDE-SPOT-CREAM_Sub.jpg`,
              ),
            ],
            // Pages 3 / 5 were delivered as GIFs.
            detailImages: seq(
              6,
              (i) =>
                `${BR}/7. VT/TOKUPACK SET 3/3.3 DETAILS/4/JP_Detailed/Copy of ${i}.${[3, 5].includes(i) ? 'gif' : 'jpg'}`,
            ),
          },
          {
            id: '5',
            // Name / pricing from `TOKUPACK SET 3/3.3 DETAILS/5/text.txt`.
            name: {
              ja: 'レチナール ペプチド デイリーマスク（25枚)',
              en: 'Retinal Peptide Daily Mask (25 sheets)',
              ko: '레티날 펩타이드 데일리 마스크 (25매)',
            },
            listPrice: '¥2,640',
            volume: '360g(25ea)',
            imageUrl: u(
              `${BR}/7. VT/TOKUPACK SET 3/3.3 DETAILS/5/RETINAL-PEPTIDE-DAILY-MASK_Sub.jpg`,
            ),
            galleryImages: [
              u(
                `${BR}/7. VT/TOKUPACK SET 3/3.3 DETAILS/5/JP_Thumb/RETINAL-PEPTIDE-DAILY-MASK_Sub.jpg`,
              ),
            ],
            // Pages 3 / 5 / 7 were delivered as GIFs.
            detailImages: seq(
              7,
              (i) =>
                `${BR}/7. VT/TOKUPACK SET 3/3.3 DETAILS/5/JP_Detailed/Copy of ${i}.${[3, 5, 7].includes(i) ? 'gif' : 'jpg'}`,
            ),
          },
        ],
      },
    ],
  },
  {
    slug: 'beplain',
    name: 'Beplain',
    logoUrl: u(`${BR}/5. Beplain/Copy of Beplain.png`),
    tagline: 'Enjoy plain skin, beplain',
    // ja copy from `5. Beplain/text2.txt` — line breaks preserved.
    story: {
      ja: '毎日安心してお手入れできるよう自然由来の原料を厳選し、負担の少ないマイルドな処方にこだわった商品を展開。\n高い効果と低刺激性を両立し、敏感肌の方からあらゆる世代の日常に心地よく馴染みます。地球にもやさしい製品づくりで、健やかな素肌を保つお手伝いをします。',
      en: 'We carefully select naturally derived ingredients and insist on mild, low-burden formulas you can rely on every day.\nCombining high efficacy with low irritation, our products fit comfortably into the daily lives of sensitive skin and every generation. Through earth-friendly product making, we help you keep your bare skin healthy.',
      ko: '매일 안심하고 관리할 수 있도록 자연 유래 원료를 엄선하고, 부담이 적은 순한 처방을 고집한 제품을 선보입니다.\n높은 효과와 저자극을 모두 갖춰 민감성 피부부터 모든 세대의 일상에 편안하게 스며듭니다. 지구에도 친화적인 제품 만들기로 건강한 맨살을 지키는 데 도움을 드립니다.',
    },
    // ja copy from `TOKUPACK SET/text (1).txt`.
    tokupack: {
      subtitle: {
        ja: 'ビープレイン ディープクレンズ 3ステップセット',
        en: 'Beplain Deep Cleanse 3-Step Set',
        ko: '비플레인 딥 클렌즈 3단계 세트',
      },
      imageUrl: u(`${BR}/5. Beplain/TOKUPACK SET/TokuPatkuサムネ_logo.png`),
      items: [
        {
          ja: '緑豆洗顔フォーム 160ml',
          en: 'Mung Bean Cleansing Foam 160ml',
          ko: '녹두 클렌징폼 160ml',
        },
        { ja: 'ミルクバーム 100ml', en: 'Milk Balm 100ml', ko: '밀크 밤 100ml' },
        { ja: 'クレイパック 120ml', en: 'Clay Pack 120ml', ko: '클레이 팩 120ml' },
      ],
      pricing: [
        { label: L_REGULAR_PRICE, value: '¥7,240' },
        { label: L_LIVE_DISCOUNT, value: '20%OFF' },
        { label: L_LIVE_PRICE, value: '¥5,792', highlight: true },
      ],
    },
    // ja copy from `DETAILS/text.txt`.
    productsHeadline: {
      ja: 'ビープレインの3ステップセットで、クレンジング、洗顔、クレイマスクを使って毛穴をすっきり整え、肌のトーンを明るく導きます。',
      en: "Beplain's 3-step set — cleansing, foam wash and clay mask — clears and refines pores while brightening skin tone.",
      ko: '비플레인 3단계 세트로 클렌징, 세안, 클레이 마스크를 통해 모공을 깨끗하게 정돈하고 피부 톤을 환하게 가꿔 줍니다.',
    },
    // The delivered USP is a PDF — pages pre-rendered to `USP_page-<n>.png`.
    usps: [
      { imageUrl: u(`${BR}/5. Beplain/PRODUCT USP/USP_page-1.png`) },
    ],
    products: [
      {
        id: '1',
        // Name / pricing from `DETAILS/1/text.txt`.
        name: {
          ja: '緑豆洗顔フォーム',
          en: 'Mung Bean Cleansing Foam',
          ko: '녹두 클렌징폼',
        },
        listPrice: '¥2,380',
        volume: '160ml',
        imageUrl: u(
          `${BR}/5. Beplain/DETAILS/1/1.png`,
        ),
        galleryImages: [
          'Copy of 연출컷_녹두 약산성 클렌징폼_FHS_05.jpg의 사본.jpg',
          'Copy of 연출컷_녹두 약산성 클렌징폼_FHS_160ml_00.jpg의 사본.jpg',
          'Copy of 연출컷_녹두 약산성 클렌징폼_FHS_160ml_01.jpg의 사본.jpg',
          'Copy of 연출컷_녹두 약산성 클렌징폼_FHS_160ml_02.jpg의 사본.jpg',
          'Copy of 연출컷_녹두 약산성 클렌징폼_FHS_160ml_03.jpg의 사본.jpg',
        ].map((f) => u(`${BR}/5. Beplain/DETAILS/1/JP_Thumb/${f}`)),
        detailImages: [
          'Copy of jp_mb-foam_02.jpg의 사본.jpg',
          'Copy of jp_mb-foam_03.jpg의 사본.jpg',
          'Copy of jp_mb-foam_04.jpg의 사본.jpg',
          'Copy of jp_mb-foam_05.jpg의 사본.jpg',
          'Copy of jp_mb-foam_06.jpg의 사본.jpg',
          'Copy of jp_mb-foam_07_1.jpg의 사본.jpg',
          'Copy of jp_mb-foam_07_2.jpg의 사본.jpg',
        ].map((f) => u(`${BR}/5. Beplain/DETAILS/1/JP_Detailed/${f}`)),
      },
      {
        id: '2',
        // Name / pricing from `DETAILS/2/text.txt`.
        name: { ja: 'ミルクバーム', en: 'Milk Balm', ko: '밀크 밤' },
        listPrice: '¥2,480',
        volume: '100ml',
        imageUrl: u(
          `${BR}/5. Beplain/DETAILS/2/2.png`,
        ),
        galleryImages: seq(
          8,
          (i) =>
            `${BR}/5. Beplain/DETAILS/2/JP_Thumb/Copy of 연출컷_녹두 모공 클렌징 밀크 밤 JP_${pad2(i)}.jpg의 사본.jpg`,
        ),
        detailImages: [
          'Copy of 01.gif의 사본.gif',
          'Copy of 02.gif의 사본.gif',
          'Copy of 03.gif의 사본.gif',
          'Copy of 04.jpg의 사본.jpg',
          'Copy of 05.gif의 사본.gif',
          'Copy of 06.jpg의 사본.jpg',
          'Copy of 07.gif의 사본.gif',
          'Copy of 07.jpg의 사본.jpg',
          'Copy of 08.jpg의 사본.jpg',
          'Copy of 09.jpg의 사본.jpg',
          'Copy of 13.gif의 사본.gif',
          'Copy of 13.jpg의 사본.jpg',
          'Copy of 14.jpg의 사본.jpg',
        ].map((f) => u(`${BR}/5. Beplain/DETAILS/2/JP_Detailed/${f}`)),
      },
      {
        id: '3',
        // Name / pricing from `DETAILS/3/text.txt`.
        name: { ja: 'クレイパック', en: 'Clay Pack', ko: '클레이 팩' },
        listPrice: '¥2,380',
        volume: '120ml',
        imageUrl: u(
          `${BR}/5. Beplain/DETAILS/3/3.png`,
        ),
        galleryImages: [
          'Copy of 연출제형컷_녹두 모공 클레이팩_FHS_09.jpg의 사본.jpg',
          ...Array.from(
            { length: 7 },
            (_, k) =>
              `Copy of 연출컷_녹두 모공 클레이팩_FHS_${pad2(k + 1)}.jpg의 사본.jpg`,
          ),
        ].map((f) => u(`${BR}/5. Beplain/DETAILS/3/JP_Thumb/${f}`)),
        detailImages: seq(
          3,
          (i) =>
            `${BR}/5. Beplain/DETAILS/3/JP_Detailed/Copy of jp_mb_claymask_750px_${pad2(i)}.jpg의 사본.jpg`,
        ),
      },
    ],
  },
  {
    slug: 'dr-deep',
    name: 'Dr.Deep',
    logoUrl: u(`${BR}/4. Dr.Deep/Copy of Dr.Deep.png`),
    tagline: "Designing today's depth for the skin's tomorrow",
    // ja copy from `4. Dr.Deep/text2.txt` — paragraph breaks preserved.
    story: {
      ja: 'Dr.deepは、韓国の薬局で培われた信頼と実績をもつK-Pharmacy発のダーマスキンケアブランドです。\n\n独自成分「Hyper-Mineral™ Water」に着目し、肌トラブルの根本に寄り添う革新的なスキンソリューションを提供します。\n\n科学的なアプローチによる確かな効果と、心まで癒す感性的なケアを通じて、肌と心の美しいバランスを追求します。',
      en: 'Dr.deep is a K-Pharmacy derma skincare brand built on the trust and track record of Korean pharmacies.\n\nFocusing on its proprietary "Hyper-Mineral™ Water", it delivers innovative skin solutions that address skin concerns at their root.\n\nThrough proven, science-based results and sensorial care that soothes the mind, it pursues a beautiful balance between skin and spirit.',
      ko: 'Dr.deep은 한국 약국에서 쌓아온 신뢰와 실적을 지닌 K-파머시 더마 스킨케어 브랜드입니다.\n\n독자 성분 「Hyper-Mineral™ Water」에 주목해 피부 고민의 근본에 다가서는 혁신적인 스킨 솔루션을 제공합니다.\n\n과학적인 접근을 통한 확실한 효과와 마음까지 어루만지는 감성 케어로 피부와 마음의 아름다운 균형을 추구합니다.',
    },
    // ja copy from `TOKUPACK SET/text (1).txt`.
    tokupack: {
      subtitle: {
        ja: 'Dr.DEEP 人気5点セット',
        en: 'Dr.DEEP Best-Sellers 5-Piece Set',
        ko: 'Dr.DEEP 인기 5종 세트',
      },
      imageUrl: u(`${BR}/4. Dr.Deep/TOKUPACK SET/MAIN THUMB.jpg`),
      items: [
        {
          ja: 'クリニカル テクスチャー ターンオーバー スポットクリーム',
          en: 'Clinical Texture Turnover Spot Cream',
          ko: '클리니컬 텍스처 턴오버 스팟 크림',
        },
        {
          ja: 'ミネラル フリーピーリング グローショット 1500',
          en: 'Mineral Free-Peeling Glow Shot 1500',
          ko: '미네랄 프리필링 글로우샷 1500',
        },
        {
          ja: 'ミネラルPDRN™ 52000 リベリア ファーミング ラディアンス クリーム',
          en: 'Mineral PDRN™ 52000 Riberia Firming Radiance Cream',
          ko: '미네랄 PDRN™ 52000 리베리아 퍼밍 래디언스 크림',
        },
        {
          ja: 'ブルーフィル PDLLA ペプチド ボリュームブースターショット',
          en: 'Blue Fill PDLLA Peptide Volume Booster Shot',
          ko: '블루필 PDLLA 펩타이드 볼륨 부스터샷',
        },
        {
          ja: 'ミネラル パンテノール アトクリーム',
          en: 'Mineral Panthenol Ato Cream',
          ko: '미네랄 판테놀 아토 크림',
        },
      ],
      pricing: [
        { label: L_REGULAR_PRICE, value: '¥29,500' },
        { label: L_LIVE_DISCOUNT, value: '50%OFF' },
        { label: L_LIVE_PRICE, value: '¥14,750', highlight: true },
      ],
    },
    // ja copy from `Details/text.txt`.
    productsHeadline: {
      ja: 'Dr.deepの人気5アイテムを一度に体験できる、スペシャルギフトセット。',
      en: "A special gift set to experience Dr.deep's five most-loved items at once.",
      ko: 'Dr.deep의 인기 5가지 아이템을 한 번에 경험할 수 있는 스페셜 기프트 세트.',
    },
    usps: [
      {
        imageUrl: u(
          `${BR}/4. Dr.Deep/PRODUCT USP/KakaoTalk_Photo_2026-07-20-14-53-08.png`,
        ),
      },
    ],
    products: [
      {
        id: '1',
        // Name / pricing from `Details/1/text.txt`.
        name: {
          ja: 'ミネラル パンテノール アトクリーム',
          en: 'Mineral Panthenol Ato Cream',
          ko: '미네랄 판테놀 아토 크림',
        },
        listPrice: '¥4,400',
        volume: '80ml',
        imageUrl: u(`${BR}/4. Dr.Deep/Details/1/Copy of 1.jpg`),
        galleryImages: [u(`${BR}/4. Dr.Deep/Details/1/JP_Thumb/Copy of 1.jpg`)],
        detailImages: seq(
          19,
          (i) => `${BR}/4. Dr.Deep/Details/1/JP_Detailed/Copy of ${i}.avif`,
        ),
      },
      {
        id: '2',
        // Name / pricing from `Details/2/text.txt`.
        name: {
          ja: 'ミネラル フリーピーリング グローショット 1500',
          en: 'Mineral Free-Peeling Glow Shot 1500',
          ko: '미네랄 프리필링 글로우샷 1500',
        },
        listPrice: '¥6,500',
        volume: '30ml',
        imageUrl: u(`${BR}/4. Dr.Deep/Details/2/Copy of 2.jpg`),
        galleryImages: [u(`${BR}/4. Dr.Deep/Details/2/JP_Thumb/Copy of 2.jpg`)],
        detailImages: seq(
          18,
          (i) =>
            `${BR}/4. Dr.Deep/Details/2/JP_Detailed/Copy of glowshot${i}.avif`,
        ),
      },
      {
        id: '3',
        // Name / pricing from `Details/3/text.txt`.
        name: {
          ja: 'クリニカル テクスチャー ターンオーバー スポットクリーム',
          en: 'Clinical Texture Turnover Spot Cream',
          ko: '클리니컬 텍스처 턴오버 스팟 크림',
        },
        listPrice: '¥5,600',
        volume: '40ml',
        imageUrl: u(`${BR}/4. Dr.Deep/Details/3/Copy of 3.jpg`),
        galleryImages: [u(`${BR}/4. Dr.Deep/Details/3/JP_Thumb/Copy of 3.jpg`)],
        detailImages: [
          'Copy of 260414_TTcream아트보드 1.jpg',
          'Copy of 260414_TTcream아트보드 2.jpg',
          'Copy of 260414_TTcream아트보드 3.jpg',
          'Copy of 260414_TTcream아트보드 4_1.jpg',
          'Copy of 260414_TTcream아트보드 4_2.jpg',
          'Copy of 260414_TTcream아트보드 5.jpg',
          'Copy of 260414_TTcream아트보드 6.jpg',
          'Copy of 260414_TTcream아트보드 7.jpg',
          'Copy of 260414_TTcream아트보드 8.jpg',
          'Copy of 260414_TTcream아트보드 9.jpg',
          'Copy of 260414_TTcream아트보드 10.jpg',
          'Copy of 260414_TTcream아트보드 11.jpg',
          'Copy of 260414_TTcream아트보드 12.jpg',
          'Copy of 260414_TTcream아트보드 13.jpg',
          'Copy of 260414_TTcream아트보드 14.jpg',
        ].map((f) => u(`${BR}/4. Dr.Deep/Details/3/JP_Detailed/${f}`)),
      },
      {
        id: '4',
        // Name / pricing from `Details/4/text.txt`.
        name: {
          ja: 'ブルーフィル PDLLA ペプチド ボリュームブースターショット',
          en: 'Blue Fill PDLLA Peptide Volume Booster Shot',
          ko: '블루필 PDLLA 펩타이드 볼륨 부스터샷',
        },
        listPrice: '¥7,400',
        volume: '10ml',
        imageUrl: u(`${BR}/4. Dr.Deep/Details/4/Copy of 4.jpg`),
        galleryImages: [u(`${BR}/4. Dr.Deep/Details/4/JP_Thumb/Copy of 4.jpg`)],
        detailImages: seq(
          4,
          (i) => `${BR}/4. Dr.Deep/Details/4/JP_Detailed/Copy of _${i}.jpg`,
        ),
      },
      {
        id: '5',
        // Name / pricing from `Details/5/text.txt`.
        name: {
          ja: 'ミネラルPDRN™ 52000 リベリア ファーミング ラディアンス クリーム',
          en: 'Mineral PDRN™ 52000 Riberia Firming Radiance Cream',
          ko: '미네랄 PDRN™ 52000 리베리아 퍼밍 래디언스 크림',
        },
        listPrice: '¥5,600',
        volume: '30ml',
        imageUrl: u(`${BR}/4. Dr.Deep/Details/5/Copy of 5_.jpg`),
        galleryImages: [u(`${BR}/4. Dr.Deep/Details/5/JP_Thumb/Copy of 5_.jpg`)],
        detailImages: [
          ...seq(
            6,
            (i) =>
              `${BR}/4. Dr.Deep/Details/5/JP_Detailed/Copy of 미네랄피디알엔_상세_1_${pad2(i)}.jpg`,
          ),
          ...seq(
            4,
            (i) =>
              `${BR}/4. Dr.Deep/Details/5/JP_Detailed/Copy of 미네랄피디알엔_상세_2_${pad2(i)}.jpg`,
          ),
        ],
      },
    ],
  },
  {
    slug: 'lubylab',
    name: 'LUBYLAB',
    logoUrl: u(`${BR}/2. LubyLab/Copy of Lubylab.png`),
    tagline: 'The Home-Surgical Approach',
    // ja copy from `2. LubyLab/text2.txt`.
    story: {
      ja: 'LUBYLABは、「家で、クリニックの効果を」を掲げる韓国発の高機能ダーマコスメブランドです。高濃度・高機能のエリクサーラインと、その後の肌を鎮めるリカバリーラインの2ラインで、"効かせて、鎮める"ホームクリニック体験を提案します。刺激までを設計に含んだ本格処方で、施術後のようなケアをご自宅で実現します。',
      en: 'LUBYLAB is a high-performance Korean derma-cosmetic brand with the motto "clinic-level results, at home." With two lines — the high-concentration, high-performance Elixir line and the Recovery line that calms the skin afterwards — it proposes a "treat, then soothe" home-clinic experience. Serious formulas engineered with even the stimulation in mind bring post-procedure-level care to your home.',
      ko: 'LUBYLAB은 "집에서, 클리닉의 효과를"을 내세우는 한국의 고기능 더마 코스메틱 브랜드입니다. 고농도·고기능 엘릭서 라인과 이후 피부를 진정시키는 리커버리 라인, 두 가지 라인으로 "효과를 주고, 진정시키는" 홈 클리닉 경험을 제안합니다. 자극까지 설계에 담은 본격 처방으로 시술 후와 같은 케어를 집에서 실현합니다.',
    },
    // ja copy from `TOKUPACK SET/text (1).txt`.
    tokupack: {
      subtitle: {
        ja: 'ルビーラボ 施術代替セット',
        en: 'LUBYLAB Procedure-Alternative Set',
        ko: '루비랩 시술 대체 세트',
      },
      imageUrl: u(`${BR}/2. LubyLab/TOKUPACK SET/MAIN THUMB.jpg`),
      items: [
        {
          ja: 'スカルプトマトリックス アンプル 2 mL × 2 EA',
          en: 'Sculpt Matrix Ampoule 2 mL × 2 EA',
          ko: '스컬프트 매트릭스 앰플 2 mL × 2 EA',
        },
        {
          ja: 'エヌエーディープラス ジーエフ ブースタークリーム 15 mL / 0.50 fl. Oz',
          en: 'NAD+ GF Booster Cream 15 mL / 0.50 fl. oz',
          ko: 'NAD+ GF 부스터 크림 15 mL / 0.50 fl. oz',
        },
        {
          ja: 'ハイパー ルビスピショット第4世代スピキュール',
          en: 'Hyper Lubyspishot 4th-Generation Spicule',
          ko: '하이퍼 루비스피샷 4세대 스피큘',
        },
      ],
      pricing: [
        { label: L_REGULAR_PRICE, value: '¥19,800' },
        { label: L_LIVE_DISCOUNT, value: '55%OFF' },
        { label: L_LIVE_PRICE, value: '¥8,910', highlight: true },
      ],
    },
    // ja copy from `Details/text.txt`.
    productsHeadline: {
      ja: 'ホームクリニックを叶える3つのキーアイテム',
      en: 'Three key items that make the home clinic real',
      ko: '홈 클리닉을 완성하는 3가지 키 아이템',
    },
    usps: [
      {
        imageUrl: u(
          `${BR}/2. LubyLab/PRODUCT USP/LUBYLAB_TokuPack_USP_A4_JP_CMYK_print_page-0001.jpg`,
        ),
      },
    ],
    products: [
      {
        id: '1',
        // Name / pricing from `Details/1/text.txt`.
        name: {
          ja: 'スカルプ・マトリックス・アンプル',
          en: 'Sculpt Matrix Ampoule',
          ko: '스컬프트 매트릭스 앰플',
        },
        listPrice: '¥6,600',
        volume: '2ml x 2ea',
        imageUrl: u(`${BR}/2. LubyLab/Details/1/Copy of 1.jpg`),
        galleryImages: [u(`${BR}/2. LubyLab/Details/1/JP_Thumb/Copy of 1.jpg`)],
        detailImages: [
          ...seq(
            13,
            (i) =>
              `${BR}/2. LubyLab/Details/1/JP_Detailed/Copy of 스컬프-매트릭스-앰플1_문안-수정_${pad2(i)}.jpg`,
          ),
          ...seq(
            5,
            (i) =>
              `${BR}/2. LubyLab/Details/1/JP_Detailed/Copy of 스컬프-매트릭스-앰플2_문안-수정_${pad2(i)}.jpg`,
          ),
        ],
      },
      {
        id: '2',
        // Name / pricing from `Details/2/text.txt`.
        name: {
          ja: 'NAD+ GF ブースタークリーム',
          en: 'NAD+ GF Booster Cream',
          ko: 'NAD+ GF 부스터 크림',
        },
        listPrice: '¥6,600',
        volume: '15ml',
        imageUrl: u(`${BR}/2. LubyLab/Details/2/Copy of 2.jpg`),
        galleryImages: [u(`${BR}/2. LubyLab/Details/2/JP_Thumb/Copy of 2.jpg`)],
        detailImages: [
          ...seq(
            12,
            (i) =>
              `${BR}/2. LubyLab/Details/2/JP_Detailed/Copy of [Abbr.]-LUBYLAB_NAD+-GF-부스터-크림_detail-page_F1_${pad2(i)}.jpg`,
          ),
          ...seq(
            5,
            (i) =>
              `${BR}/2. LubyLab/Details/2/JP_Detailed/Copy of [Abbr.]-LUBYLAB_NAD+-GF-부스터-크림_detail-page_F2_${pad2(i)}.jpg`,
          ),
        ],
      },
      {
        id: '3',
        // Name / pricing from `Details/3/text.txt`.
        name: {
          ja: 'ハイパー・ルビスピショット',
          en: 'Hyper Lubyspishot',
          ko: '하이퍼 루비스피샷',
        },
        listPrice: '¥6,600',
        volume: '3mg x 4ea',
        imageUrl: u(`${BR}/2. LubyLab/Details/3/Copy of 3.jpg`),
        galleryImages: [u(`${BR}/2. LubyLab/Details/3/JP_Thumb/Copy of 3.jpg`)],
        detailImages: [
          ...seq(
            12,
            (i) =>
              `${BR}/2. LubyLab/Details/3/JP_Detailed/Copy of Lubyspishot_${pad2(i)}.jpg`,
          ),
          u(`${BR}/2. LubyLab/Details/3/JP_Detailed/Copy of Lubyspishot_13.png`),
        ],
      },
    ],
  },
  {
    slug: 'dailyweekly',
    name: 'Daily Weekly',
    logoUrl: u(`${BR}/3. Daily Weekly/Copy of DailyWeekly.png`),
    tagline: 'Daily Delight, Weekly Wonders',
    heroVideoUrl: '',
    heroImageUrl: '',
    // ja copy from `3. Daily Weekly/text2.txt` — line breaks preserved.
    story: {
      ja: '肌温度と水分バランスの、新しい基準。DAILY WEEKLY\nほてった肌のための、低刺激クーリングスキンケア\nメントールフリー＆アルコールフリー — 刺激なく、心地よく、長く続く清涼感',
      en: 'A new standard for skin temperature and moisture balance. DAILY WEEKLY\nGentle cooling skincare for overheated skin\nMenthol-free & alcohol-free — a comfortable, long-lasting cool without irritation',
      ko: '피부 온도와 수분 밸런스의 새로운 기준. DAILY WEEKLY\n달아오른 피부를 위한 저자극 쿨링 스킨케어\n멘톨 프리 & 알코올 프리 — 자극 없이 기분 좋게 오래가는 청량감',
    },
    // ja copy from `TOKUPACK SET/text (1).txt`.
    tokupack: {
      subtitle: {
        ja: 'クーリング鎮静セット',
        en: 'Cooling & Soothing Set',
        ko: '쿨링 진정 세트',
      },
      imageUrl: u(`${BR}/3. Daily Weekly/TOKUPACK SET/MAIN THUMB.png`),
      items: [
        {
          ja: 'クーラスティング ユア ウェルカーム！ アイスパッド',
          en: "Coolasting You're Welcalm! Ice Pad",
          ko: '쿨라스팅 유어 웰캄! 아이스 패드',
        },
        {
          ja: 'クーラスティング ブルーウォーター ドリズル！ クリーム',
          en: 'Coolasting Blue Water Drizzle! Cream',
          ko: '쿨라스팅 블루워터 드리즐! 크림',
        },
        {
          ja: 'クーラスティング ウォーター ブロックバスター！ サンセラム',
          en: 'Coolasting Water Blockbuster! Sun Serum',
          ko: '쿨라스팅 워터 블록버스터! 선세럼',
        },
        {
          ja: 'Gift: クーラスティング限定保冷バッグ（3,520円相当）を追加プレゼント！',
          en: 'Gift: a limited Coolasting cooler bag (worth ¥3,520) as an extra present!',
          ko: 'Gift: 쿨라스팅 한정 보냉백(3,520엔 상당)을 추가 증정!',
        },
      ],
      pricing: [
        { label: L_REGULAR_PRICE, value: '¥10,175' },
        { label: L_LIVE_DISCOUNT, value: '40%OFF' },
        { label: L_LIVE_PRICE, value: '¥6,105', highlight: true },
      ],
    },
    // ja copy from `Details/text.txt`.
    productsHeadline: {
      ja: '瞬間クールダウン、うるおいキープ。夏の肌を守る3ステップクーリングケア。',
      en: 'Instant cool-down, lasting hydration. A 3-step cooling routine that protects summer skin.',
      ko: '순간 쿨다운, 촉촉함은 그대로. 여름 피부를 지키는 3단계 쿨링 케어.',
    },
    usps: [
      {
        imageUrl: u(`${BR}/3. Daily Weekly/PRODUCT USP/일본소싱행사_A4_최종.jpg`),
      },
    ],
    products: [
      {
        id: '1',
        // Name / pricing from `Details/1/text.txt`.
        name: {
          ja: 'クーラスティング ユア ウェルカーム！ アイスパッド',
          en: "Coolasting You're Welcalm! Ice Pad",
          ko: '쿨라스팅 유어 웰캄! 아이스 패드',
        },
        listPrice: '¥3,630',
        volume: '70pads/160ml',
        // NB: double space in the delivered file name.
        imageUrl: u(`${BR}/3. Daily Weekly/Details/1/Copy of  1.png`),
        detailImages: seq(
          5,
          (i) => `${BR}/3. Daily Weekly/Details/1/JP_Detailed/Copy of pad.${i}.jpg`,
        ),
      },
      {
        id: '2',
        // Name / pricing from `Details/2/text.txt`.
        name: {
          ja: 'クーラスティング ブルーウォーター ドリズル！ クリーム',
          en: 'Coolasting Blue Water Drizzle! Cream',
          ko: '쿨라스팅 블루워터 드리즐! 크림',
        },
        listPrice: '¥3,685',
        volume: '70ml',
        imageUrl: u(`${BR}/3. Daily Weekly/Details/2/Copy of 2.png`),
        detailImages: seq(
          6,
          (i) => `${BR}/3. Daily Weekly/Details/2/JP_Detailed/Copy of cream.${i}.jpg`,
        ),
      },
      {
        id: '3',
        // Name / pricing from `Details/3/text.txt`.
        name: {
          ja: 'クーラスティング ウォーター ブロックバスター！ サンセラム',
          en: 'Coolasting Water Blockbuster! Sun Serum',
          ko: '쿨라스팅 워터 블록버스터! 선세럼',
        },
        listPrice: '¥2,860',
        volume: '50ml',
        imageUrl: u(`${BR}/3. Daily Weekly/Details/3/Copy of 3.png`),
        detailImages: seq(
          5,
          (i) =>
            `${BR}/3. Daily Weekly/Details/3/JP_Detailed/Copy of sunserum.${i}.jpg`,
        ),
      },
    ],
  },
  {
    slug: 'babaco',
    name: 'Babaco',
    logoUrl: u(`${BR}/6. Babaco/Copy of Babaco.png`),
    tagline: 'Beauty begins with real care.',
    heroVideoUrl: '',
    heroImageUrl: '',
    // ja copy from `6. Babaco/text2.txt` — line breaks preserved.
    story: {
      ja: '肌への真摯な想いが、本当の美しさを育てる。\n（Beauty begins with real care.）\n\nBabacoは、美しさを偽らない。\n\n誠実な時間を重ねて生まれる、ありのままの美しさを届けます。',
      en: 'Sincere care for the skin nurtures true beauty.\n(Beauty begins with real care.)\n\nBabaco never fakes beauty.\n\nWe deliver beauty as it is — born of honest time and devotion.',
      ko: '피부를 향한 진심이 진짜 아름다움을 키웁니다.\n(Beauty begins with real care.)\n\nBabaco는 아름다움을 꾸며내지 않습니다.\n\n정직한 시간이 쌓여 태어나는, 있는 그대로의 아름다움을 전합니다.',
    },
    // ja copy from `TOKUPACK SET/text (1).txt`.
    tokupack: {
      subtitle: {
        ja: 'ババコ デイリープロテクトケアセット',
        en: 'Babaco Daily Protect Care Set',
        ko: '바바코 데일리 프로텍트 케어 세트',
      },
      imageUrl: u(`${BR}/6. Babaco/TOKUPACK SET/1.썸네일.jpg`),
      items: [
        {
          ja: 'オールインワン水光サンクリーム 50ml SPF50+ PA++++',
          en: 'All-in-One Glow Sun Cream 50ml SPF50+ PA++++',
          ko: '올인원 물광 선크림 50ml SPF50+ PA++++',
        },
        {
          ja: 'グロウホワイト トーンアップサンクリーム 50ml SPF50+ PA++++',
          en: 'Glow White Tone-Up Sun Cream 50ml SPF50+ PA++++',
          ko: '글로우 화이트 톤업 선크림 50ml SPF50+ PA++++',
        },
        {
          ja: 'マルチサニー バーム 10g SPF50+ PA++++',
          en: 'Multi Sunny Balm 10g SPF50+ PA++++',
          ko: '멀티 서니 밤 10g SPF50+ PA++++',
        },
      ],
      pricing: [
        { label: L_REGULAR_PRICE, value: '¥12,705' },
        { label: L_LIVE_DISCOUNT, value: '48%OFF' },
        { label: L_LIVE_PRICE, value: '¥6,666', highlight: true },
      ],
    },
    // ja copy from `DETAILS/text.txt`.
    productsHeadline: {
      ja: 'Babacoのセットは、日焼け止めと保湿を兼ね備えたオールインワンケアで、肌をしっかり守り潤いを与えます。',
      en: "Babaco's set is all-in-one care combining sun protection and hydration — keeping skin firmly protected and moisturized.",
      ko: 'Babaco 세트는 자외선 차단과 보습을 겸비한 올인원 케어로 피부를 든든하게 지키고 촉촉함을 채워 줍니다.',
    },
    // The delivered USP is a PDF (Copy of 2.USP Board_out.pdf) — its page is
    // pre-rendered to `USP_page-1.png` (see BRAND_PAGE_LAYOUT.md).
    usps: [{ imageUrl: u(`${BR}/6. Babaco/PRODUCT USP/USP_page-1.png`) }],
    products: [
      {
        id: '1',
        // Name / pricing from `DETAILS/1/text.txt`.
        name: {
          ja: 'オールインワン水光サンクリーム SPF50+ PA++++',
          en: 'All-in-One Glow Sun Cream SPF50+ PA++++',
          ko: '올인원 물광 선크림 SPF50+ PA++++',
        },
        listPrice: '¥4,070',
        volume: '50ml',
        imageUrl: u(`${BR}/6. Babaco/DETAILS/1/Copy of 선크림_썸네일메인.jpg`),
        galleryImages: seq(
          5,
          (i) => `${BR}/6. Babaco/DETAILS/1/JP_Thumb/Copy of all${i}.png`,
        ),
        // page8 was delivered as a differently-named .png.
        detailImages: seq(15, (i) =>
          i === 8
            ? `${BR}/6. Babaco/DETAILS/1/JP_Detailed/Copy of 선크림_page8.png`
            : `${BR}/6. Babaco/DETAILS/1/JP_Detailed/Copy of page${i}.jpg`,
        ),
      },
      {
        id: '2',
        // Name / pricing from `DETAILS/2/text.txt`.
        name: {
          ja: 'グロウホワイト トーンアップサンクリーム SPF50+ PA++++',
          en: 'Glow White Tone-Up Sun Cream SPF50+ PA++++',
          ko: '글로우 화이트 톤업 선크림 SPF50+ PA++++',
        },
        listPrice: '¥4,235',
        volume: '50ml',
        imageUrl: u(`${BR}/6. Babaco/DETAILS/2/Copy of 톤업선크림_썸네일메인.jpg`),
        // Gallery order per request: the loose shots first, then tu1–tu4.
        galleryImages: [
          u(`${BR}/6. Babaco/DETAILS/2/JP_Thumb/Copy of tuu.png`),
          u(`${BR}/6. Babaco/DETAILS/2/JP_Thumb/Copy of 톤업선크림_썸네일메인서브1.jpg`),
          u(`${BR}/6. Babaco/DETAILS/2/JP_Thumb/Copy of 톤업선크림_썸네일서브1_.jpg`),
          u(`${BR}/6. Babaco/DETAILS/2/JP_Thumb/Copy of 톤업선크림_썸네일서브2.jpg`),
          ...seq(4, (i) => `${BR}/6. Babaco/DETAILS/2/JP_Thumb/Copy of tu${i}.png`),
        ],
        // Pages 1–7 came out of a compressor with `_11zon` names; the
        // UUID-named file is the opening hero page (verified visually).
        detailImages: [
          u(
            `${BR}/6. Babaco/DETAILS/2/JP_Detailed/Copy of 85cfde42-817e-48fe-ad59-b15483e4c444_11zon.png`,
          ),
          ...seq(
            6,
            (i) => `${BR}/6. Babaco/DETAILS/2/JP_Detailed/Copy of ${i + 1}_11zon.png`,
          ),
          ...seq(10, (i) => `${BR}/6. Babaco/DETAILS/2/JP_Detailed/Copy of ${i + 8}.png`),
        ],
      },
      {
        id: '3',
        // Name / pricing from `DETAILS/3/text.txt`.
        name: {
          ja: 'マルチサニー バーム 10g SPF50+ PA++++',
          en: 'Multi Sunny Balm 10g SPF50+ PA++++',
          ko: '멀티 서니 밤 10g SPF50+ PA++++',
        },
        listPrice: '¥4,400',
        volume: '10g',
        imageUrl: u(`${BR}/6. Babaco/DETAILS/3/Copy of 써니밤_썸네일메인.jpg`),
        galleryImages: [
          ...seq(5, (i) => `${BR}/6. Babaco/DETAILS/3/JP_Thumb/Copy of multi${i}.png`),
          u(`${BR}/6. Babaco/DETAILS/3/JP_Thumb/Copy of 써니밤_썸네일메인서브1.jpg`),
          u(`${BR}/6. Babaco/DETAILS/3/JP_Thumb/Copy of 써니밤_썸네일서브1.jpg`),
          u(`${BR}/6. Babaco/DETAILS/3/JP_Thumb/Copy of 써니밤_썸네일서브2.jpg`),
        ],
        // page7 was not delivered.
        detailImages: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14].map((n) =>
          u(`${BR}/6. Babaco/DETAILS/3/JP_Detailed/Copy of page${n}.jpg`),
        ),
      },
    ],
  },
  {
    slug: 'celonia',
    name: 'Celonia',
    logoUrl: u(`${BR}/8. Celonia/Copy of Celonia.png`),
    tagline: 'Premium Anti-Aging Solution',
    // ja copy from `8. Celonia/text2.txt` — paragraph break preserved.
    story: {
      ja: 'セロニアはグローバルバイオ企業メディポストが研究・生産した成分を核にお肌本来の美しさを引き出すスキンケアブランドです。\n\n瞬間の美しさではなく、時間の流れの中でも変わらない美しさを目指します。',
      en: "Celonia is a skincare brand that draws out the skin's natural beauty, built around ingredients researched and produced by the global bio company Medipost.\n\nWe aim not for momentary beauty, but for beauty that stays unchanged through the passage of time.",
      ko: '셀로니아는 글로벌 바이오 기업 메디포스트가 연구·생산한 성분을 핵심으로 피부 본연의 아름다움을 이끌어내는 스킨케어 브랜드입니다.\n\n순간의 아름다움이 아닌, 시간의 흐름 속에서도 변하지 않는 아름다움을 지향합니다.',
    },
    // Not rendered — the multi-set grid replaces the single-set section.
    tokupack: { subtitle: '', items: [] },
    usps: [],
    // The delivered `x.2 USP` folders are all empty → the USP section hides.
    tokupackSets: [
      {
        id: '1',
        label: 'TOKUPACK A',
        cardImageUrl: u(
          `${BR}/8. Celonia/Copy of KakaoTalk_Photo_2026-07-21-13-55-38 001.png`,
        ),
        // Copy from `TOKUPACK SET 1/1.1 TOKUPACK SET 1/text (1).txt`.
        tokupack: {
          subtitle: {
            ja: 'シワ改善・コラーゲンブースト ミニルーティン',
            en: 'Wrinkle-improving, collagen-boost mini routine',
            ko: '주름 개선·콜라겐 부스트 미니 루틴',
          },
          imageUrl: u(
            `${BR}/8. Celonia/TOKUPACK SET 1/1.1 TOKUPACK SET 1/KakaoTalk_Photo_2026-07-21-13-55-38 001.png`,
          ),
          items: [
            {
              ja: 'シグネチャーバイオ シートマスク 33g x 5',
              en: 'Signature Bio Sheet Mask 33g x 5',
              ko: '시그니처 바이오 시트 마스크 33g x 5',
            },
            {
              ja: 'バイオソリューション スキンブースター 10ml',
              en: 'Bio Solution Skin Booster 10ml',
              ko: '바이오 솔루션 스킨부스터 10ml',
            },
          ],
          pricing: [
            { label: L_REGULAR_PRICE, value: '¥10,450' },
            { label: L_LIVE_DISCOUNT, value: '32%OFF' },
            { label: L_LIVE_PRICE, value: '¥7,106', highlight: true },
          ],
        },
        usps: [],
        // Copy from `TOKUPACK SET 1/1.3 DETAILS/text.txt`.
        productsHeadline: {
          ja: '潤いとハリを与えるスキンブースター＋集中マスクのミニルーティン',
          en: 'A mini routine of skin booster + intensive mask for moisture and firmness',
          ko: '촉촉함과 탄력을 주는 스킨부스터＋집중 마스크 미니 루틴',
        },
        products: [CELONIA_SHEET_MASK, CELONIA_SKIN_BOOSTER],
      },
      {
        id: '2',
        label: 'TOKUPACK B',
        cardImageUrl: u(
          `${BR}/8. Celonia/Copy of KakaoTalk_Photo_2026-07-21-13-55-38 003.png`,
        ),
        // Copy from `TOKUPACK SET 2/2.1 TOKUPACK SET 2/text (1).txt`.
        tokupack: {
          subtitle: {
            ja: '【1+1】NGF37 100,000ppm スキンブースター',
            en: '[1+1] NGF37 100,000ppm Skin Booster',
            ko: '【1+1】NGF37 100,000ppm 스킨부스터',
          },
          imageUrl: u(
            `${BR}/8. Celonia/TOKUPACK SET 2/2.1 TOKUPACK SET 2/KakaoTalk_Photo_2026-07-21-13-55-38 003.png`,
          ),
          items: [
            {
              ja: 'バイオソリューション スキンブースター 10ml x 2ea',
              en: 'Bio Solution Skin Booster 10ml x 2ea',
              ko: '바이오 솔루션 스킨부스터 10ml x 2ea',
            },
          ],
          pricing: [
            { label: L_REGULAR_PRICE, value: '¥12,100' },
            { label: L_LIVE_DISCOUNT, value: '35%OFF' },
            { label: L_LIVE_PRICE, value: '¥7,865', highlight: true },
          ],
        },
        usps: [],
        // Copy from `TOKUPACK SET 2/2.3 DETAILS/text.txt`.
        productsHeadline: {
          ja: 'みずみずしい潤いで肌にハリを与え、毎日のスキンケアで透明感あふれる素肌へ導くスキンブースター',
          en: 'A skin booster that firms with fresh moisture, guiding skin to overflowing clarity through daily care',
          ko: '싱그러운 수분으로 피부에 탄력을 주고, 매일의 스킨케어로 투명감 넘치는 맨살로 이끄는 스킨부스터',
        },
        products: [CELONIA_SKIN_BOOSTER],
      },
      {
        id: '3',
        label: 'TOKUPACK C',
        cardImageUrl: u(
          `${BR}/8. Celonia/Copy of KakaoTalk_Photo_2026-07-21-13-55-38 002.png`,
        ),
        // Copy from `TOKUPACK SET 3/3.1 TOKUPACK SET 3/text (1).txt`.
        tokupack: {
          subtitle: {
            ja: 'NGF37 プレミアムブーストセット',
            en: 'NGF37 Premium Boost Set',
            ko: 'NGF37 프리미엄 부스트 세트',
          },
          imageUrl: u(
            `${BR}/8. Celonia/TOKUPACK SET 3/3.1 TOKUPACK SET 3/KakaoTalk_Photo_2026-07-21-13-55-38 002.png`,
          ),
          items: [
            {
              ja: 'シグネチャーバイオ 3Dオーロラ アンプル 35ml',
              en: 'Signature Bio 3D Aurora Ampoule 35ml',
              ko: '시그니처 바이오 3D 오로라 앰플 35ml',
            },
            {
              ja: 'バイオソリューション スキンブースター 10ml',
              en: 'Bio Solution Skin Booster 10ml',
              ko: '바이오 솔루션 스킨부스터 10ml',
            },
            {
              ja: 'GIFT: シグネチャーバイオ シートマスク 33g x 5',
              en: 'GIFT: Signature Bio Sheet Mask 33g x 5',
              ko: 'GIFT: 시그니처 바이오 시트 마스크 33g x 5',
            },
          ],
          pricing: [
            { label: L_REGULAR_PRICE, value: '¥21,340' },
            { label: L_LIVE_DISCOUNT, value: '40%OFF' },
            { label: L_LIVE_PRICE, value: '¥12,804', highlight: true },
          ],
        },
        usps: [],
        // Copy from `TOKUPACK SET 3/3.3 DETAILS/text.txt`.
        productsHeadline: {
          ja: '潤いとハリを与えるアンプル＋スキンブースター＆集中マスクセット',
          en: 'An ampoule + skin booster & intensive mask set for moisture and firmness',
          ko: '촉촉함과 탄력을 주는 앰플＋스킨부스터 & 집중 마스크 세트',
        },
        products: [
          {
            id: '3',
            // Name / pricing from `TOKUPACK SET 3/3.3 DETAILS/3/text.txt`.
            name: {
              ja: 'シグネチャーバイオ 3Dオーロラ アンプル 35ml',
              en: 'Signature Bio 3D Aurora Ampoule 35ml',
              ko: '시그니처 바이오 3D 오로라 앰플 35ml',
            },
            listPrice: '¥15,290',
            volume: '35ml',
            imageUrl: u(
              `${BR}/8. Celonia/TOKUPACK SET 3/3.3 DETAILS/3/Copy of 1.jpg`,
            ),
            galleryImages: [
              'Copy of 1.jpg',
              'Copy of 3.jpg',
              'Copy of 4.jpg',
              'Copy of 8.jpg',
              'Copy of 9.jpg',
              'Copy of 11.jpg',
              'Copy of 12.jpg',
              'Copy of 13.jpg',
              'Copy of 14.jpg',
              'Copy of 15.jpg',
              'Copy of 16.1.jpg',
              'Copy of 16.2.jpg',
              'Copy of All 2 resize.jpg',
              'Copy of All 3 resize.jpg',
              'Copy of all DP resize.jpg',
              'Copy of CELONIA  resize.jpg',
            ].map((f) =>
              u(`${BR}/8. Celonia/TOKUPACK SET 3/3.3 DETAILS/3/JP_Thumb/${f}`),
            ),
            // Mixed jpg/png sequence exactly as delivered.
            detailImages: seq(
              19,
              (i) =>
                `${BR}/8. Celonia/TOKUPACK SET 3/3.3 DETAILS/3/JP_Detailed/Copy of ${i}.${[3, 4, 5, 6, 8, 9, 19].includes(i) ? 'png' : 'jpg'}`,
            ),
          },
          CELONIA_SKIN_BOOSTER,
          CELONIA_SHEET_MASK,
        ],
      },
    ],
  },
];

export function getBrand(slug: string): BrandContent | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getProduct(
  slug: string,
  productId: string,
): BrandProduct | undefined {
  const brand = getBrand(slug);
  return (
    brand?.products?.find((p) => p.id === productId) ??
    brand?.tokupackSets
      ?.flatMap((s) => s.products ?? [])
      .find((p) => p.id === productId)
  );
}

export function getTokupackSet(
  slug: string,
  setId: string,
): TokupackSetPage | undefined {
  return getBrand(slug)?.tokupackSets?.find((s) => s.id === setId);
}
