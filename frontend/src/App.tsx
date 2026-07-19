import { useEffect, useState } from 'react';
import { api } from './lib/api';
import type { Brand, EventInfo, Faq, SocialLink } from './types';
import { useHashRoute } from './hooks/useHashRoute';
import { useT, useLang } from './i18n/LanguageProvider';
import CompetitionPage from './pages/CompetitionPage';
import LocationPage from './pages/LocationPage';
import VenueLayoutPage from './pages/VenueLayoutPage';
import TokupackPage from './pages/TokupackPage';
import BrandPage from './pages/BrandPage';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Countdown from './components/sections/Countdown';
import AboutEvent from './components/sections/AboutEvent';
import CreatorSourcingDay from './components/sections/CreatorSourcingDay';
import HowItWorks from './components/sections/HowItWorks';
import ParticipatingBrands from './components/sections/ParticipatingBrands';
import FindTokupack from './components/sections/FindTokupack';
import BookLivestream from './components/sections/BookLivestream';
import ReserveLivestream from './components/sections/ReserveLivestream';
import HomeLocation from './components/sections/HomeLocation';
import Faqs from './components/sections/Faqs';
import FollowUs from './components/sections/FollowUs';
import Footer from './components/Footer';

export default function App() {
  const [event, setEvent] = useState<EventInfo | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [error, setError] = useState<string | null>(null);
  const route = useHashRoute();
  const t = useT();
  const { lang } = useLang();

  useEffect(() => {
    // Refetch localized content whenever the language changes.
    Promise.all([
      api.getEvent(lang),
      api.getBrands(lang),
      api.getFaqs(lang),
      api.getSocialLinks(lang),
    ])
      .then(([e, b, f, s]) => {
        setEvent(e);
        setBrands(b);
        setFaqs(f);
        setSocials(s);
      })
      .catch((err) => setError(String(err)));
  }, [lang]);

  let content: JSX.Element;

  if (route.startsWith('/tokupack')) {
    // Standalone TokuPack request form page — self-contained.
    content = <TokupackPage />;
  } else if (route.startsWith('/brand/')) {
    // Standalone per-brand page (#/brand/:slug) — self-contained.
    const slug = route.slice('/brand/'.length).split(/[/?#]/)[0];
    content = <BrandPage slug={slug} />;
  } else if (route.startsWith('/competition')) {
    // Standalone competition page — self-contained, no event data required.
    content = <CompetitionPage />;
  } else if (route.startsWith('/location')) {
    // Standalone access & information (location) page — self-contained.
    content = <LocationPage />;
  } else if (route.startsWith('/venue')) {
    // Standalone venue layout + Best Content Award page — self-contained.
    content = <VenueLayoutPage />;
  } else if (error) {
    content = (
      <div className="flex min-h-screen items-center justify-center p-8 text-center">
        <div>
          <p className="text-lg font-semibold">{t('common.loadError')}</p>
          <p className="mt-2 text-sm text-neutral-500">{error}</p>
          <p className="mt-2 text-sm text-neutral-500">
            {t('common.loadErrorHint')}
          </p>
        </div>
      </div>
    );
  } else if (!event) {
    content = (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-brand" />
      </div>
    );
  } else {
    content = (
      <>
        <Navbar />
        <main>
          <Hero event={event} />
          <Countdown event={event} />
          <AboutEvent event={event} />
          <CreatorSourcingDay event={event} />
          <HowItWorks event={event} />
          <ParticipatingBrands brands={brands} />
          <FindTokupack />
          <BookLivestream />
          <ReserveLivestream event={event} />
          <HomeLocation />
          <Faqs faqs={faqs} />
          <FollowUs socials={socials} />
        </main>
        <Footer event={event} />
      </>
    );
  }

  return (
    <>
      <Sidebar />
      {/* Offset content for the fixed left rail (narrower on mobile). */}
      <div className="pl-16 md:pl-[76px]">{content}</div>
    </>
  );
}
