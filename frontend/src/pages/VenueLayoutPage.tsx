import TokuPackLogo from '../components/TokuPackLogo';
import VenueMap from '../components/venue/VenueMap';
import BestContentAwardHero from '../components/venue/BestContentAwardHero';
import AwardOverview from '../components/venue/AwardOverview';
import AwardPrizes from '../components/venue/AwardPrizes';
import AwardSelection from '../components/venue/AwardSelection';

export default function VenueLayoutPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
        <div className="section-container flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <TokuPackLogo size={34} />
            <span className="text-sm font-bold tracking-wide">
              VENUE &amp; BEST CONTENT AWARD
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

      <main id="top">
        <VenueMap />
        <BestContentAwardHero />
        <AwardOverview />
        <AwardPrizes />
        <AwardSelection />
      </main>

      <footer className="bg-brand-dark text-neutral-400">
        <div className="section-container flex flex-col items-center gap-3 py-12 text-center">
          <TokuPackLogo size={44} />
          <p className="text-sm font-semibold text-white">
            ATENE — CREATOR SOURCING DAY
          </p>
          <p className="text-xs">VENUE LAYOUT · BEST CONTENT AWARD 2026.07.23 — 07.31</p>
          <p className="mt-3 text-[11px] text-neutral-500">
            © 2026 ATENE. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
