import { useEffect, useState } from 'react';
import { api } from './lib/api';
import type { Brand, EventInfo, Faq, SocialLink } from './types';
import { useHashRoute } from './hooks/useHashRoute';
import CompetitionPage from './pages/CompetitionPage';
import LocationPage from './pages/LocationPage';
import VenueLayoutPage from './pages/VenueLayoutPage';
import TokupackPage from './pages/TokupackPage';

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

  useEffect(() => {
    Promise.all([
      api.getEvent(),
      api.getBrands(),
      api.getFaqs(),
      api.getSocialLinks(),
    ])
      .then(([e, b, f, s]) => {
        setEvent(e);
        setBrands(b);
        setFaqs(f);
        setSocials(s);
      })
      .catch((err) => setError(String(err)));
  }, []);

  // Standalone TokuPack request form page — self-contained.
  if (route.startsWith('/tokupack')) {
    return <TokupackPage />;
  }

  // Standalone competition page — self-contained, no event data required.
  if (route.startsWith('/competition')) {
    return <CompetitionPage />;
  }

  // Standalone access & information (location) page — self-contained.
  if (route.startsWith('/location')) {
    return <LocationPage />;
  }

  // Standalone venue layout + Best Content Award page — self-contained.
  if (route.startsWith('/venue')) {
    return <VenueLayoutPage />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center">
        <div>
          <p className="text-lg font-semibold">Couldn’t load the event data.</p>
          <p className="mt-2 text-sm text-neutral-500">{error}</p>
          <p className="mt-2 text-sm text-neutral-500">
            Make sure the backend API is running.
          </p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-brand" />
      </div>
    );
  }

  return (
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
        <Faqs faqs={faqs} />
        <FollowUs socials={socials} />
      </main>
      <Footer event={event} />
    </>
  );
}
