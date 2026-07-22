import { useT } from '../../i18n/LanguageProvider';

const ENTRY_START = '2026.07.27';
const ENTRY_END = '2026.08.26';

function DateBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="h-[3px] w-8 rounded-full bg-brand" />
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
        {label}
      </p>
      <p className="mt-2 text-xl font-extrabold tracking-tight text-neutral-900 sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

export default function CompetitionHero() {
  const t = useT();
  return (
    <section id="top" className="bg-white">
      <div className="section-container py-12 sm:py-14">
        <p className="text-sm font-semibold tracking-[0.35em] text-neutral-500">
          {t('competition.hero.eyebrow')}
        </p>

        <h1 className="mt-6 max-w-4xl text-2xl font-extrabold leading-snug tracking-tight text-neutral-900 sm:text-4xl">
          {t('competition.hero.title')}
        </h1>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-neutral-500 sm:text-base">
          {t('competition.hero.lead')}
        </p>

        <div className="mt-14 flex flex-wrap gap-x-16 gap-y-8">
          <DateBlock label={t('competition.hero.entryStart')} value={ENTRY_START} />
          <DateBlock label={t('competition.hero.entryEnd')} value={ENTRY_END} />
        </div>
      </div>
    </section>
  );
}
