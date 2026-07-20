import { useT } from '../../i18n/LanguageProvider';

export default function BestContentAwardHero() {
  const t = useT();
  return (
    <section id="award" className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('venue.award.heading')}</h2>
        <div className="heading-rule" />

        {/* Hero visual — dark banquet-room banner. Placeholder until real
            event photography is supplied. */}
        <div className="relative mt-12 overflow-hidden rounded-2xl bg-brand-dark">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black"
          />
          {/* faint city-skyline hint */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/3 h-1/3 opacity-20"
            style={{
              background:
                'repeating-linear-gradient(90deg, transparent 0 14px, rgba(255,255,255,0.4) 14px 16px)',
            }}
          />
          <div className="relative flex min-h-[220px] items-center justify-center px-6 py-16 sm:min-h-[300px] sm:py-24">
            <h3 className="text-center text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-white drop-shadow-lg sm:text-6xl">
              {t('venue.award.titleLine1')}
              <br />
              {t('venue.award.titleLine2')}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
