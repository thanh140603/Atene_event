import { useT } from '../../i18n/LanguageProvider';

export default function AwardSelection() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container py-8 sm:py-10">
        <div className="flex items-center gap-3">
          <span className="h-[3px] w-8 rounded-full bg-brand" />
          <h3 className="text-xl font-bold text-neutral-900 sm:text-2xl">
            {t('venue.selection.heading')}
          </h3>
        </div>

        <p className="mt-6 max-w-3xl text-justify text-sm leading-relaxed text-neutral-700">
          {t('venue.selection.body.pre')}
          <span className="font-bold text-neutral-900">
            {t('venue.selection.body.hi')}
          </span>
          {t('venue.selection.body.post')}
        </p>
        <p className="mt-4 max-w-3xl text-justify text-xs leading-relaxed text-neutral-400">
          {t('venue.selection.note')}
        </p>

        {/* 応募期間 */}
        <div className="mt-8 inline-flex flex-col rounded-xl border border-neutral-200 px-5 py-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
            {t('venue.selection.periodLabel')}
          </p>
          <p className="mt-1 text-lg font-extrabold tracking-tight text-neutral-900 sm:text-xl">
            07.23 <span className="text-brand">—</span> 07.31
          </p>
        </div>

        {/* closing band */}
        <div className="mt-10 rounded-2xl bg-neutral-50 px-6 py-10 text-center sm:px-10">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-neutral-600">
            {t('venue.selection.closing')}
            <br className="hidden sm:block" />
            {t('venue.selection.closingLine2')}
          </p>
          <p className="mt-6 text-sm font-bold tracking-wide text-brand">
            #CreatorSourcingDay&nbsp;&nbsp;#トクパック
          </p>
        </div>
      </div>
    </section>
  );
}
