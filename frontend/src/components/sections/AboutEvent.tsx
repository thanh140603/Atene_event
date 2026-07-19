import type { EventInfo } from '../../types';
import TokuPackLogo from '../TokuPackLogo';

export default function AboutEvent({ event }: { event: EventInfo }) {
  return (
    <section id="about" className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">About The Event</h2>
        <div className="heading-rule" />

        <p className="mt-8 text-center text-base text-neutral-600 sm:text-lg">
          {event.aboutSubtitle}
        </p>

        {/* Logo with left/right annotations */}
        <div className="mt-14 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-14">
          <div className="text-center sm:text-right">
            <p className="text-sm font-bold text-brand">トク（得）</p>
            <p className="mt-1 text-xs text-neutral-500">お得・メリット</p>
          </div>

          <TokuPackLogo size={132} />

          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-brand">パック（Pack）</p>
            <p className="mt-1 text-xs text-neutral-500">セット・商品構成</p>
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-neutral-600 sm:text-base">
          {event.aboutBody}
        </p>
      </div>
    </section>
  );
}
