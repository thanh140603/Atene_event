interface Row {
  rank: string;
  name: string;
  gmv: string;
  pct: number;
}

const rows: Row[] = [
  { rank: '01', name: 'Creator A', gmv: '¥5.0M+', pct: 100 },
  { rank: '02', name: 'Creator B', gmv: '¥4.6M', pct: 88 },
  { rank: '03', name: 'Creator C', gmv: '¥4.3M', pct: 78 },
  { rank: '04', name: 'Creator D', gmv: '¥3.7M', pct: 64 },
  { rank: '05', name: 'Creator E', gmv: '¥3.1M', pct: 52 },
];

const criteria = [
  'GMVは有効な（オーガニック）販売のみカウントされます。',
  '同着の場合は、期間内の総GMVが多い方を上位とします。',
  'それでも同じ場合は、ライブ配信の総数と転換率で判定します。',
];

export default function RankingCriteria() {
  return (
    <section className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
              03 / Ranking
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
              RANKING &amp;
              <br />
              CRITERIA
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-neutral-400 sm:text-right">
            評価はシンプルに。GMVのスピードと総額で決まります。
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Leaderboard preview */}
          <div className="rounded-2xl bg-neutral-50 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                Leaderboard — Live Preview
              </p>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Tracking
              </span>
            </div>

            <ul className="mt-8 space-y-6">
              {rows.map((r) => (
                <li key={r.rank}>
                  <div className="flex items-center gap-4">
                    <span className="w-6 text-sm font-bold text-brand">
                      {r.rank}
                    </span>
                    <span className="flex-1 text-sm font-medium text-neutral-700">
                      {r.name}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500">
                      {r.gmv}
                    </span>
                  </div>
                  <div className="ml-10 mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Evaluation */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Evaluation
            </p>
            <h3 className="mt-4 text-xl font-bold leading-relaxed text-neutral-900 sm:text-2xl">
              ¥5,000,000のGMVに最も早く到達した
              <br className="hidden sm:block" />
              上位5名が勝者です。
            </h3>

            <ol className="mt-8 space-y-5">
              {criteria.map((c, i) => (
                <li key={i} className="flex gap-4">
                  <span className="pt-0.5 text-xs font-bold text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-relaxed text-neutral-600">{c}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex items-center justify-between rounded-2xl border border-brand/30 bg-brand/5 px-6 py-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">
                  Top 5 Winners
                </p>
                <p className="mt-1 text-lg font-bold text-neutral-900">
                  韓国5日間招待へ
                </p>
              </div>
              <span className="text-4xl font-extrabold tracking-tight text-brand">
                05
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
