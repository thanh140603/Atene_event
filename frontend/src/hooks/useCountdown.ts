import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function diff(target: number): Countdown {
  const now = Date.now();
  let delta = Math.max(0, target - now);
  const isPast = target - now <= 0;

  const days = Math.floor(delta / 86_400_000);
  delta -= days * 86_400_000;
  const hours = Math.floor(delta / 3_600_000);
  delta -= hours * 3_600_000;
  const minutes = Math.floor(delta / 60_000);
  delta -= minutes * 60_000;
  const seconds = Math.floor(delta / 1000);

  return { days, hours, minutes, seconds, isPast };
}

/** Ticks every second toward an ISO target date. */
export function useCountdown(targetIso?: string): Countdown {
  const target = targetIso ? new Date(targetIso).getTime() : 0;
  const [state, setState] = useState<Countdown>(() => diff(target));

  useEffect(() => {
    if (!targetIso) return;
    setState(diff(target));
    const id = setInterval(() => setState(diff(target)), 1000);
    return () => clearInterval(id);
  }, [targetIso, target]);

  return state;
}
