import { useEffect, useMemo, useState } from 'react';
import type { Brand, EventInfo, GoogleUser, Slot } from '../../types';
import { api } from '../../lib/api';
import { homeAssets } from '../../lib/homeAssets';
import { useAuth } from '../../auth/AuthProvider';
import { GOOGLE_CLIENT_ID, requestGoogleLogin } from '../../lib/google';
import { useT, useLang } from '../../i18n/LanguageProvider';
import type { Lang } from '../../i18n/config';

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS_BY_LANG: Record<Lang, string[]> = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ja: ['日', '月', '火', '水', '木', '金', '土'],
  ko: ['일', '월', '화', '수', '목', '금', '토'],
};

const pad = (n: number) => String(n).padStart(2, '0');
const toIso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const prettyDate = (iso: string) => iso.replace(/-/g, '.');

const hourSlot = (h: number) => ({ start: `${pad(h)}:00`, end: `${pad(h + 1)}:00` });

// One-hour slots from 8:00 AM to 12:00 AM (midnight), grouped by time of day.
const HOUR_GROUPS = [
  { key: 'morning', hours: [8, 9, 10, 11].map(hourSlot) },
  { key: 'afternoon', hours: [12, 13, 14, 15, 16, 17].map(hourSlot) },
  { key: 'evening', hours: [18, 19, 20, 21, 22, 23].map(hourSlot) },
] as const;

function monthYear(iso: string, lang: Lang) {
  const [y, m] = iso.split('-').map(Number);
  if (lang === 'ja') return `${y}年${m}月`;
  if (lang === 'ko') return `${y}년 ${m}월`;
  return `${MONTHS_EN[m - 1]} ${y}`;
}

function monthDay(iso: string, lang: Lang) {
  const [, m, d] = iso.split('-').map(Number);
  if (lang === 'ja') return `${m}月${d}日`;
  if (lang === 'ko') return `${m}월 ${d}일`;
  return `${MONTHS_EN[m - 1]} ${d}`;
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white">
      {n}
    </span>
  );
}

export default function ReserveLivestream({ event }: { event: EventInfo }) {
  const t = useT();
  const { lang } = useLang();
  const WEEKDAYS = WEEKDAYS_BY_LANG[lang];
  const start = event.campaignStart; // "2026-07-27"
  const end = event.campaignEnd; // "2026-08-26"

  const [year, setYear] = useState(() => Number(start.split('-')[0]));
  const [month, setMonth] = useState(() => Number(start.split('-')[1]) - 1); // 0-based

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [activeDate, setActiveDate] = useState<string>('');
  // Several brands can be active per day; picked hours apply to all of them.
  const [brandsByDate, setBrandsByDate] = useState<Record<string, string[]>>({});
  const [slots, setSlots] = useState<Slot[]>([]);

  const [brands, setBrands] = useState<Brand[]>([]);
  const { user, signIn } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [modalBusy, setModalBusy] = useState(false);

  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');

  useEffect(() => {
    api.getBrands(lang).then(setBrands).catch(() => setBrands([]));
  }, [lang]);

  // Logging out shouldn't leave the previous account's "Reserved!" banner up.
  useEffect(() => {
    if (!user) setStatus((s) => (s === 'done' ? 'idle' : s));
  }, [user]);

  const inCampaign = (iso: string) => iso >= start && iso <= end;

  const cells = useMemo(() => {
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [year, month]);

  // Clicking a day focuses it so the brand + time picker appear for that day.
  const toggleDate = (iso: string) => {
    if (selectedDates.includes(iso)) {
      const next = selectedDates.filter((d) => d !== iso);
      setSelectedDates(next);
      setSlots((s) => s.filter((x) => x.date !== iso));
      setBrandsByDate((b) => {
        const clone = { ...b };
        delete clone[iso];
        return clone;
      });
      if (activeDate === iso) setActiveDate(next[next.length - 1] ?? '');
    } else {
      setSelectedDates([...selectedDates, iso].sort());
      setActiveDate(iso);
    }
    if (status === 'done') setStatus('idle');
  };

  const changeMonth = (delta: number) => {
    let m = month + delta;
    let y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setMonth(m);
    setYear(y);
  };

  const activeBrands = activeDate ? brandsByDate[activeDate] ?? [] : [];

  const toggleBrandForActive = (brand: string) => {
    if (!activeDate) return;
    const isRemoving = (brandsByDate[activeDate] ?? []).includes(brand);
    setBrandsByDate((b) => {
      const cur = b[activeDate] ?? [];
      return {
        ...b,
        [activeDate]: isRemoving
          ? cur.filter((x) => x !== brand)
          : [...cur, brand],
      };
    });
    // Deselecting a brand also drops the hours it already took on this day.
    if (isRemoving) {
      setSlots((s) => s.filter((x) => !(x.date === activeDate && x.brand === brand)));
    }
  };

  // An hour is "selected" when every active brand already has it; "partial"
  // when only some do (e.g. after removing one brand's hour in the summary).
  const hourState = (startTime: string): 'none' | 'partial' | 'all' => {
    if (activeBrands.length === 0) return 'none';
    const have = activeBrands.filter((brand) =>
      slots.some((s) => s.date === activeDate && s.brand === brand && s.start === startTime),
    ).length;
    if (have === 0) return 'none';
    return have === activeBrands.length ? 'all' : 'partial';
  };

  const toggleHour = (startTime: string, endTime: string) => {
    if (!activeDate || activeBrands.length === 0) return;
    if (hourState(startTime) === 'all') {
      // Deselect: drop this hour for all active brands.
      setSlots((s) =>
        s.filter(
          (x) =>
            !(x.date === activeDate && x.start === startTime && activeBrands.includes(x.brand)),
        ),
      );
    } else {
      // Select: add this hour for every active brand that doesn't have it yet.
      setSlots((s) => [
        ...s,
        ...activeBrands
          .filter(
            (brand) =>
              !s.some((x) => x.date === activeDate && x.brand === brand && x.start === startTime),
          )
          .map((brand) => ({ date: activeDate, brand, start: startTime, end: endTime })),
      ]);
    }
  };

  const clearActiveDay = () => {
    if (!activeDate) return;
    setSlots((s) => s.filter((x) => x.date !== activeDate));
  };

  const removeSlot = (date: string, brand: string, startTime: string) =>
    setSlots((s) =>
      s.filter((x) => !(x.date === date && x.brand === brand && x.start === startTime)),
    );

  // Remove a whole summary card: all of one brand's hours on one day,
  // and deselect that brand for the day.
  const removeBrandDay = (date: string, brand: string) => {
    setSlots((s) => s.filter((x) => !(x.date === date && x.brand === brand)));
    setBrandsByDate((b) => ({
      ...b,
      [date]: (b[date] ?? []).filter((x) => x !== brand),
    }));
  };

  // One summary card per date+brand pair — a single-brand day looks exactly
  // like the classic card; a mixed day simply gets one card per brand.
  const grouped = useMemo(() => {
    const out: { date: string; brand: string; items: Slot[] }[] = [];
    for (const date of selectedDates) {
      const daySlots = slots
        .filter((s) => s.date === date)
        .sort((a, b) => a.start.localeCompare(b.start));
      for (const brand of [...new Set(daySlots.map((s) => s.brand))]) {
        out.push({
          date,
          brand,
          items: daySlots.filter((s) => s.brand === brand),
        });
      }
    }
    return out;
  }, [selectedDates, slots]);

  const bookedDays = useMemo(() => new Set(slots.map((s) => s.date)).size, [slots]);

  // Days the creator picked on the calendar but hasn't given any hours yet.
  const incompleteDates = useMemo(
    () => selectedDates.filter((d) => !slots.some((s) => s.date === d)),
    [selectedDates, slots],
  );

  const canBook =
    slots.length > 0 && incompleteDates.length === 0 && status !== 'saving';

  const book = async (account: GoogleUser) => {
    if (slots.length === 0 || incompleteDates.length > 0) return;
    setStatus('saving');
    try {
      await api.createBooking({
        creatorName: account.name,
        email: account.email,
        credential: account.credential,
        googleId: account.googleId,
        dates: selectedDates,
        slots,
      });
      setStatus('done');
      setSelectedDates([]);
      setActiveDate('');
      setBrandsByDate({});
      setSlots([]);
    } catch {
      setStatus('error');
    }
  };

  // Everything is filled in first; sign-in is only requested at booking time.
  const handleBookClick = () => {
    if (slots.length === 0 || incompleteDates.length > 0) return;
    if (user) {
      void book(user);
    } else {
      setShowSignIn(true);
    }
  };

  // Open the Google popup from the dialog, then continue straight into the booking.
  const loginAndBook = async () => {
    if (!GOOGLE_CLIENT_ID) {
      if (import.meta.env.DEV) {
        const dev: GoogleUser = {
          email: 'dev.creator@gmail.com',
          name: 'Dev Creator',
          credential: 'dev',
        };
        signIn(dev);
        setShowSignIn(false);
        void book(dev);
      }
      return;
    }
    setModalBusy(true);
    try {
      const account = await requestGoogleLogin();
      signIn(account);
      setShowSignIn(false);
      void book(account);
    } catch {
      /* user closed the popup — leave the dialog open */
    } finally {
      setModalBusy(false);
    }
  };

  const currentIso = `${year}-${pad(month + 1)}-01`;

  return (
    <section id="reserve" className="bg-white">
      {/* Banner */}
      <div className="section-container pt-20 sm:pt-24">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={homeAssets.bookingBanner}
            alt=""
            aria-hidden
            className="h-40 w-full object-cover sm:h-56"
          />
          <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-white/90 via-white/60 to-transparent px-8 sm:px-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
              {t('home.reserve.bannerKicker')}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              {t('home.reserve.title')}
            </h2>
          </div>
        </div>
      </div>

      <div className="section-container grid grid-cols-1 gap-10 pb-20 pt-12 sm:pb-24 lg:grid-cols-2">
        {/* ---- Calendar ---- */}
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => changeMonth(-1)}
              className="text-neutral-400 transition hover:text-neutral-900"
              aria-label={t('home.reserve.prevMonth')}
            >
              ‹
            </button>
            <h3 className="rounded border border-brand px-2 py-1 text-xl font-extrabold tracking-tight">
              {monthYear(currentIso, lang)}
            </h3>
            <button
              onClick={() => changeMonth(1)}
              className="text-neutral-400 transition hover:text-neutral-900"
              aria-label={t('home.reserve.nextMonth')}
            >
              ›
            </button>
            <p className="ml-auto text-xs text-neutral-500">
              {t('home.reserve.campaignPeriod')} {monthDay(start, lang)} –{' '}
              {monthDay(end, lang)}
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
              const isActive = activeDate === iso;
              const hourCount = slots.filter((s) => s.date === iso).length;
              return (
                <button
                  key={iso}
                  disabled={!selectable}
                  onClick={() => toggleDate(iso)}
                  className={[
                    'relative flex h-14 items-start justify-start rounded-md p-2 text-sm transition',
                    selected
                      ? 'bg-brand font-bold text-white'
                      : selectable
                        ? 'bg-neutral-100 text-neutral-800 hover:bg-brand/10'
                        : 'bg-neutral-50 text-neutral-300',
                    isActive ? 'ring-2 ring-neutral-900 ring-offset-1' : '',
                  ].join(' ')}
                >
                  {day}
                  {hourCount > 0 && (
                    <span className="absolute bottom-1 right-1.5 rounded-full bg-white/25 px-1.5 text-[10px] font-semibold">
                      {hourCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- Booking panel ---- */}
        <div>
          <h3 className="text-xl font-bold tracking-tight">
            {t('home.reserve.title')}
          </h3>
          <p className="mt-2 max-w-md text-sm text-neutral-500">
            {t('home.reserve.desc')}
          </p>

          <div className="mt-6 rounded-2xl border border-neutral-200 p-6 shadow-sm">
            {/* Success banner */}
            {status === 'done' && (
              <div className="mb-5 flex items-center gap-2.5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[11px] text-white">
                  ✓
                </span>
                {t('home.reserve.reserved')}
              </div>
            )}

            {/* Step 1 — Selected dates */}
            <div className="flex items-center gap-2">
              <StepBadge n={1} />
              <p className="text-sm font-semibold">{t('home.reserve.selectedDates')}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedDates.length === 0 ? (
                <span className="text-xs text-neutral-400">
                  {t('home.reserve.pickDays')}
                </span>
              ) : (
                selectedDates.map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveDate(d)}
                    className={[
                      'rounded-full px-3 py-1 text-xs font-medium transition',
                      activeDate === d
                        ? 'bg-neutral-900 text-white'
                        : 'border border-neutral-300 text-neutral-700 hover:border-neutral-900',
                    ].join(' ')}
                  >
                    {prettyDate(d)}
                    {slots.some((s) => s.date === d) && (
                      <span className={activeDate === d ? 'text-white/60' : 'text-neutral-400'}>
                        {' '}· {slots.filter((s) => s.date === d).length}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Step 2 — Per-day: brand first, then hours */}
            {activeDate && (
              <div className="mt-6 rounded-xl border border-neutral-200 p-4">
                <div className="flex items-center gap-2">
                  <StepBadge n={2} />
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    {t('home.reserve.editingDay')} {prettyDate(activeDate)}
                  </p>
                </div>

                {/* Brand */}
                <p className="mt-4 text-sm font-semibold">{t('home.reserve.chooseBrand')}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {brands.map((b) => {
                    const sel = activeBrands.includes(b.name);
                    return (
                      <button
                        key={b.slug}
                        onClick={() => toggleBrandForActive(b.name)}
                        className={[
                          'rounded-full border px-3.5 py-1.5 text-xs font-medium transition',
                          sel
                            ? 'border-brand bg-brand text-white shadow-sm'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-brand hover:text-brand',
                        ].join(' ')}
                      >
                        {b.name}
                      </button>
                    );
                  })}
                </div>

                {/* Hours */}
                <div className="mt-5 flex items-baseline justify-between">
                  <p className="text-sm font-semibold">{t('home.reserve.selectHours')}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-[11px] text-neutral-400">{t('home.reserve.hoursRange')}</p>
                    {slots.some((s) => s.date === activeDate) && (
                      <button
                        onClick={clearActiveDay}
                        className="text-[11px] font-medium text-neutral-500 underline transition hover:text-brand"
                      >
                        {t('home.reserve.clearDay')}
                      </button>
                    )}
                  </div>
                </div>
                <div className={activeBrands.length > 0 ? '' : 'pointer-events-none opacity-40'}>
                  {HOUR_GROUPS.map((g) => (
                    <div key={g.key} className="mt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                        {t(`home.reserve.${g.key}`)}
                      </p>
                      <div className="mt-1.5 grid grid-cols-4 gap-2 sm:grid-cols-6">
                        {g.hours.map((h) => {
                          const state = hourState(h.start);
                          return (
                            <button
                              key={h.start}
                              onClick={() => toggleHour(h.start, h.end)}
                              className={[
                                'rounded-md py-2 text-xs font-medium transition',
                                state === 'all'
                                  ? 'bg-brand text-white shadow-sm'
                                  : state === 'partial'
                                    ? 'bg-brand/40 text-white shadow-sm'
                                    : 'bg-neutral-100 text-neutral-700 hover:bg-brand/10',
                              ].join(' ')}
                            >
                              {h.start}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {activeBrands.length === 0 && (
                  <p className="mt-2 text-[11px] text-neutral-400">
                    {t('home.reserve.chooseBrandFirst')}
                  </p>
                )}
              </div>
            )}

            {/* Summary */}
            {grouped.length > 0 && (
              <ul className="mt-4 space-y-2">
                {grouped.map((g) => (
                  <li
                    key={`${g.date}|${g.brand}`}
                    className="rounded-md border border-neutral-200 px-3 py-2 text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-800">
                        {prettyDate(g.date)}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-medium text-brand">{g.brand}</span>
                        <button
                          onClick={() => removeBrandDay(g.date, g.brand)}
                          className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200 text-[10px] leading-none text-neutral-500 transition hover:bg-brand hover:text-white"
                          aria-label={t('home.reserve.removeSlot')}
                        >
                          ×
                        </button>
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {g.items.map((s) => (
                        <span
                          key={s.start}
                          className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-700"
                        >
                          {s.start}–{s.end}
                          <button
                            onClick={() => removeSlot(s.date, s.brand, s.start)}
                            className="text-neutral-400 transition hover:text-brand"
                            aria-label={t('home.reserve.removeSlot')}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex items-center justify-between">
              <div className="max-w-[60%] text-xs">
                {status === 'error' && (
                  <span className="font-medium text-brand">
                    {t('home.reserve.errorMsg')}
                  </span>
                )}
                {status !== 'error' && incompleteDates.length > 0 && (
                  <span className="font-medium text-amber-600">
                    {t('home.reserve.incompleteDays', {
                      dates: incompleteDates.map(prettyDate).join(', '),
                    })}
                  </span>
                )}
                {status !== 'error' &&
                  incompleteDates.length === 0 &&
                  slots.length > 0 && (
                    <span className="font-medium text-neutral-600">
                      {t('home.reserve.totalSummary', {
                        hours: slots.length,
                        days: bookedDays,
                      })}
                    </span>
                  )}
              </div>
              <button
                onClick={handleBookClick}
                disabled={!canBook}
                className="btn-pill bg-neutral-900 text-white hover:opacity-90 disabled:opacity-40"
              >
                {status === 'saving' ? t('home.reserve.booking') : t('home.reserve.bookLive')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sign-in dialog — shown only when Book Live is clicked while signed out. */}
      {showSignIn && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-900/50 p-4 backdrop-blur-sm"
          onClick={() => setShowSignIn(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg font-bold tracking-tight">
              {t('home.reserve.signInPromptTitle')}
            </h4>
            <p className="mt-2 text-sm text-neutral-500">
              {t('home.reserve.signInPromptDesc', {
                hours: slots.length,
                days: bookedDays,
              })}
            </p>
            <div className="mt-5">
              <button
                onClick={loginAndBook}
                disabled={modalBusy}
                className="btn-pill w-full bg-neutral-900 text-white hover:opacity-90 disabled:opacity-50"
              >
                {modalBusy ? t('nav.loggingIn') : t('nav.logInAndBook')}
              </button>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSignIn(false)}
                className="text-xs font-medium text-neutral-500 underline transition hover:text-neutral-900"
              >
                {t('home.reserve.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
