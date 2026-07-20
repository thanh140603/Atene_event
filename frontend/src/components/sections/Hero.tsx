import type { EventInfo } from '../../types';
import TokuPackLogo from '../TokuPackLogo';
import { homeAssets } from '../../lib/homeAssets';

export default function Hero({ event }: { event: EventInfo }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-brand-dark text-white"
    >
      {/* Pink radial glow (transparent PNG) */}
      <img
        src={homeAssets.heroGlow}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] max-w-none -translate-x-1/2 -translate-y-1/3 opacity-80"
      />

      <div className="section-container relative flex flex-col items-center py-24 text-center sm:py-28">
        <p className="text-xs font-semibold tracking-[0.35em] text-neutral-300 sm:text-sm">
          {event.heroKicker}
        </p>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
          {event.heroTitle}
        </h1>

        <div className="mt-10 flex flex-col items-center gap-3">
          <TokuPackLogo size={92} />
          <p className="text-xs tracking-widest text-neutral-300">
            {event.poweredBy}
          </p>
        </div>

        <p className="mt-12 max-w-xl text-sm text-neutral-300">
          {event.heroTagline}
        </p>
        <p className="mt-1 text-sm font-semibold text-white">
          {event.heroTaglineEmphasis}
        </p>
      </div>
    </section>
  );
}
