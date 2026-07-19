import { useEffect, useState } from 'react';
import TokuPackLogo from '../components/TokuPackLogo';
import ReserveLivestream from '../components/sections/ReserveLivestream';
import { useT, useLang } from '../i18n/LanguageProvider';
import { api } from '../lib/api';
import type { EventInfo } from '../types';

export default function ReservePage() {
  const t = useT();
  const { lang } = useLang();
  const [event, setEvent] = useState<EventInfo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.getEvent(lang).then(setEvent).catch(() => setError(true));
  }, [lang]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
        <div className="section-container flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <TokuPackLogo size={34} />
            <span className="text-sm font-bold tracking-wide">
              {t('nav.reserve')}
            </span>
          </a>
          <a
            href="#/"
            className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
          >
            {t('common.backToEvent')}
          </a>
        </div>
      </header>

      <main id="top">
        {error ? (
          <div className="flex min-h-[60vh] items-center justify-center text-center">
            <p className="text-sm text-neutral-500">{t('common.loadError')}</p>
          </div>
        ) : !event ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-brand" />
          </div>
        ) : (
          <ReserveLivestream event={event} />
        )}
      </main>

      <footer className="bg-brand-dark text-neutral-400">
        <div className="section-container flex flex-col items-center gap-3 py-12 text-center">
          <TokuPackLogo size={44} />
          <p className="text-sm font-semibold text-white">
            CREATOR SOURCING DAY
          </p>
          <p className="text-xs">{t('footer.rights')}</p>
        </div>
      </footer>
    </>
  );
}
