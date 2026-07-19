interface Reward {
  n: string;
  title: string;
  body: string;
}

const rewards: Reward[] = [
  {
    n: '01',
    title: '韓国5日間招待旅行',
    body: 'フライト・宿泊すべてATENEが負担。上位5名を限定招待し、K-Beautyの本場ソウルを巡ります。',
  },
  {
    n: '02',
    title: 'ブランドとの直接対談',
    body: '現地でK-Beautyブランド担当者と直接ミーティング。次のコラボや商品企画につなげます。',
  },
  {
    n: '03',
    title: '優先コラボレーション',
    body: 'TikTok Shop・ライブ配信・商品レビュー・SNS施策で、参加ブランドとの優先的な協業機会を獲得。',
  },
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

function BoardingPass() {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 shadow-sm">
      <div className="flex flex-col md:flex-row">
        {/* Main ticket */}
        <div className="flex-1 p-8 sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
            Boarding Pass — Creator Invitation
          </p>

          <div className="mt-6 flex items-center gap-4 sm:gap-6">
            <span className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              TOKYO
            </span>
            <span className="text-2xl text-brand sm:text-3xl" aria-hidden>
              ✈
            </span>
            <span className="text-3xl font-extrabold tracking-tight text-brand sm:text-5xl">
              SEOUL
            </span>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            <PassField label="Duration" value="5 Days" />
            <PassField label="Flight & Stay" value="Fully Covered" />
            <PassField label="Passengers" value="Top 5 Creators" />
          </div>

          <p className="mt-8 max-w-lg text-xs leading-relaxed text-neutral-500">
            ATENEと巡る韓国招待旅行。フライト・宿泊すべて負担で、
            K-Beautyブランドとの対面ミーティングも実現します。
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
              TOP 5
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
              GMV Rank
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
  return (
    <section className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
          04 / Rewards
        </p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
          WHAT YOU
          <br />
          CAN WIN
        </h2>
        <div className="mt-6 h-px w-full bg-neutral-200" />

        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
          For The Top 5
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600">
          単なる旅行招待ではありません。K-Beautyブランドと直接つながり、
          次の活動機会を広げるための特別な招待状です。
        </p>

        <BoardingPass />

        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
          {rewards.map((r) => (
            <div key={r.n} className="bg-white p-6">
              <p className="text-xs font-bold text-neutral-400">{r.n}</p>
              <p className="mt-3 text-base font-bold text-neutral-900">
                {r.title}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-500">
                {r.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-brand">
          Entry Now Open
        </p>
      </div>
    </section>
  );
}
