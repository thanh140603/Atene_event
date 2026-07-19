export interface Stat {
  id: number;
  value: string;
  label: string;
  sortOrder: number;
}

export interface HowItWorksStep {
  id: number;
  stepNumber: number;
  title: string;
  subtitle: string;
  sortOrder: number;
}

export interface EventInfo {
  id: number;
  heroKicker: string;
  heroTitle: string;
  poweredBy: string;
  heroTagline: string;
  heroTaglineEmphasis: string;
  eventDate: string;
  venue: string;
  campaignStart: string;
  campaignEnd: string;
  aboutSubtitle: string;
  aboutBody: string;
  stats: Stat[];
  steps: HowItWorksStep[];
}

export interface Tokupack {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Brand {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  tokupacks: Tokupack[];
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface SocialLink {
  id: number;
  platform: string;
  label: string;
  handle: string;
  url: string;
  sortOrder: number;
}

export interface Slot {
  date: string;
  start: string;
  end: string;
}

export interface TokupackApplicationInput {
  name: string;
  email: string;
  preferredBrand: string;
  preferredBrandOther?: string;
  liveCommerceBrands: string[];
  comment?: string;
}
