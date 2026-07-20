import type { EventInfo } from '../../types';
import { useCountdown } from '../../hooks/useCountdown';
import { useT } from '../../i18n/LanguageProvider';

const pad = (n: number) => String(n).padStart(2, '0');

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-5xl font-light tabular-nums tracking-tight text-neutral-900 sm:text-7xl">
        {pad(value)}
      </span>
      <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-400 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span className="text-4xl font-light text-neutral-300 sm:text-6xl">:</span>
  );
}

function formatEventDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${y}.${m}.${day} | ${hh}:${mm}`;
}

export default function Countdown({ event }: { event: EventInfo }) {
  const c = useCountdown(event.eventDate);
  const t = useT();

  return (
    <section className="relative overflow-hidden bg-white">
      {/* subtle top glow continuing from hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-52 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, #ffb3d1 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      <div className="section-container relative py-16 sm:py-20">
        <div className="flex items-start justify-center gap-3 sm:gap-6">
          <Unit value={c.days} label={t('home.countdown.days')} />
          <Colon />
          <Unit value={c.hours} label={t('home.countdown.hours')} />
          <Colon />
          <Unit value={c.minutes} label={t('home.countdown.minutes')} />
          <Colon />
          <Unit value={c.seconds} label={t('home.countdown.seconds')} />
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs tracking-[0.2em] text-neutral-500 sm:text-sm">
            {event.venue}
          </p>
          <p className="mt-2 text-lg font-bold tracking-tight text-neutral-900">
            {formatEventDate(event.eventDate)}
          </p>
        </div>
      </div>
    </section>
  );
}
