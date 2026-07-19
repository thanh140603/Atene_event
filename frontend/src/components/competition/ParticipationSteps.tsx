interface Step {
  n: string;
  body: string;
}

const steps: Step[] = [
  {
    n: '01',
    body: 'Creator Sourcing Dayに参加し、20以上のトクパックを実際に体験。気になるセットを見つけます。',
  },
  {
    n: '02',
    body: '販売したいトクパックを選び、2026.07.27〜08.26の期間中にTikTok Liveで販売を開始します。',
  },
  {
    n: '03',
    body: 'TikTok Shop上でGMVを自動計測。販売できるトクパックの数に制限はありません。',
  },
  {
    n: '04',
    body: 'ライブ販売の結果とコンテンツを投稿し、ランキングにエントリー。上位5名を韓国招待へ。',
  },
];

function Circle({ n }: { n: string }) {
  return (
    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-brand/60 bg-white text-sm font-bold text-neutral-900">
      {n}
    </div>
  );
}

function Label({ n, className = '' }: { n: string; className?: string }) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-400 ${className}`}
    >
      Step {n}
    </p>
  );
}

function Body({ body, className = '' }: { body: string; className?: string }) {
  return (
    <p className={`max-w-sm text-sm leading-relaxed text-neutral-600 ${className}`}>
      {body}
    </p>
  );
}

export default function ParticipationSteps() {
  return (
    <section className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
            PARTICIPATION
            <br />
            STEPS
          </h2>
          <p className="max-w-xs text-xs leading-relaxed text-neutral-400 sm:text-right">
            よっつのステップで、Creator Sourcing Dayでの出会いを韓国招待へつなげます。
          </p>
        </div>

        <div className="relative mt-16">
          {/* center connector line */}
          <div
            aria-hidden
            className="absolute bottom-4 left-7 top-4 w-px bg-neutral-200 md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const contentLeft = i % 2 === 1;
              return (
                <li key={step.n}>
                  <div className="grid grid-cols-[auto_1fr] items-center gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-10">
                    {/* left column (md and up) */}
                    <div className="hidden md:flex md:justify-end">
                      {contentLeft ? (
                        <Body body={step.body} className="text-right" />
                      ) : (
                        <Label n={step.n} className="text-right" />
                      )}
                    </div>

                    <Circle n={step.n} />

                    {/* right column — always holds content on mobile */}
                    <div>
                      <div className="md:hidden">
                        <Body body={step.body} />
                      </div>
                      <div className="hidden md:block">
                        {contentLeft ? (
                          <Label n={step.n} />
                        ) : (
                          <Body body={step.body} />
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
