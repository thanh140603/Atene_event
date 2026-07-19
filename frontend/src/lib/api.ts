import type {
  Brand,
  EventInfo,
  Faq,
  SocialLink,
  Slot,
  TokupackApplicationInput,
} from '../types';

const BASE = import.meta.env.VITE_API_BASE ?? '/api';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  getEvent: () => get<EventInfo>('/event'),
  getBrands: () => get<Brand[]>('/brands'),
  getFaqs: () => get<Faq[]>('/faqs'),
  getSocialLinks: () => get<SocialLink[]>('/social-links'),
  createBooking: async (payload: {
    creatorName?: string;
    email?: string;
    dates: string[];
    slots: Slot[];
  }) => {
    const res = await fetch(`${BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Booking failed: ${res.status}`);
    return res.json();
  },
  createTokupackApplication: async (payload: TokupackApplicationInput) => {
    const res = await fetch(`${BASE}/tokupack-applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Application failed: ${res.status}`);
    return res.json();
  },
};
