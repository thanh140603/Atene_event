import { useCallback, useEffect, useMemo, useState } from 'react';
import TokuPackLogo from '../components/TokuPackLogo';
import { api } from '../lib/api';

/** Rows as returned by the admin-only GET endpoints. */
interface AdminBooking {
  id: number;
  creatorName: string;
  email: string;
  googleId: string;
  dates: string[];
  slots: { date: string; brand: string; start: string; end: string }[];
  createdAt: string;
}

interface AdminApplication {
  id: number;
  name: string;
  tiktokId: string;
  email: string;
  preferredBrand: string;
  preferredBrandOther: string;
  liveCommerceBrands: string[];
  comment: string;
  createdAt: string;
}

const TOKEN_KEY = 'atene.admin.token';

type Tab = 'bookings' | 'applications';

function fmtDateTime(iso: string) {
  const d = new Date(iso);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

/** Client-side CSV download of the currently loaded rows. */
function downloadCsv(filename: string, header: string[], rows: string[][]) {
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((r) => r.map(escape).join(',')).join('\r\n');
  // BOM so Excel opens UTF-8 (Japanese/Korean names) correctly.
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { token } = await api.adminLogin(email.trim(), password);
      onLogin(token);
    } catch {
      setError('Invalid email or password.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <TokuPackLogo size={52} />
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-neutral-500">
            Powered by ATENE
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900">
            Admin Dashboard
          </h1>
          <div className="heading-rule" />
          <p className="mt-4 text-sm text-neutral-500">
            Creator Sourcing Day — bookings &amp; TokuPack applications
          </p>
        </div>

        <form
          onSubmit={submit}
          className="mt-10 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
        >
          <label className="block text-xs font-semibold text-neutral-700">
            Email
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
              placeholder="admin@atene.kr"
            />
          </label>
          <label className="mt-4 block text-xs font-semibold text-neutral-700">
            Password
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="mt-4 text-xs font-medium text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn-pill mt-6 w-full justify-center bg-neutral-900 py-3 text-white hover:bg-neutral-700 disabled:opacity-50"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-neutral-400">
          Restricted area — authorized staff only.
        </p>
      </div>
    </main>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <p className="text-3xl font-extrabold tracking-tight text-neutral-900">
        {value}
      </p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </p>
    </div>
  );
}

function BrandChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-900">
      {children}
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-200 px-6 py-16 text-center">
      <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
        {message}
      </span>
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(
    () => window.localStorage.getItem(TOKEN_KEY),
  );
  const [tab, setTab] = useState<Tab>('bookings');
  const [bookings, setBookings] = useState<AdminBooking[] | null>(null);
  const [applications, setApplications] = useState<AdminApplication[] | null>(null);
  const [error, setError] = useState('');

  const logout = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setBookings(null);
    setApplications(null);
  }, []);

  const load = useCallback(async () => {
    if (!token) return;
    setError('');
    try {
      const [b, a] = await Promise.all([
        api.adminGet<AdminBooking[]>('/bookings', token),
        api.adminGet<AdminApplication[]>('/tokupack-applications', token),
      ]);
      setBookings(b);
      setApplications(a);
    } catch (err) {
      // An expired/invalid token bounces back to the login form.
      if (String(err).includes('401')) logout();
      else setError(String(err));
    }
  }, [token, logout]);

  useEffect(() => {
    load();
  }, [load]);

  const onLogin = (t: string) => {
    window.localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
  };

  const exportCsv = () => {
    if (tab === 'bookings' && bookings) {
      downloadCsv(
        'bookings.csv',
        ['ID', 'Creator', 'Email', 'Slots', 'Submitted'],
        bookings.map((b) => [
          String(b.id),
          b.creatorName,
          b.email,
          b.slots.map((s) => `${s.date} ${s.start}-${s.end} ${s.brand}`).join('; '),
          b.createdAt,
        ]),
      );
    } else if (tab === 'applications' && applications) {
      downloadCsv(
        'tokupack-applications.csv',
        ['ID', 'Name', 'TikTok ID', 'Email', 'Preferred TokuPack', 'Live-commerce brands', 'Comment', 'Submitted'],
        applications.map((a) => [
          String(a.id),
          a.name,
          a.tiktokId,
          a.email,
          a.preferredBrand === 'その他' && a.preferredBrandOther
            ? `${a.preferredBrand} (${a.preferredBrandOther})`
            : a.preferredBrand,
          a.liveCommerceBrands.join('; '),
          a.comment,
          a.createdAt,
        ]),
      );
    }
  };

  const stats = useMemo(() => {
    const slotCount = bookings?.reduce((n, b) => n + b.slots.length, 0) ?? 0;
    const stamps = [
      ...(bookings ?? []).map((b) => b.createdAt),
      ...(applications ?? []).map((a) => a.createdAt),
    ].sort();
    const latest = stamps[stamps.length - 1];
    return {
      bookings: bookings?.length ?? 0,
      slots: slotCount,
      applications: applications?.length ?? 0,
      latest: latest ? fmtDateTime(latest) : '—',
    };
  }, [bookings, applications]);

  if (!token) return <LoginScreen onLogin={onLogin} />;

  const tabClass = (t: Tab) =>
    `rounded-full px-5 py-2 text-xs font-semibold transition ${
      tab === t
        ? 'bg-neutral-900 text-white'
        : 'border border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
    }`;

  return (
    <>
      {/* Sticky header — same pattern as the brand pages. */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
        <div className="section-container flex h-16 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <TokuPackLogo size={34} />
            <span className="truncate text-sm font-bold tracking-wide">
              ADMIN DASHBOARD
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={load}
              className="whitespace-nowrap rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={logout}
              className="whitespace-nowrap rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="bg-neutral-50">
        {/* Heading block — mirrors the site's section headings. */}
        <section className="border-b border-neutral-200 bg-white">
          <div className="section-container py-12 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-neutral-500">
              Creator Sourcing Day
            </p>
            <h1 className="section-heading mt-3">Submissions</h1>
            <div className="heading-rule" />
            <p className="mx-auto mt-5 max-w-xl text-sm text-neutral-600">
              Livestream reservations and TokuPack application forms, newest
              first.
            </p>
          </div>
        </section>

        <div className="section-container py-10">
          {/* Stat tiles — echoes the homepage stats row. */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatTile label="Bookings" value={String(stats.bookings)} />
            <StatTile label="Booked slots" value={String(stats.slots)} />
            <StatTile label="Applications" value={String(stats.applications)} />
            <StatTile label="Last submission" value={stats.latest} />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setTab('bookings')} className={tabClass('bookings')}>
                Livestream bookings
              </button>
              <button type="button" onClick={() => setTab('applications')} className={tabClass('applications')}>
                TokuPack applications
              </button>
            </div>
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-900 px-5 py-2 text-xs font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
              </svg>
              Export CSV
            </button>
          </div>

          {error && (
            <p className="mt-6 text-sm font-medium text-red-600">{error}</p>
          )}

          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            {tab === 'bookings' ? (
              bookings === null ? (
                <EmptyState message="Loading…" />
              ) : bookings.length === 0 ? (
                <EmptyState message="No bookings yet" />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      <tr>
                        <th className="px-5 py-4">ID</th>
                        <th className="px-5 py-4">Creator</th>
                        <th className="px-5 py-4">Email</th>
                        <th className="px-5 py-4">Slots</th>
                        <th className="px-5 py-4">Submitted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {bookings.map((b) => (
                        <tr key={b.id} className="align-top transition hover:bg-neutral-50">
                          <td className="px-5 py-4 font-bold text-neutral-900">{b.id}</td>
                          <td className="px-5 py-4 font-medium text-neutral-900">{b.creatorName || '—'}</td>
                          <td className="px-5 py-4 text-neutral-600">{b.email || '—'}</td>
                          <td className="px-5 py-4">
                            <ul className="space-y-1.5">
                              {b.slots.map((s, i) => (
                                <li key={i} className="flex flex-wrap items-center gap-2 whitespace-nowrap">
                                  <span className="font-semibold text-neutral-900">{s.date}</span>
                                  <span className="text-neutral-500">
                                    {s.start}–{s.end}
                                  </span>
                                  <BrandChip>{s.brand}</BrandChip>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-neutral-500">
                            {fmtDateTime(b.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : applications === null ? (
              <EmptyState message="Loading…" />
            ) : applications.length === 0 ? (
              <EmptyState message="No applications yet" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px] text-left text-sm">
                  <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    <tr>
                      <th className="px-5 py-4">ID</th>
                      <th className="px-5 py-4">Name</th>
                      <th className="px-5 py-4">TikTok</th>
                      <th className="px-5 py-4">Email</th>
                      <th className="px-5 py-4">Preferred TokuPack</th>
                      <th className="px-5 py-4">Live-commerce brands</th>
                      <th className="px-5 py-4">Comment</th>
                      <th className="px-5 py-4">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {applications.map((a) => (
                      <tr key={a.id} className="align-top transition hover:bg-neutral-50">
                        <td className="px-5 py-4 font-bold text-neutral-900">{a.id}</td>
                        <td className="px-5 py-4 font-medium text-neutral-900">{a.name}</td>
                        <td className="px-5 py-4 text-neutral-600">{a.tiktokId || '—'}</td>
                        <td className="px-5 py-4 text-neutral-600">{a.email}</td>
                        <td className="px-5 py-4">
                          {a.preferredBrand ? <BrandChip>{a.preferredBrand}</BrandChip> : '—'}
                          {a.preferredBrandOther && (
                            <span className="ml-1 text-neutral-500">({a.preferredBrandOther})</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          {a.liveCommerceBrands.length ? (
                            <div className="flex max-w-[16rem] flex-wrap gap-1.5">
                              {a.liveCommerceBrands.map((brand) => (
                                <span
                                  key={brand}
                                  className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-700"
                                >
                                  {brand}
                                </span>
                              ))}
                            </div>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="max-w-[18rem] px-5 py-4 text-neutral-600">
                          <p className="whitespace-pre-line">{a.comment || '—'}</p>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-neutral-500">
                          {fmtDateTime(a.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer — same dark footer as the brand pages. */}
      <footer className="bg-brand-dark text-neutral-400">
        <div className="section-container flex flex-col items-center gap-3 py-12 text-center">
          <TokuPackLogo size={44} />
          <p className="text-sm font-semibold text-white">
            Creator Sourcing Day — Admin
          </p>
          <p className="text-xs">Powered by ATENE</p>
        </div>
      </footer>
    </>
  );
}
