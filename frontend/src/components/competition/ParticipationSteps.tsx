import { useT } from '../../i18n/LanguageProvider';
import type { TFunc } from '../../i18n/LanguageProvider';

interface Step {
  n: string;
  key: string;
}

const steps: Step[] = [
  { n: '01', key: 's1' },
  { n: '02', key: 's2' },
  { n: '03', key: 's3' },
  { n: '04', key: 's4' },
];

function Circle({ n }: { n: string }) {
  return (
    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-brand/60 bg-white text-sm font-bold text-neutral-900">
      {n}
    </div>
  );
}

function Label({
  n,
  t,
  className = '',
}: {
  n: string;
  t: TFunc;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-400 ${className}`}
    >
      {t('competition.steps.stepLabel', { n })}
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
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container py-10 sm:py-12">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
            {t('competition.steps.kicker')}
          </p>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-3xl">
            {t('competition.steps.title')}
          </h2>
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
              const body = t(`competition.steps.${step.key}`);
              return (
                <li key={step.n}>
                  <div className="grid grid-cols-[auto_1fr] items-center gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-10">
                    {/* left column (md and up) */}
                    <div className="hidden md:flex md:justify-end">
                      {contentLeft ? (
                        <Body body={body} className="text-right" />
                      ) : (
                        <Label n={step.n} t={t} className="text-right" />
                      )}
                    </div>

                    <Circle n={step.n} />

                    {/* right column — always holds content on mobile */}
                    <div>
                      <div className="md:hidden">
                        <Body body={body} />
                      </div>
                      <div className="hidden md:block">
                        {contentLeft ? (
                          <Label n={step.n} t={t} />
                        ) : (
                          <Body body={body} />
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
