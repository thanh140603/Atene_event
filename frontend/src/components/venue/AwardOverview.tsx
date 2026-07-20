import { useT } from '../../i18n/LanguageProvider';

interface Step {
  n: string;
  key: string;
}

const steps: Step[] = [
  { n: '01', key: 'venue.overview.step1' },
  { n: '02', key: 'venue.overview.step2' },
  { n: '03', key: 'venue.overview.step3' },
  { n: '04', key: 'venue.overview.step4' },
];

export default function AwardOverview() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container py-16 sm:py-20">
        <h3 className="text-lg font-bold leading-relaxed text-neutral-900 sm:text-xl">
          {t('venue.overview.heading.pre')}
          {t('venue.overview.heading.hi')}
          {t('venue.overview.heading.post')}
          <br className="hidden sm:block" />
          {t('venue.overview.headingLine2')}
        </h3>
        <p className="mt-3 text-xs font-medium tracking-wide text-neutral-400">
          {t('venue.overview.date')}
        </p>

        <div className="mt-8 max-w-3xl space-y-5 text-sm leading-relaxed text-neutral-600">
          <p className="font-semibold text-neutral-800">
            {t('venue.overview.lead')}
          </p>
          <p>{t('venue.overview.p1')}</p>
          <p>{t('venue.overview.p2')}</p>
        </div>

        {/* 参加方法 */}
        <fieldset className="mt-14 border border-neutral-700">
          <legend className="ml-6 flex items-center gap-2 px-1 text-sm font-bold text-neutral-900 sm:ml-8">
            <span className="h-px w-5 bg-neutral-900" />
            {t('venue.overview.howToTitle')}
          </legend>

          <ol className="pb-2">
            {steps.map((s, i) => (
              <li key={s.n} className="px-6 pt-5 sm:px-8">
                <div className="flex gap-4">
                  <span className="shrink-0 text-xs font-semibold text-neutral-500">{s.n}.</span>
                  <p className="text-sm leading-relaxed text-neutral-700">{t(s.key)}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-5 border-b border-dashed border-neutral-400" />
                )}
              </li>
            ))}
          </ol>
        </fieldset>
      </div>
    </section>
  );
}
