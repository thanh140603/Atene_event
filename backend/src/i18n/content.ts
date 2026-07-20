// Localized overlays for seeded content. The DB stays the structural source of
// truth (ids, dates, sort order, URLs, images); these maps provide the display
// text per language. Keyed by a stable identifier (event singleton, sortOrder,
// or brand slug) so it survives reseeding.

export type Lang = 'ja' | 'en' | 'ko';
const LANGS: Lang[] = ['ja', 'en', 'ko'];
export const DEFAULT_LANG: Lang = 'ja';

export function normalizeLang(input?: string): Lang {
  if (input && (LANGS as string[]).includes(input)) return input as Lang;
  return DEFAULT_LANG;
}

type ByLang<T> = Record<Lang, T>;

// ---- Event singleton (translatable fields only) ----
interface EventText {
  heroTagline: string;
  heroTaglineEmphasis: string;
  aboutSubtitle: string;
  aboutBody: string;
}
const eventText: ByLang<EventText> = {
  ja: {
    heroTagline: '人気K-Beautyブランドが集結。限定トクパックをいち早く手に入れよう。',
    heroTaglineEmphasis: 'あなたのライブ配信を、ここから。',
    aboutSubtitle: 'K-BeautyブランドとTikTokクリエイターをつなぐ',
    aboutBody:
      'TokuPackとは、ATENE主催の「Creator Sourcing Day」イベント限定で提供される、各ブランドが厳選した特別な限定セットです。',
  },
  en: {
    heroTagline: 'Meet Top K-Beauty Brands. Get Exclusive TokuPack Access.',
    heroTaglineEmphasis: 'Start Your Livestream Journey',
    aboutSubtitle: 'Connecting K-Beauty brands with TikTok creators',
    aboutBody:
      "A TokuPack is a special limited-edition set, carefully curated by each brand and offered exclusively at ATENE's Creator Sourcing Day event.",
  },
  ko: {
    heroTagline: '인기 K-뷰티 브랜드가 한자리에. 한정 톡팩을 가장 먼저 만나보세요.',
    heroTaglineEmphasis: '당신의 라이브 방송 여정을 시작하세요.',
    aboutSubtitle: 'K-뷰티 브랜드와 TikTok 크리에이터를 잇다',
    aboutBody:
      '톡팩은 ATENE가 주최하는 「Creator Sourcing Day」 이벤트에서만 제공되는, 각 브랜드가 엄선한 특별 한정 세트입니다.',
  },
};

// ---- Stats (keyed by sortOrder) ----
const statText: Record<number, ByLang<{ value: string; label: string }>> = {
  1: {
    ja: { value: '10+', label: '人気K-Beautyブランド' },
    en: { value: '10+', label: 'Popular K-Beauty Brands' },
    ko: { value: '10+', label: '인기 K-뷰티 브랜드' },
  },
  2: {
    ja: { value: '20+', label: '限定セット・トクパック' },
    en: { value: '20+', label: 'Limited Sets & TokuPacks' },
    ko: { value: '20+', label: '한정 세트 · 톡팩' },
  },
  3: {
    ja: { value: '最強セット', label: '各ブランド厳選の特別構成' },
    en: { value: 'Best Sets', label: 'Specially curated by each brand' },
    ko: { value: '최강 세트', label: '각 브랜드가 엄선한 특별 구성' },
  },
  4: {
    ja: { value: '限定販売', label: 'TikTok限定・数量限定' },
    en: { value: 'Exclusive', label: 'TikTok-only, limited quantity' },
    ko: { value: '한정 판매', label: 'TikTok 한정 · 수량 한정' },
  },
};

// ---- How-it-works steps (keyed by sortOrder) ----
const stepText: Record<number, ByLang<{ title: string; subtitle: string }>> = {
  1: {
    ja: { title: 'オフラインイベント', subtitle: '7月23日' },
    en: { title: 'Offline Event', subtitle: 'July 23th' },
    ko: { title: '오프라인 이벤트', subtitle: '7월 23일' },
  },
  2: {
    ja: { title: 'トクパックを受け取る', subtitle: '会場にて' },
    en: { title: 'Receive TokuPack', subtitle: 'At The Event' },
    ko: { title: '톡팩 수령', subtitle: '행사장에서' },
  },
  3: {
    ja: { title: '商品を試す', subtitle: '自宅で' },
    en: { title: 'Try Product', subtitle: 'At Home' },
    ko: { title: '제품 체험', subtitle: '자택에서' },
  },
  4: {
    ja: { title: 'ライブ配信を予約', subtitle: '7/27〜8/26' },
    en: { title: 'Book Livestream', subtitle: 'Jul 27 - Aug 26' },
    ko: { title: '라이브 방송 예약', subtitle: '7/27~8/26' },
  },
  5: {
    ja: { title: 'ライブ配信', subtitle: '予約した枠で' },
    en: { title: 'Go Live', subtitle: 'Scheduled Slot' },
    ko: { title: '라이브 방송', subtitle: '예약한 시간에' },
  },
  6: {
    ja: { title: '報酬', subtitle: '販売ごとに' },
    en: { title: 'Reward', subtitle: 'Per Sale' },
    ko: { title: '리워드', subtitle: '판매마다' },
  },
};

// ---- Brand taglines (keyed by slug) ----
const brandTagline: Record<string, ByLang<string>> = {
  'purito-seoul': { ja: '土壌からソウルへ', en: 'From Soil to Seoul', ko: '흙에서 서울까지' },
  'vt-cosmetics': {
    ja: '流行を超えて、タイムレスに',
    en: 'In - Vogue and Timeless',
    ko: '유행을 넘어 타임리스하게',
  },
  beplain: { ja: '素肌を楽しむ、beplain', en: 'Enjoy plain skin, beplain', ko: '맨 피부를 즐기다, beplain' },
  'dr-deep': {
    ja: '今日の深さで、肌の明日をデザインする',
    en: "Designing today's depth for the skin's tomorrow",
    ko: '오늘의 깊이로 피부의 내일을 디자인하다',
  },
  lubylab: {
    ja: 'ホームサージカルなアプローチ',
    en: 'The Home-Surgical Approach',
    ko: '홈 서지컬 어프로치',
  },
  dailyweekly: {
    ja: '毎日に喜びを、毎週に驚きを',
    en: 'Daily Delight, Weekly Wonders',
    ko: '매일의 기쁨, 매주의 놀라움',
  },
  torhop: {
    ja: 'サウナから生まれた温感ケア',
    en: 'Sauna-Inspired Warming Care',
    ko: '사우나에서 영감받은 온감 케어',
  },
  babaco: {
    ja: '美しさは、本物のケアから。',
    en: 'Beauty begins with real care.',
    ko: '아름다움은 진심 어린 케어에서 시작됩니다.',
  },
  quadthera: {
    ja: '科学が導く毎日のセラピー',
    en: 'Science-led daily therapy',
    ko: '과학이 이끄는 데일리 테라피',
  },
  atike: { ja: '洗練された、儀式のようなケア', en: 'Ritual care, refined', ko: '정제된 리추얼 케어' },
  zipiel: {
    ja: '密封された新鮮さ、輝く肌',
    en: 'Sealed freshness, radiant skin',
    ko: '밀봉된 신선함, 빛나는 피부',
  },
};

// TokuPack name/description templates.
const tokupackName = (brand: string, n: number, lang: Lang) =>
  lang === 'ja'
    ? `${brand} トクパック ${n}`
    : lang === 'ko'
      ? `${brand} 톡팩 ${n}`
      : `${brand} TokuPack ${n}`;

const tokupackDesc = (brand: string, lang: Lang) =>
  lang === 'ja'
    ? `${brand}の厳選セット — Creator Sourcing Day限定。`
    : lang === 'ko'
      ? `${brand} 엄선 세트 — Creator Sourcing Day 한정.`
      : `Curated ${brand} set — Creator Sourcing Day exclusive.`;

// ---- FAQs (keyed by sortOrder) ----
const faqAnswer: ByLang<string> = {
  ja: '質問に対する2〜3行程度の回答テキストがここに入ります。ここに説明が続きます……',
  en: 'A 2-3 line sentence about answering the question ect ect ect filler text goes here ect ect……',
  ko: '질문에 대한 2~3줄 정도의 답변 텍스트가 여기에 들어갑니다. 여기에 설명이 이어집니다……',
};
const faqQuestion: Record<number, ByLang<string>> = {
  1: {
    ja: 'トクパックはどのように受け取れますか？',
    en: 'How do I receive my TokuPack?',
    ko: '톡팩은 어떻게 받나요?',
  },
  2: {
    ja: 'Creator Sourcing Dayには誰が参加できますか？',
    en: 'Who can join Creator Sourcing Day?',
    ko: 'Creator Sourcing Day에는 누가 참여할 수 있나요?',
  },
  3: {
    ja: 'ライブ配信キャンペーンの期間はいつですか？',
    en: 'When is the livestream campaign period?',
    ko: '라이브 방송 캠페인 기간은 언제인가요?',
  },
  4: {
    ja: 'ライブ配信枠はどのように予約しますか？',
    en: 'How do I book a livestream slot?',
    ko: '라이브 방송 슬롯은 어떻게 예약하나요?',
  },
  5: {
    ja: 'クリエイターはどんな報酬を得られますか？',
    en: 'What rewards can creators earn?',
    ko: '크리에이터는 어떤 리워드를 받을 수 있나요?',
  },
  6: {
    ja: 'オフラインイベントはどこで開催されますか？',
    en: 'Where is the offline event held?',
    ko: '오프라인 이벤트는 어디에서 열리나요?',
  },
};

// ---- Localizers (return plain objects; DB entities are left untouched) ----
export function localizeEvent(payload: any, lang: Lang) {
  const stats = (payload.stats ?? []).map((s: any) => ({
    ...s,
    ...(statText[s.sortOrder]?.[lang] ?? {}),
  }));
  const steps = (payload.steps ?? []).map((s: any) => ({
    ...s,
    ...(stepText[s.sortOrder]?.[lang] ?? {}),
  }));
  return { ...payload, ...eventText[lang], stats, steps };
}

export function localizeBrand(brand: any, lang: Lang) {
  const tagline = brandTagline[brand.slug]?.[lang] ?? brand.tagline;
  const tokupacks = (brand.tokupacks ?? []).map((tp: any, i: number) => ({
    ...tp,
    name: tokupackName(brand.name, i + 1, lang),
    description: tokupackDesc(brand.name, lang),
  }));
  return {
    ...brand,
    tagline,
    description: `${brand.name} — ${tagline}`,
    tokupacks,
  };
}

export function localizeFaq(faq: any, lang: Lang) {
  return {
    ...faq,
    question: faqQuestion[faq.sortOrder]?.[lang] ?? faq.question,
    answer: faqAnswer[lang],
  };
}
