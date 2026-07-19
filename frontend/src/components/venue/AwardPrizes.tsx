const summary = [
  'ATENEが航空券・宿泊費を全額サポートする韓国3日間ツアー',
  'ATENE提携ブランド＆人気K-Beautyブランドと直接交流',
  'ATENEおよび提携ブランドとの今後のコラボレーション案件',
];

const detail = [
  {
    n: '①',
    body: 'ATENEが航空券・宿泊費を全額サポートする韓国3日間ツアー',
  },
  {
    n: '②',
    body: 'ATENE提携ブランド＆人気K-Beautyブランドと直接交流',
  },
  {
    n: '③',
    body: 'ATENEおよび提携ブランドとの今後のコラボレーション案件（TikTok Shop・ライブ配信・商品レビュー・SNSキャンペーンなど）の優先選考対象に',
  },
];

export default function AwardPrizes() {
  return (
    <section className="bg-white">
      <div className="section-container py-16 sm:py-20">
        <div className="flex items-center gap-3">
          <span className="h-[3px] w-8 rounded-full bg-brand" />
          <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900">
            賞品
          </h3>
        </div>

        <ul className="mt-6 max-w-3xl space-y-1.5 text-sm leading-relaxed text-neutral-700">
          {summary.map((s) => (
            <li key={s}>{s}</li>
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
                South Korea
              </p>
            </div>
          </div>

          {/* framed prize detail box */}
          <div className="bg-brand-dark px-6 py-8 sm:px-10">
            <p className="text-lg font-bold text-brand">賞品</p>
            <ol className="mt-5 space-y-4">
              {detail.map((d) => (
                <li key={d.n} className="flex gap-3 text-sm leading-relaxed text-neutral-200">
                  <span className="font-bold text-brand">{d.n}</span>
                  <span>{d.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
