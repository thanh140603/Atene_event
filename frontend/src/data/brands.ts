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

/** Three empty USP tiles — a sensible default until real product shots land. */
const placeholderUsps: UspCard[] = [{}, {}, {}];

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
    tagline: 'From Soil to Seoul',
    layout: 'featured',
    heroVideoUrl: '',
    heroImageUrl: '',
    story: {
      ja: '自然由来の成分と誠実なフォーミュラで、肌にやさしいスキンケアを届ける韓国発のブランド。土から生まれた素材の力で、あなたの毎日にすこやかな美しさを。',
      en: 'A Korean brand delivering skin-friendly skincare through naturally derived ingredients and honest formulas. With the power of materials born from the soil, it brings healthy beauty to your every day.',
      ko: '자연 유래 성분과 정직한 포뮬러로 피부에 순한 스킨케어를 선보이는 한국 브랜드. 흙에서 태어난 원료의 힘으로 당신의 매일에 건강한 아름다움을 전합니다.',
    },
    philosophy: {
      ja: 'すべての肌のためのクリーンビューティー',
      en: 'Clean beauty for every skin',
      ko: '모든 피부를 위한 클린 뷰티',
    },
    tokupack: { subtitle: '', items: [] },
    usps: [],
    tokupackSeries: [
      { label: 'TOKUPACK A', link: '#/tokupack' },
      { label: 'TOKUPACK B', link: '#/tokupack' },
      { label: 'TOKUPACK C', link: '#/tokupack' },
    ],
    showcase: {
      heading: {
        ja: '世界で人気の新商品・ベストセラーを限定でご紹介',
        en: 'A limited showcase of new arrivals and global best-sellers',
        ko: '전 세계에서 사랑받는 신제품·베스트셀러를 한정 소개',
      },
      products: [{}, {}, {}, {}, {}, {}],
    },
    collab: {
      heading: {
        ja: 'Purito Seoulとのコラボレーションを始めませんか？',
        en: 'Ready to start a collaboration with Purito Seoul?',
        ko: 'Purito Seoul과 컬래버레이션을 시작해 보시겠어요?',
      },
      ctaLabel: {
        ja: '今すぐLivestreamを予約！▶',
        en: 'Reserve your livestream now! ▶',
        ko: '지금 바로 라이브 방송 예약! ▶',
      },
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
    story: {
      ja: '肌を大切にする思いと、時代を超えて愛される洗練された商品で、よりあなたらしい毎日を共にするブランド。',
      en: 'A brand that walks with you through a daily life that is more you — with heartfelt care for the skin and refined products loved across generations.',
      ko: '피부를 소중히 여기는 마음과 시대를 넘어 사랑받는 세련된 제품으로, 더 나다운 매일을 함께하는 브랜드.',
    },
    philosophy: {
      ja: '肌本来の美しさを保つこと',
      en: "Preserving the skin's natural beauty",
      ko: '피부 본연의 아름다움을 지키는 것',
    },
    tokupack: { subtitle: '', items: [] },
    usps: [],
    tokupackSeries: [
      { label: 'TOKUPACK A', link: '#/tokupack' },
      { label: 'TOKUPACK B', link: '#/tokupack' },
      { label: 'TOKUPACK C', link: '#/tokupack' },
    ],
    showcase: {
      heading: {
        ja: '世界で人気の新商品・ベストセラーを限定でご紹介',
        en: 'A limited showcase of new arrivals and global best-sellers',
        ko: '전 세계에서 사랑받는 신제품·베스트셀러를 한정 소개',
      },
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
      heading: {
        ja: 'VT Cosmeticsとのコラボレーションを始めませんか？',
        en: 'Ready to start a collaboration with VT Cosmetics?',
        ko: 'VT Cosmetics와 컬래버레이션을 시작해 보시겠어요?',
      },
      ctaLabel: {
        ja: '今すぐLivestreamを予約！▶',
        en: 'Reserve your livestream now! ▶',
        ko: '지금 바로 라이브 방송 예약! ▶',
      },
      ctaHref: '#reserve',
    },
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
          `${BR}/5. Beplain/DETAILS/1/Copy of 03. 緑豆弱酸性クレンジングフォーム_160ml.png의 사본.png`,
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
          `${BR}/5. Beplain/DETAILS/2/Copy of 03-11 녹두 모공 클렌징 밀크 밤 JP.png의 사본.png`,
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
          `${BR}/5. Beplain/DETAILS/3/Copy of 03-8_녹두모공클레이팩_120ml.png의 사본.png`,
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
        { label: L_REGULAR_PRICE, value: '¥9,179' },
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
        volume: '1,4g x 4ea',
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
    // `PRODUCT USP/` was delivered empty — placeholder grid until pages land.
    usps: placeholderUsps,
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
        // Name / pricing from `Details/3/text.txt`; JP_Detailed was delivered empty.
        name: {
          ja: 'クーラスティング ウォーター ブロックバスター！ サンセラム',
          en: 'Coolasting Water Blockbuster! Sun Serum',
          ko: '쿨라스팅 워터 블록버스터! 선세럼',
        },
        listPrice: '¥2,860',
        volume: '50ml',
        imageUrl: u(`${BR}/3. Daily Weekly/Details/3/Copy of 3.png`),
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
        galleryImages: [
          ...seq(4, (i) => `${BR}/6. Babaco/DETAILS/2/JP_Thumb/Copy of tu${i}.png`),
          u(`${BR}/6. Babaco/DETAILS/2/JP_Thumb/Copy of tuu.png`),
          u(`${BR}/6. Babaco/DETAILS/2/JP_Thumb/Copy of 톤업선크림_썸네일메인서브1.jpg`),
          u(`${BR}/6. Babaco/DETAILS/2/JP_Thumb/Copy of 톤업선크림_썸네일서브1_.jpg`),
          u(`${BR}/6. Babaco/DETAILS/2/JP_Thumb/Copy of 톤업선크림_썸네일서브2.jpg`),
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
    tagline: 'Premium Anti-Aging Solution',
    story: '',
    tokupack: { subtitle: '', items: [] },
    usps: placeholderUsps,
  },
];

export function getBrand(slug: string): BrandContent | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getProduct(
  slug: string,
  productId: string,
): BrandProduct | undefined {
  return getBrand(slug)?.products?.find((p) => p.id === productId);
}
