import TokuPackLogo from '../components/TokuPackLogo';
import CompetitionHero from '../components/competition/CompetitionHero';
import ParticipationSteps from '../components/competition/ParticipationSteps';
import RankingCriteria from '../components/competition/RankingCriteria';
import WhatYouCanWin from '../components/competition/WhatYouCanWin';
import CompetitionCTA from '../components/competition/CompetitionCTA';

export default function CompetitionPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
        <div className="section-container flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <TokuPackLogo size={34} />
            <span className="text-sm font-bold tracking-wide">
              KOREA INVITATION CHALLENGE
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
        <CompetitionHero />
        <ParticipationSteps />
        <RankingCriteria />
        <WhatYouCanWin />
        <CompetitionCTA />
      </main>

      <footer className="bg-brand-dark text-neutral-400">
        <div className="section-container flex flex-col items-center gap-3 py-12 text-center">
          <TokuPackLogo size={44} />
          <p className="text-sm font-semibold text-white">
            ATENE KOREA INVITATION CHALLENGE
          </p>
          <p className="text-xs">BEST TOKUPACK SELLER · 2026.07.27 — 08.26</p>
          <p className="mt-3 text-[11px] text-neutral-500">
            © 2026 ATENE. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
