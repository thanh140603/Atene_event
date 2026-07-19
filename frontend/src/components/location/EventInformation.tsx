import { GMAP_URL } from './AccessMap';
import { useT } from '../../i18n/LanguageProvider';
import type { ReactNode } from 'react';

interface Row {
  label: string;
  value: ReactNode;
}

export default function EventInformation() {
  const t = useT();

  const rows: Row[] = [
    {
      label: t('location.info.addressLabel'),
      value: (
        <>
          <p>{t('location.info.addressValue')}</p>
          <a
            href={GMAP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-brand underline underline-offset-2 hover:opacity-80"
          >
            {t('location.info.viewMap')}
          </a>
        </>
      ),
    },
    { label: t('location.info.phoneLabel'), value: t('location.info.phoneValue') },
    { label: t('location.info.dateLabel'), value: t('location.info.dateValue') },
    { label: t('location.info.timeLabel'), value: t('location.info.timeValue') },
    {
      label: t('location.info.entryLabel'),
      value: t('location.info.entryValue'),
    },
  ];

  return (
    <section className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('location.info.title')}</h2>
        <div className="heading-rule" />

        <dl className="mx-auto mt-12 max-w-3xl border-t-2 border-neutral-900">
          {rows.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-1 gap-1 border-b border-neutral-200 py-6 sm:grid-cols-[160px_1fr] sm:gap-6"
            >
              <dt className="text-sm font-semibold text-neutral-500">
                {r.label}
              </dt>
              <dd className="text-sm leading-relaxed text-neutral-800">
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
