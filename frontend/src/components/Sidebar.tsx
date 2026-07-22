import { useEffect, useState, type ReactNode } from 'react';
import TokuPackLogo from './TokuPackLogo';
import { useHashRoute } from '../hooks/useHashRoute';
import { useT, useLang } from '../i18n/LanguageProvider';
import { LANGS, LANG_SHORT, LANG_LABELS } from '../i18n/config';
import { useAuth } from '../auth/AuthProvider';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

interface NavLink {
  labelKey: string;
  href: string;
  match?: string[];
  children?: { label: string; href: string }[];
}

const nav: NavLink[] = [
  { labelKey: 'nav.home', href: '#top' },
  { labelKey: 'nav.tokupack', href: '#/tokupack', match: ['/tokupack'] },
  { labelKey: 'nav.competition', href: '#/competition', match: ['/competition'] },
  { labelKey: 'nav.reserve', href: '#/reserve', match: ['/reserve'] },
];

/** Homepage section anchors shown in the mobile horizontal nav row. */
const sectionLinks = [
  { key: 'nav.home', href: '#top' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.how', href: '#how' },
  { key: 'nav.brands', href: '#brands' },
  { key: 'nav.faqs', href: '#faqs' },
];

const socials = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/atene_cosmetics.jp/',
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} {...stroke}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@atene_cosmeticsjp',
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: 'X',
    url: 'https://x.com/atene_cosmetics',
    icon: (
      <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
        <path d="M18.9 1.2h3.7l-8.1 9.2L24 22.8h-7.4l-5.8-7.6-6.7 7.6H.4l8.6-9.9L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2.1L6.5 3.3H4.3l13.3 17.3z" />
      </svg>
    ),
  },
  {
    name: 'LINE',
    url: 'https://line.me/ti/p/wbxRR8KLmQ',
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
        <path d="M12 3C6.5 3 2 6.6 2 11c0 2.86 1.87 5.37 4.68 6.78-.15.52-.96 3.3-.99 3.52 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.42 4.28-2.83.55.08 1.12.12 1.7.12 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
      </svg>
    ),
  },
];

function isActive(item: NavLink, route: string): boolean {
  if (!item.match) return false;
  return item.match.some((p) => route.startsWith(p));
}

export default function Sidebar() {
  const route = useHashRoute();
  const t = useT();
  const { lang, setLang } = useLang();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const anyOpen = open || langOpen;

  // The section-anchor row only applies to the homepage (its links are #about,
  // #how, … anchors). Standalone pages (tokupack, competition, …) don't have them.
  const isHome = !['/tokupack', '/brand/', '/competition', '/location', '/venue', '/reserve']
    .some((p) => route.startsWith(p));

  const closeAll = () => { setOpen(false); setLangOpen(false); setExpanded(null); };

  useEffect(() => { closeAll(); }, [route]);

  useEffect(() => {
    if (!anyOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAll(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [anyOpen]);

  return (
    <>
      {/* ── Mobile top bar (below md) ── */}
      <header className="fixed inset-x-0 top-0 z-[60] bg-white md:hidden">
        <div className="flex h-14 items-center justify-between border-b border-neutral-200 pr-3">
          {/* Hamburger — black square, universal open/close */}
          <button
            type="button"
            onClick={() => {
              if (anyOpen) { closeAll(); } else { setOpen(true); }
            }}
            aria-expanded={anyOpen}
            aria-label={anyOpen ? t('sidebar.closeMenu') : t('sidebar.openMenu')}
            className="flex h-14 w-14 items-center justify-center bg-brand-dark text-white"
          >
            {anyOpen ? (
              <svg viewBox="0 0 24 24" width={20} height={20} {...stroke}>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width={20} height={20} {...stroke}>
                <path d="M5 9h14M5 15h14" />
              </svg>
            )}
          </button>

          {/* Quick actions */}
          <div className="flex items-center gap-4">
            <a
              href="#/venue"
              onClick={closeAll}
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800"
            >
              <svg viewBox="0 0 24 24" width={16} height={16} {...stroke}>
                <path d="M12 3l9 4.5-9 4.5-9-4.5z" />
                <path d="M3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
              </svg>
              {t('nav.venue')}
            </a>
            <a
              href="#/location"
              onClick={closeAll}
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800"
            >
              <svg viewBox="0 0 24 24" width={16} height={16} {...stroke}>
                <path d="M12 21s6.5-5.4 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 15.6 12 21 12 21z" />
                <circle cx="12" cy="10.5" r="2.3" />
              </svg>
              {t('nav.access')}
            </a>
            <button
              type="button"
              onClick={() => { setLangOpen((o) => !o); setOpen(false); }}
              aria-label={t('sidebar.language')}
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800"
            >
              <svg viewBox="0 0 24 24" width={16} height={16} {...stroke}>
                <circle cx="12" cy="12" r="8.5" />
                <path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" />
              </svg>
              {LANG_SHORT[lang]}
            </button>
            {/* Logout — only when signed in (mobile has no header AccountButton) */}
            {user && (
              <button
                type="button"
                onClick={signOut}
                aria-label={t('home.reserve.signOut')}
                title={user.email}
                className="flex items-center text-neutral-800 transition hover:text-brand"
              >
                <svg viewBox="0 0 24 24" width={17} height={17} {...stroke}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <path d="M16 17l5-5-5-5" />
                  <path d="M21 12H9" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Horizontal scrolling nav row — homepage sections only */}
        {isHome && (
          <nav className="flex h-12 items-center overflow-x-auto border-b border-neutral-200 bg-white">
            {sectionLinks.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={closeAll}
                className="whitespace-nowrap px-4 text-sm font-medium text-neutral-700 transition"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ── Fixed left rail (md and up) ── */}
      <aside className="fixed inset-y-0 left-0 z-[60] hidden w-16 flex-col border-r border-neutral-200 bg-white md:flex md:w-[76px]">
        {/* Logo */}
        <a
          href="#top"
          aria-label={t('sidebar.home')}
          onClick={closeAll}
          className="flex h-16 items-center justify-center border-b border-neutral-200"
        >
          <TokuPackLogo size={30} />
        </a>

        {/* Hamburger / X toggle — universal open/close */}
        <div className="flex flex-1 items-center justify-center">
          <button
            type="button"
            onClick={() => {
              if (anyOpen) { closeAll(); } else { setOpen(true); }
            }}
            aria-expanded={anyOpen}
            aria-label={anyOpen ? t('sidebar.closeMenu') : t('sidebar.openMenu')}
            className="flex flex-col items-center gap-1.5 text-neutral-800 transition hover:text-brand"
          >
            {anyOpen ? (
              <svg viewBox="0 0 24 24" width={20} height={20} {...stroke}>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width={20} height={20} {...stroke}>
                <path d="M5 9h14M5 15h14" />
              </svg>
            )}
          </button>
        </div>

        {/* Dark quick-action strip */}
        <div className="flex flex-col bg-brand-dark text-white">
          <RailQuick
            href="#/venue"
            label={t('nav.venue')}
            onNavigate={closeAll}
            icon={
              <svg viewBox="0 0 24 24" width={16} height={16} {...stroke}>
                <path d="M12 3l9 4.5-9 4.5-9-4.5z" />
                <path d="M3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
              </svg>
            }
          />
          <RailQuick
            href="#/location"
            label={t('nav.access')}
            onNavigate={closeAll}
            icon={
              <svg viewBox="0 0 24 24" width={16} height={16} {...stroke}>
                <path d="M12 21s6.5-5.4 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 15.6 12 21 12 21z" />
                <circle cx="12" cy="10.5" r="2.3" />
              </svg>
            }
          />
          {/* Globe — opens language panel */}
          <button
            type="button"
            onClick={() => { setLangOpen((o) => !o); setOpen(false); }}
            aria-label={t('sidebar.language')}
            className="flex flex-col items-center gap-1 py-2 transition hover:opacity-80"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} {...stroke}>
              <circle cx="12" cy="12" r="8.5" />
              <path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" />
            </svg>
            <span className="text-[9px] font-semibold tracking-wide">
              {LANG_SHORT[lang]}
            </span>
          </button>
        </div>
      </aside>

      {/* ── Dim backdrop (click to close) ── */}
      <div
        className={`fixed inset-0 z-[54] bg-black/40 transition-opacity duration-300 ${
          anyOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden
        onClick={closeAll}
      />

      {/* ── Main menu panel ── */}
      <div
        className={`fixed bottom-0 left-0 z-[55] w-[300px] overflow-y-auto bg-white transition-transform duration-300 sm:w-[360px] md:inset-y-0 md:left-[76px] ${
          isHome ? 'top-[6.5rem]' : 'top-14'
        } md:top-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!open}
      >
        <div className="flex min-h-full flex-col px-8 py-12">
          <nav className="flex-1">
            <ul className="space-y-0">
              {nav.map((item) => {
                const active = isActive(item, route);
                const isExpanded = expanded === item.labelKey;
                const label = t(item.labelKey);
                return (
                  <li key={item.labelKey} className="border-b border-neutral-100">
                    <div className="flex items-center justify-between">
                      <a
                        href={item.href}
                        onClick={closeAll}
                        className={`block py-3.5 font-serif text-xl font-semibold tracking-tight transition sm:text-2xl ${
                          active ? 'text-brand' : 'text-neutral-900 hover:text-brand'
                        }`}
                      >
                        {label}
                      </a>
                      {item.children && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isExpanded ? null : item.labelKey)}
                          aria-label={isExpanded ? t('sidebar.collapse', { name: label }) : t('sidebar.expand', { name: label })}
                          aria-expanded={isExpanded}
                          className="p-2 text-neutral-400 transition hover:text-neutral-900"
                        >
                          <svg viewBox="0 0 24 24" width={18} height={18} {...stroke}>
                            <path d="M5 12h14" />
                            {!isExpanded && <path d="M12 5v14" />}
                          </svg>
                        </button>
                      )}
                    </div>

                    {item.children && isExpanded && (
                      <ul className="grid grid-cols-1 gap-y-1 pb-4 pl-1 sm:grid-cols-2">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <a
                              href={c.href}
                              onClick={closeAll}
                              className="block py-1.5 text-sm font-medium text-neutral-500 transition hover:text-brand"
                            >
                              {c.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Language panel ── */}
      <div
        className={`fixed bottom-0 left-0 z-[55] w-[300px] bg-white transition-transform duration-300 sm:w-[360px] md:inset-y-0 md:left-[76px] ${
          isHome ? 'top-[6.5rem]' : 'top-14'
        } md:top-0 ${langOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!langOpen}
      >
        <div className="flex h-full flex-col justify-center px-10">
          <ul className="space-y-5">
            {LANGS.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => { setLang(l); closeAll(); }}
                  className={`font-serif text-2xl font-bold tracking-tight transition sm:text-3xl ${
                    lang === l ? 'text-brand' : 'text-neutral-900 hover:text-brand'
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function RailQuick({
  href,
  label,
  icon,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  onNavigate: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="flex flex-col items-center justify-center gap-1 border-b border-white/10 py-2 transition hover:opacity-80"
    >
      {icon}
      <span className="text-[9px] font-semibold tracking-wide">{label}</span>
    </a>
  );
}
