import { useT } from '../i18n/LanguageProvider';
import TokuPackLogo from '../components/TokuPackLogo';
import TokupackHero from '../components/tokupack/TokupackHero';
import TokupackForm from '../components/tokupack/TokupackForm';

export default function TokupackPage() {
  const t = useT();
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
        <div className="section-container flex h-16 items-center justify-between gap-3">
          <a href="#top" className="flex min-w-0 items-center gap-2">
            <TokuPackLogo size={34} />
            <span className="truncate text-sm font-bold tracking-wide">
              {t('tokupack.header.wordmark')}
            </span>
          </a>
          <a
            href="#/"
            className="shrink-0 whitespace-nowrap rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            {t('common.backToEvent')}
          </a>
        </div>
      </header>

      <main>
        <TokupackHero />
        <TokupackForm />
      </main>

      <footer className="bg-brand-dark text-neutral-400">
        <div className="section-container flex flex-col items-center gap-3 py-12 text-center">
          <TokuPackLogo size={44} />
          <p className="text-sm font-semibold text-white">
            {t('tokupack.footer.tagline')}
          </p>
          <p className="text-xs">{t('tokupack.footer.poweredBy')}</p>
          <p className="mt-3 text-[11px] text-neutral-500">
            {t('tokupack.footer.copyright')}
          </p>
        </div>
      </footer>
    </>
  );
}
