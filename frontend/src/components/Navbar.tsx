import TokuPackLogo from './TokuPackLogo';
import AccountButton from './AccountButton';
import { useT } from '../i18n/LanguageProvider';

const links = [
  { href: '#about', key: 'nav.about' },
  { href: '#how', key: 'nav.how' },
  { href: '#brands', key: 'nav.brands' },
  { href: '#faqs', key: 'nav.faqs' },
];

export default function Navbar() {
  const t = useT();
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
      <div className="section-container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <TokuPackLogo size={34} />
          <span className="text-sm font-bold tracking-wide">
            CREATOR SOURCING DAY
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
            >
              {t(l.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <AccountButton />
          <a href="#/reserve" className="btn-pill bg-brand text-white hover:opacity-90">
            {t('nav.reserveSlot')}
          </a>
        </div>
      </div>
    </header>
  );
}
