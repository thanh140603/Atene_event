import type {
  Brand,
  EventInfo,
  Faq,
  SocialLink,
  Slot,
  TokupackApplicationInput,
} from '../types';
import type { Lang } from '../i18n/config';

const BASE = import.meta.env.VITE_API_BASE ?? '/api';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

/** Append the active language so the backend returns localized content. */
const q = (path: string, lang?: Lang) => (lang ? `${path}?lang=${lang}` : path);

export const api = {
  getEvent: (lang?: Lang) => get<EventInfo>(q('/event', lang)),
  getBrands: (lang?: Lang) => get<Brand[]>(q('/brands', lang)),
  getFaqs: (lang?: Lang) => get<Faq[]>(q('/faqs', lang)),
  getSocialLinks: (lang?: Lang) => get<SocialLink[]>(q('/social-links', lang)),
  createBooking: async (payload: {
    creatorName?: string;
    email?: string;
    /** Google Sign-In ID token, verified server-side. */
    credential?: string;
    googleId?: string;
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

  // --- Admin dashboard (bearer-token protected) ---
  adminLogin: async (email: string, password: string) => {
    const res = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error(`Login failed: ${res.status}`);
    return res.json() as Promise<{ token: string; email: string; role: string }>;
  },
  adminGet: async <T>(path: string, token: string): Promise<T> => {
    const res = await fetch(`${BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return res.json() as Promise<T>;
  },
};
