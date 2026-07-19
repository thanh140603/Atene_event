import type { EventInfo } from '../../types';

export default function HowItWorks({ event }: { event: EventInfo }) {
  return (
    <section id="how" className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">How It Works</h2>
        <div className="heading-rule" />

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-neutral-600">
          Creators who joined Creator Sourcing Day get exclusive access to
          discover participating brands, experience Tokupack, and reserve their
          livestream slot.
        </p>

        <div className="relative mt-16">
          {/* connector line */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-neutral-200 md:block" />

          <ol className="grid grid-cols-2 gap-y-10 md:grid-cols-6 md:gap-y-0">
            {event.steps.map((step, i) => (
              <li
                key={step.id}
                className="relative flex flex-col items-center text-center"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                    i === 0
                      ? 'bg-neutral-900 text-white'
                      : 'border border-neutral-300 bg-white text-neutral-900'
                  }`}
                >
                  {step.stepNumber}
                </div>
                <p className="mt-4 text-sm font-bold text-neutral-900">
                  {step.title}
                </p>
                <p className="mt-1 text-[11px] text-neutral-400">
                  {step.subtitle}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
