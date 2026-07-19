import { useT } from '../../i18n/LanguageProvider';

interface Step {
  n: string;
  key: string;
}

const steps: Step[] = [
  { n: '01', key: 'venue.overview.step1' },
  { n: '02', key: 'venue.overview.step2' },
  { n: '03', key: 'venue.overview.step3' },
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
        <div className="mt-14 rounded-2xl border border-neutral-200 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="h-[3px] w-8 rounded-full bg-brand" />
            <p className="text-base font-bold text-neutral-900">
              {t('venue.overview.howToTitle')}
            </p>
          </div>

          <ol className="mt-8 space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="pt-0.5 text-xs font-bold text-brand">{s.n}</span>
                <p className="text-sm leading-relaxed text-neutral-700">{t(s.key)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
