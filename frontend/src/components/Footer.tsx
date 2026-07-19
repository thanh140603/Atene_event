import type { EventInfo } from '../types';
import TokuPackLogo from './TokuPackLogo';

export default function Footer({ event }: { event: EventInfo }) {
  return (
    <footer className="bg-brand-dark text-neutral-400">
      <div className="section-container flex flex-col items-center gap-4 py-12 text-center">
        <TokuPackLogo size={48} />
        <p className="text-sm font-semibold text-white">{event.heroTitle}</p>
        <p className="text-xs">{event.venue}</p>
        <p className="text-xs">{event.poweredBy}</p>
        <p className="mt-4 text-[11px] text-neutral-500">
          © 2026 ATENE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
