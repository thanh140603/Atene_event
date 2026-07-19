const ENTRY_START = '2026.07.27';
const ENTRY_END = '2026.08.26';

function DateBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="h-[3px] w-8 rounded-full bg-brand" />
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
        {label}
      </p>
      <p className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
        {value}
      </p>
    </div>
  );
}

export default function CompetitionHero() {
  return (
    <section id="top" className="bg-white">
      <div className="section-container py-20 sm:py-28">
        <p className="text-sm font-semibold tracking-[0.35em] text-neutral-500">
          〈ATENE〉
        </p>

        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl">
          KOREA INVITATION
          <br />
          CHALLENGE <span className="text-brand">—</span>
          <br />
          BEST TOKUPACK SELLER
        </h1>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-neutral-500 sm:text-base">
          Creator Sourcing Dayで出会ったトクパックを、TikTok Liveで販売しよう。
          GMVランキング上位5名には、韓国5日間の招待旅行と、K-Beautyブランドとの
          直接対談チャンスが待っています。
        </p>

        <div className="mt-14 flex flex-wrap gap-x-16 gap-y-8">
          <DateBlock label="Entry Period Start" value={ENTRY_START} />
          <DateBlock label="Entry Period End" value={ENTRY_END} />
        </div>
      </div>
    </section>
  );
}
