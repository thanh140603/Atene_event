import { useMemo, useState } from 'react';
import type { EventInfo, Slot } from '../../types';
import { api } from '../../lib/api';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const pad = (n: number) => String(n).padStart(2, '0');
const toIso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const prettyDate = (iso: string) => iso.replace(/-/g, '.');

function monthLabel(iso: string) {
  const [y, m] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export default function ReserveLivestream({ event }: { event: EventInfo }) {
  const start = event.campaignStart; // "2026-07-27"
  const end = event.campaignEnd; // "2026-08-26"

  const [year, setYear] = useState(() => Number(start.split('-')[0]));
  const [month, setMonth] = useState(() => Number(start.split('-')[1]) - 1); // 0-based

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);

  const [slotDate, setSlotDate] = useState<string>('');
  const [startTime, setStartTime] = useState('18:00');
  const [endTime, setEndTime] = useState('21:00');

  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');

  const inCampaign = (iso: string) => iso >= start && iso <= end;

  const cells = useMemo(() => {
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [year, month]);

  const toggleDate = (iso: string) => {
    setSelectedDates((prev) =>
      prev.includes(iso)
        ? prev.filter((d) => d !== iso)
        : [...prev, iso].sort(),
    );
    setSlotDate((cur) => cur || iso);
  };

  const changeMonth = (delta: number) => {
    let m = month + delta;
    let y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setMonth(m);
    setYear(y);
  };

  const addSlot = () => {
    const date = slotDate || selectedDates[0];
    if (!date) return;
    setSlots((prev) => [...prev, { date, start: startTime, end: endTime }]);
  };

  const removeSlot = (idx: number) =>
    setSlots((prev) => prev.filter((_, i) => i !== idx));

  const book = async () => {
    if (selectedDates.length === 0) return;
    setStatus('saving');
    try {
      await api.createBooking({ dates: selectedDates, slots });
      setStatus('done');
      setSelectedDates([]);
      setSlots([]);
    } catch {
      setStatus('error');
    }
  };

  const currentIso = `${year}-${pad(month + 1)}-01`;

  return (
    <section id="reserve" className="bg-white">
      <div className="section-container grid grid-cols-1 gap-10 py-20 sm:py-24 lg:grid-cols-2">
        {/* ---- Calendar ---- */}
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => changeMonth(-1)}
              className="text-neutral-400 transition hover:text-neutral-900"
              aria-label="Previous month"
            >
              ‹
            </button>
            <h3 className="rounded border border-brand px-2 py-1 text-xl font-extrabold tracking-tight">
              {monthLabel(currentIso)}
            </h3>
            <button
              onClick={() => changeMonth(1)}
              className="text-neutral-400 transition hover:text-neutral-900"
              aria-label="Next month"
            >
              ›
            </button>
            <p className="ml-auto text-xs text-neutral-500">
              Campaign period: {monthLabel(start).split(' ')[0]}{' '}
              {Number(start.split('-')[2])} – {monthLabel(end).split(' ')[0]}{' '}
              {Number(end.split('-')[2])}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-2">
            {WEEKDAYS.map((w) => (
              <div
                key={w}
                className="pb-2 text-center text-xs font-semibold text-neutral-600"
              >
                {w}
              </div>
            ))}
            {cells.map((day, i) => {
              if (day === null) return <div key={`e${i}`} />;
              const iso = toIso(year, month, day);
              const selectable = inCampaign(iso);
              const selected = selectedDates.includes(iso);
              return (
                <button
                  key={iso}
                  disabled={!selectable}
                  onClick={() => toggleDate(iso)}
                  className={[
                    'flex h-14 items-start justify-start rounded-md p-2 text-sm transition',
                    selected
                      ? 'bg-brand font-bold text-white'
                      : selectable
                        ? 'bg-neutral-100 text-neutral-800 hover:bg-brand/10'
                        : 'bg-neutral-50 text-neutral-300',
                  ].join(' ')}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- Booking panel ---- */}
        <div>
          <h3 className="text-xl font-bold tracking-tight">
            Reserve Your Livestream
          </h3>
          <p className="mt-2 max-w-md text-sm text-neutral-500">
            Select date(s) from the calendar, then set your livestream time
            window(s) and reserve a slot on the Atene TikTok shop.
          </p>

          <div className="mt-6 rounded-2xl border border-neutral-200 p-6 shadow-sm">
            {/* Selected dates */}
            <p className="text-sm font-semibold">Selected Date(s)</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedDates.length === 0 ? (
                <span className="text-xs text-neutral-400">
                  Pick one or more highlighted days.
                </span>
              ) : (
                selectedDates.map((d, i) => (
                  <span
                    key={d}
                    className={[
                      'rounded-full px-3 py-1 text-xs font-medium',
                      i === 0
                        ? 'bg-neutral-900 text-white'
                        : 'border border-neutral-300 text-neutral-700',
                    ].join(' ')}
                  >
                    {prettyDate(d)}
                  </span>
                ))
              )}
            </div>

            {/* Time picker */}
            <p className="mt-6 text-sm font-semibold">Livestream Period(s)</p>
            <p className="mt-1 text-xs text-neutral-400">
              Select your desired livestream time.
            </p>

            <div className="mt-3 flex items-center gap-2">
              {selectedDates.length > 1 && (
                <select
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  className="rounded-md bg-neutral-100 px-2 py-2 text-sm"
                >
                  {selectedDates.map((d) => (
                    <option key={d} value={d}>
                      {prettyDate(d)}
                    </option>
                  ))}
                </select>
              )}
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="rounded-md bg-neutral-100 px-3 py-2 text-sm"
              />
              <span className="text-neutral-400">→</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="rounded-md bg-neutral-100 px-3 py-2 text-sm"
              />
              <button
                onClick={addSlot}
                disabled={selectedDates.length === 0}
                className="ml-1 flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 text-lg text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-40"
                aria-label="Add time slot"
              >
                +
              </button>
            </div>

            {/* Saved slots */}
            {slots.length > 0 && (
              <ul className="mt-4 space-y-2">
                {slots.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2 text-sm"
                  >
                    <span className="text-neutral-700">
                      {prettyDate(s.date)} <span className="text-neutral-300">|</span>{' '}
                      {s.start} – {s.end}
                    </span>
                    <button
                      onClick={() => removeSlot(i)}
                      className="text-neutral-400 transition hover:text-brand"
                      aria-label="Remove slot"
                    >
                      🗑
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex items-center justify-between">
              <div className="text-xs">
                {status === 'done' && (
                  <span className="font-medium text-green-600">
                    Reserved! We’ll be in touch.
                  </span>
                )}
                {status === 'error' && (
                  <span className="font-medium text-brand">
                    Something went wrong. Try again.
                  </span>
                )}
              </div>
              <button
                onClick={book}
                disabled={selectedDates.length === 0 || status === 'saving'}
                className="btn-pill bg-neutral-900 text-white hover:opacity-90 disabled:opacity-40"
              >
                {status === 'saving' ? 'Booking…' : 'Book Live'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
