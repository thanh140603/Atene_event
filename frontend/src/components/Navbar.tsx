import TokuPackLogo from './TokuPackLogo';

const links = [
  { href: '#about', label: 'About' },
  { href: '#how', label: 'How It Works' },
  { href: '#brands', label: 'Brands' },
  { href: '#/tokupack', label: 'TokuPack' },
  { href: '#/venue', label: 'Venue' },
  { href: '#/competition', label: 'Competition' },
  { href: '#/location', label: 'Location' },
  { href: '#reserve', label: 'Reserve' },
  { href: '#faqs', label: 'FAQs' },
];

export default function Navbar() {
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
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#reserve" className="btn-pill bg-brand text-white hover:opacity-90">
          Reserve Slot
        </a>
      </div>
    </header>
  );
}
