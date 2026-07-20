import { useT } from '../../i18n/LanguageProvider';

const summary = [
  'venue.prizes.summary1',
  'venue.prizes.summary2',
  'venue.prizes.summary3',
];

const detail = [
  { n: '①', key: 'venue.prizes.detail1' },
  { n: '②', key: 'venue.prizes.detail2' },
  { n: '③', key: 'venue.prizes.detail3' },
];

export default function AwardPrizes() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container py-16 sm:py-20">
        <div className="flex items-center gap-3">
          <span className="h-[3px] w-8 rounded-full bg-brand" />
          <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900">
            {t('venue.prizes.heading')}
          </h3>
        </div>

        <ul className="mt-6 max-w-3xl space-y-1.5 text-sm leading-relaxed text-neutral-700">
          {summary.map((s) => (
            <li key={s}>{t(s)}</li>
          ))}
        </ul>

        {/* SOUTH KOREA visual — placeholder banner framed in brand pink,
            matching the reference image. */}
        <div className="mt-10 overflow-hidden rounded-2xl border-2 border-brand">
          <div className="relative bg-brand-dark">
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black"
            />
            {/* stylised palace-roof silhouette */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 opacity-30"
              style={{
                background:
                  'repeating-linear-gradient(135deg, rgba(236,15,140,0.5) 0 10px, transparent 10px 22px)',
              }}
            />
            <div className="relative flex min-h-[240px] items-center justify-center px-6 py-16 sm:min-h-[320px]">
              <p className="text-center text-4xl font-extrabold uppercase tracking-tight text-brand drop-shadow-[0_2px_10px_rgba(236,15,140,0.4)] sm:text-7xl">
                {t('venue.prizes.banner')}
              </p>
            </div>
          </div>

          {/* framed prize detail box */}
          <div className="bg-brand-dark px-6 py-8 sm:px-10">
            <p className="text-lg font-bold text-brand">{t('venue.prizes.heading')}</p>
            <ol className="mt-5 space-y-4">
              {detail.map((d) => (
                <li key={d.n} className="flex gap-3 text-sm leading-relaxed text-neutral-200">
                  <span className="font-bold text-brand">{d.n}</span>
                  <span>{t(d.key)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
