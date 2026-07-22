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
  celonia: {
    ja: 'プレミアム エイジングケア ソリューション',
    en: 'Premium Anti-Aging Solution',
    ko: '프리미엄 안티에이징 솔루션',
  },
  zipiel: {
    ja: '物語をまとうスキンケア',
    en: 'Skincare that wears a story',
    ko: '이야기를 입은 스킨케어',
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
const faqQuestion: Record<number, ByLang<string>> = {
  1: {
    ja: 'ライブ配信キャンペーンにはどうすれば参加できますか？',
    en: 'How can I participate in the livestream campaign?',
    ko: '라이브 방송 캠페인에는 어떻게 참여하나요?',
  },
  2: {
    ja: '複数のトクパックをライブ配信できますか？',
    en: 'Can I livestream more than one TokuPack?',
    ko: '두 개 이상의 톡팩을 라이브 방송할 수 있나요?',
  },
  3: {
    ja: 'Korea Invitation Challengeはどのように評価されますか？',
    en: 'How is the Korea Invitation Challenge evaluated?',
    ko: 'Korea Invitation Challenge는 어떻게 평가되나요?',
  },
  4: {
    ja: '販売実績を手動で提出する必要がありますか？',
    en: 'Do I need to submit my sales results manually?',
    ko: '판매 실적을 수동으로 제출해야 하나요?',
  },
  5: {
    ja: 'ライブ配信に対して報酬は受け取れますか？コミッションはどのように機能しますか？',
    en: 'Will I receive payment for my livestream? How does the commission work?',
    ko: '라이브 방송에 대한 대금을 받나요? 커미션은 어떻게 되나요?',
  },
  6: {
    ja: '同じライブ配信セッション中に複数のブランドをライブ配信できますか？',
    en: 'Can I livestream multiple brands during the same livestream session?',
    ko: '같은 라이브 방송 세션에서 여러 브랜드를 라이브 방송할 수 있나요?',
  },
};
const faqAnswer: Record<number, ByLang<string>> = {
  1: {
    ja: 'Creator Sourcing Dayに参加し、お好みのトクパックを選んだ後、当ウェブサイトでライブ配信枠を予約するだけです。2026年7月27日から8月26日まで、選んだトクパックをTikTok LIVEで販売できます。',
    en: 'After attending Creator Sourcing Day and choosing your preferred TokuPack(s), simply book your livestream slot on our website. You can start selling your selected TokuPack(s) on TikTok LIVE between July 27 and August 26, 2026.',
    ko: 'Creator Sourcing Day에 참여하고 원하는 톡팩을 선택한 후, 저희 웹사이트에서 라이브 방송 슬롯을 예약하기만 하면 됩니다. 2026년 7월 27일부터 8월 26일까지 선택한 톡팩을 TikTok LIVE에서 판매할 수 있습니다.',
  },
  2: {
    ja: 'はい。複数の参加ブランドのトクパックについてライブ配信を予約できます。各予約は予約ページから個別に行ってください。',
    en: 'Yes. You may reserve livestreams for multiple TokuPacks from different participating brands. Each reservation should be made separately through the booking page.',
    ko: '네. 여러 참여 브랜드의 톡팩에 대해 라이브 방송을 예약할 수 있습니다. 각 예약은 예약 페이지에서 개별적으로 진행해 주세요.',
  },
  3: {
    ja: '受賞者は、TikTok LIVEセッションで販売したトクパックから生み出された総GMV（流通取引総額）に基づいて決定されます。キャンペーン期間である7月27日から8月26日の間にGMV¥5,000,000に最初に到達した5名のクリエイターがKorea Invitation Challengeで優勝し、韓国への5日間の特別旅行を獲得します。',
    en: 'Winners will be determined based on the total GMV (Gross Merchandise Value) generated from the TokuPacks you sell through your TikTok LIVE sessions. The first five creators to reach ¥5,000,000 in GMV during the campaign period from July 27 to August 26 will win the Korea Invitation Challenge and receive an exclusive 5-day trip to Korea.',
    ko: '수상자는 TikTok LIVE 세션을 통해 판매한 톡팩에서 발생한 총 GMV(총거래액)를 기준으로 결정됩니다. 캠페인 기간인 7월 27일부터 8월 26일 사이에 GMV ¥5,000,000에 가장 먼저 도달한 다섯 명의 크리에이터가 Korea Invitation Challenge에서 우승하여 한국 5일 여행 특전을 받게 됩니다.',
  },
  4: {
    ja: 'いいえ。TikTok Shopを通じた販売は自動的に記録されます。ATENEがすべての参加ブランドにわたるあなたのGMVを監視し、キャンペーン期間中クリエイターランキングを更新し、TikTok Shopの公式GMV記録に基づいて受賞者を発表します。',
    en: 'No. Sales generated through TikTok Shop are tracked automatically. ATENE will monitor your GMV across all participating brands, update the creator rankings throughout the campaign, and announce the winners based on the official GMV records from TikTok Shop.',
    ko: '아니요. TikTok Shop을 통해 발생한 판매는 자동으로 추적됩니다. ATENE가 모든 참여 브랜드에 걸친 귀하의 GMV를 모니터링하고, 캠페인 기간 동안 크리에이터 순위를 업데이트하며, TikTok Shop의 공식 GMV 기록을 바탕으로 수상자를 발표합니다.',
  },
  5: {
    ja: 'はい。ライブ配信を予約した後、ATENEがブランドと調整し、コラボレーションのコミッション体系について話し合い、確定します。双方が条件に合意すると、ライブ配信が始まる前に詳細をお知らせします。',
    en: "Yes. After you book your livestream, ATENE will coordinate with the brand to discuss and confirm the commission structure for your collaboration. Once both parties agree on the terms, you'll receive the details before your livestream begins.",
    ko: '네. 라이브 방송을 예약한 후, ATENE가 브랜드와 협의하여 협업에 대한 커미션 구조를 논의하고 확정합니다. 양측이 조건에 합의하면 라이브 방송이 시작되기 전에 세부 사항을 안내해 드립니다.',
  },
  6: {
    ja: 'はい。1回のライブ配信で複数の参加ブランドを紹介していただけます。スケジュールがATENEおよび参加ブランドと確認されている限り、同じライブ配信セッション内で紹介できるトクパックやブランドの数に制限はありません。',
    en: 'Yes. You are welcome to feature multiple participating brands in a single livestream. There is no limit to the number of TokuPacks or brands you can showcase within the same livestream session, as long as your schedule has been confirmed with ATENE and the participating brands.',
    ko: '네. 한 번의 라이브 방송에서 여러 참여 브랜드를 소개하실 수 있습니다. 일정이 ATENE 및 참여 브랜드와 확인된 경우, 같은 라이브 방송 세션 내에서 소개할 수 있는 톡팩이나 브랜드 수에는 제한이 없습니다.',
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
    // Seeded placeholder names ("<Brand> TokuPack <n>") are localized via the
    // template; real set titles (e.g. Zipiel's) pass through as stored.
    name: tp.name?.startsWith(`${brand.name} TokuPack`)
      ? tokupackName(brand.name, i + 1, lang)
      : tp.name,
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
    answer: faqAnswer[faq.sortOrder]?.[lang] ?? faq.answer,
  };
}
