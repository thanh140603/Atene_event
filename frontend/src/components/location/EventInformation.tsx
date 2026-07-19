import { GMAP_URL } from './AccessMap';
import type { ReactNode } from 'react';

interface Row {
  label: string;
  value: ReactNode;
}

const rows: Row[] = [
  {
    label: 'Address',
    value: (
      <>
        <p>InterContinental the Strings Tokyo by IHG</p>
        <a
          href={GMAP_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-block text-brand underline underline-offset-2 hover:opacity-80"
        >
          View on the map
        </a>
      </>
    ),
  },
  { label: 'Phone', value: '+82 10 3104 9414' },
  { label: 'Date', value: '2026年7月23日' },
  { label: 'Time', value: '13:00 ~ 17:00' },
  { label: '入場', value: 'Have your e-ticket ready for check-in upon arrival' },
];

export default function EventInformation() {
  return (
    <section className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">Information</h2>
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
