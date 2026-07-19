interface Step {
  n: string;
  body: string;
}

const steps: Step[] = [
  {
    n: '01',
    body: 'Creator Sourcing Dayに参加する',
  },
  {
    n: '02',
    body: 'イベントでお気に入りの瞬間を撮影したショート動画を、TikTokまたはInstagram Reelsに投稿する',
  },
  {
    n: '03',
    body: '指定のハッシュタグ #CreatorSourcingDay #トクパック をつけて投稿し、Best Content Awardへエントリー',
  },
];

export default function AwardOverview() {
  return (
    <section className="bg-white">
      <div className="section-container py-16 sm:py-20">
        <h3 className="text-lg font-bold leading-relaxed text-neutral-900 sm:text-xl">
          〈ATENE〉Best Content Award開催決定。
          <br className="hidden sm:block" />
          イベントの瞬間を切り取って、韓国K-Beauty体験を手に入れよう
        </h3>
        <p className="mt-3 text-xs font-medium tracking-wide text-neutral-400">
          2026.07.23
        </p>

        <div className="mt-8 max-w-3xl space-y-5 text-sm leading-relaxed text-neutral-600">
          <p className="font-semibold text-neutral-800">
            特別なTokupackを、誰よりも早くファンへ。
          </p>
          <p>
            Creator Sourcing Dayでは、人気K-Beautyブランドの限定Tokupackをいち早く体験できる特別な機会をご用意しています。
            イベントで見つけたお気に入りの商品を、あなたらしい視点で発信し、ファンに特別な情報を届けませんか？
            さらに、イベントの瞬間を撮影したショート動画を投稿することで「Best Content Award」へエントリー。
          </p>
          <p>
            受賞者には韓国3日間ツアーをはじめ、豪華賞品や今後のブランドコラボレーションにつながる特別な機会をご用意しています。
          </p>
        </div>

        {/* 参加方法 */}
        <div className="mt-14 rounded-2xl border border-neutral-200 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="h-[3px] w-8 rounded-full bg-brand" />
            <p className="text-base font-bold text-neutral-900">参加方法</p>
          </div>

          <ol className="mt-8 space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="pt-0.5 text-xs font-bold text-brand">{s.n}</span>
                <p className="text-sm leading-relaxed text-neutral-700">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
