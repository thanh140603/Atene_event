import { useT } from '../../i18n/LanguageProvider';

export default function CompetitionCTA() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container py-24 text-center sm:py-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-brand">
          {t('competition.cta.eyebrow')}
        </p>

        <h2 className="mx-auto mt-8 max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight text-neutral-900 sm:text-6xl">
          {t('competition.cta.title.l1')}
          <br />
          {t('competition.cta.title.l2')}
        </h2>

        <div className="mt-12 flex items-center justify-center gap-3 text-xs font-medium tracking-wide text-neutral-500 sm:gap-4 sm:text-sm">
          <span className="font-semibold text-brand">
            {t('competition.cta.livestreamPeriod')}
          </span>
          <span>2026.07.27</span>
          <span className="text-neutral-300">—</span>
          <span>2026.08.26</span>
        </div>

        <a
          href="#/reserve"
          className="btn-pill mt-12 bg-brand px-8 py-4 text-base text-white shadow-lg shadow-brand/20 hover:opacity-90"
        >
          {t('competition.cta.book')}
        </a>
      </div>
    </section>
  );
}
