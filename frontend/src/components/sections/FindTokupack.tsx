import { useT } from '../../i18n/LanguageProvider';

export default function FindTokupack() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container pb-20 sm:pb-24">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-14 sm:px-14"
          style={{
            background:
              'linear-gradient(120deg, #f4f4f5 0%, #eef0f3 40%, #e9eef2 100%)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, #ffc4de 0%, rgba(255,255,255,0) 70%)',
            }}
          />
          <div className="relative max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
              {t('home.find.headingPre')}
              <span className="text-brand">{t('home.find.headingHi')}</span>
              {t('home.find.headingPost')}
            </h2>
            <p className="mt-5 text-sm font-semibold text-neutral-700">
              {t('home.find.line1a')}
              <br />
              {t('home.find.line1b')}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {t('home.find.line2a')}
              <br />
              {t('home.find.line2b')}
            </p>
            <a
              href="#/tokupack"
              className="btn-pill mt-8 bg-neutral-900 text-white hover:opacity-90"
            >
              {t('home.find.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
