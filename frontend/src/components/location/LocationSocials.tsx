import { useT } from '../../i18n/LanguageProvider';
import type { ReactNode } from 'react';

interface Social {
  nameKey: string;
  url: string;
  icon: ReactNode;
}

const socials: Social[] = [
  {
    nameKey: 'location.socials.instagram',
    url: 'https://www.instagram.com/atene_cosmetics.jp/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    nameKey: 'location.socials.tiktok',
    url: 'https://www.tiktok.com/@atene_cosmeticsjp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    nameKey: 'location.socials.x',
    url: 'https://x.com/atene_cosmetics',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.9 1.2h3.7l-8.1 9.2L24 22.8h-7.4l-5.8-7.6-6.7 7.6H.4l8.6-9.9L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2.1L6.5 3.3H4.3l13.3 17.3z" />
      </svg>
    ),
  },
  {
    nameKey: 'location.socials.line',
    url: 'https://line.me/ti/p/wbxRR8KLmQ',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.5 3 2 6.6 2 11c0 2.86 1.87 5.37 4.68 6.78-.15.52-.96 3.3-.99 3.52 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.42 4.28-2.83.55.08 1.12.12 1.7.12 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
      </svg>
    ),
  },
];

export default function LocationSocials() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container flex justify-center gap-3 pb-20 sm:pb-24">
        {socials.map((s) => (
          <a
            key={s.nameKey}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={t(s.nameKey)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-800 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            <span className="h-5 w-5">{s.icon}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
