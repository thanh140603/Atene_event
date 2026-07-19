import TokuPackLogo from '../components/TokuPackLogo';
import AccessMap from '../components/location/AccessMap';
import EventInformation from '../components/location/EventInformation';
import LocationSocials from '../components/location/LocationSocials';

export default function LocationPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
        <div className="section-container flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <TokuPackLogo size={34} />
            <span className="text-sm font-bold tracking-wide">
              ACCESS &amp; INFORMATION
            </span>
          </a>
          <a
            href="#/"
            className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
          >
            ← Back to Event
          </a>
        </div>
      </header>

      <main>
        <AccessMap />
        <EventInformation />
        <LocationSocials />
      </main>

      <footer className="bg-brand-dark text-neutral-400">
        <div className="section-container flex flex-col items-center gap-3 py-12 text-center">
          <TokuPackLogo size={44} />
          <p className="text-sm font-semibold text-white">
            Creator Sourcing Day 2026
          </p>
          <p className="text-xs">InterContinental the Strings Tokyo by IHG</p>
          <p className="text-xs">2026年7月23日 · 13:00 ~ 17:00</p>
          <p className="mt-3 text-[11px] text-neutral-500">
            © 2026 ATENE. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
