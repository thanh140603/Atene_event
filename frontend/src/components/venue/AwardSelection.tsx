export default function AwardSelection() {
  return (
    <section className="bg-white">
      <div className="section-container py-16 sm:py-20">
        <div className="flex items-center gap-3">
          <span className="h-[3px] w-8 rounded-full bg-brand" />
          <h3 className="text-xl font-bold text-neutral-900 sm:text-2xl">
            受賞者の選考方法
          </h3>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-neutral-700">
          イベント終了後、対象となる投稿を1週間集計し、期間中に
          <span className="font-bold text-neutral-900">
            最も多くのオーガニック再生数（ビュー数）を獲得した動画
          </span>
          を投稿したクリエイターが、「ベストコンテンツ賞」を受賞します。
        </p>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-neutral-400">
          ※ご注意：広告配信による再生数は対象外となります。オーガニック（自然流入）による再生数のみが選考対象です。
        </p>

        {/* 応募期間 */}
        <div className="mt-12 inline-flex flex-col rounded-2xl border border-neutral-200 px-8 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
            応募期間
          </p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
            07.23 <span className="text-brand">—</span> 07.31
          </p>
        </div>

        {/* closing band */}
        <div className="mt-16 rounded-2xl bg-neutral-50 px-6 py-10 text-center sm:px-10">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-neutral-600">
            あなたらしいコンテンツで、Creator Sourcing Dayを盛り上げましょう！
            <br className="hidden sm:block" />
            皆さまの素敵な投稿を楽しみにしています。
          </p>
          <p className="mt-6 text-sm font-bold tracking-wide text-brand">
            #CreatorSourcingDay&nbsp;&nbsp;#トクパック
          </p>
        </div>
      </div>
    </section>
  );
}
