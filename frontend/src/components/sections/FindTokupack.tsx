export default function FindTokupack() {
  return (
    <section className="bg-white">
      <div className="section-container pb-20 sm:pb-24">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-14 sm:px-14"
          style={{
            background:
              'linear-gradient(120deg, #f4f4f5 0%, #eef0f3 40%, #e9eef2 100%)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, #ffc4de 0%, rgba(255,255,255,0) 70%)',
            }}
          />
          <div className="relative max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
              お気に入りの<span className="text-brand">TOKUPACK</span>を見つけよう
            </h2>
            <p className="mt-5 text-sm font-semibold text-neutral-700">
              TikTokでは、まだ出会えない。
              <br />
              その特別な構成を、誰よりも先に。
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              気になるセットを事前に選んで、
              <br />
              イベント当日の特別なK-Beauty体験へ。
            </p>
            <a
              href="#/tokupack"
              className="btn-pill mt-8 bg-neutral-900 text-white hover:opacity-90"
            >
              TOKUPACKを選ぶ →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
