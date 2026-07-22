import { useT } from '../../i18n/LanguageProvider';
import type { TFunc } from '../../i18n/LanguageProvider';

interface Reward {
  n: string;
  key: string;
}

const rewards: Reward[] = [
  { n: '01', key: 'r1' },
  { n: '02', key: 'r2' },
  { n: '03', key: 'r3' },
];

// Varying bar widths (px) to fake a printed barcode on the ticket stub.
const barcode = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2, 1, 3, 2, 1];

function PassField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-[10px]">
        {label}
      </p>
      <p className="mt-1.5 text-xs font-bold text-neutral-900 sm:text-sm">
        {value}
      </p>
    </div>
  );
}

function BoardingPass({ t }: { t: TFunc }) {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 shadow-sm">
      <div className="flex flex-col md:flex-row">
        {/* Main ticket */}
        <div className="flex-1 p-8 sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
            {t('competition.rewards.boardingPass.kicker')}
          </p>

          <div className="mt-6 flex items-center gap-4 sm:gap-6">
            <span className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              TOKYO
            </span>
            <span
              className="text-2xl text-brand sm:text-3xl"
              role="img"
              aria-label={t('competition.rewards.boardingPass.planeAlt')}
            >
              ✈
            </span>
            <span className="text-3xl font-extrabold tracking-tight text-brand sm:text-5xl">
              SEOUL
            </span>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            <PassField
              label={t('competition.rewards.boardingPass.durationLabel')}
              value={t('competition.rewards.boardingPass.durationValue')}
            />
            <PassField
              label={t('competition.rewards.boardingPass.coverageLabel')}
              value={t('competition.rewards.boardingPass.coverageValue')}
            />
            <PassField
              label={t('competition.rewards.boardingPass.passengersLabel')}
              value={t('competition.rewards.boardingPass.passengersValue')}
            />
          </div>

          <p className="mt-8 max-w-lg text-xs leading-relaxed text-neutral-500">
            {t('competition.rewards.boardingPass.body')}
          </p>
        </div>

        {/* Perforated stub */}
        <div className="relative flex items-center justify-center border-neutral-200 bg-neutral-50 p-8 md:w-56 md:border-l md:border-dashed">
          {/* tear notches on the seam */}
          <span
            aria-hidden
            className="absolute left-0 top-0 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block"
          />
          <span
            aria-hidden
            className="absolute bottom-0 left-0 hidden h-6 w-6 -translate-x-1/2 translate-y-1/2 rounded-full bg-white md:block"
          />

          <div className="text-center">
            <p className="text-3xl font-extrabold tracking-tight text-neutral-900">
              {t('competition.rewards.boardingPass.stubTop')}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
              {t('competition.rewards.boardingPass.stubRank')}
            </p>
            <div className="mt-6 flex h-12 items-stretch justify-center gap-[2px]">
              {barcode.map((w, i) => (
                <span
                  key={i}
                  className="bg-neutral-800"
                  style={{ width: w }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhatYouCanWin() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container py-10 sm:py-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
          {t('competition.rewards.kicker')}
        </p>
        <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-3xl">
          {t('competition.rewards.title')}
        </h2>
        <div className="mt-6 h-px w-full bg-neutral-200" />

        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
          {t('competition.rewards.forTop5')}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          {t('competition.rewards.lead')}
        </p>

        <BoardingPass t={t} />

        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
          {rewards.map((r) => (
            <div key={r.n} className="bg-white p-6">
              <p className="text-xs font-bold text-neutral-400">{r.n}</p>
              <p className="mt-3 text-base font-bold text-neutral-900">
                {t(`competition.rewards.${r.key}.title`)}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-500">
                {t(`competition.rewards.${r.key}.body`)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
