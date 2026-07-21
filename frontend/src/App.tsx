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
import ProductDetailPage from './pages/ProductDetailPage';
import ReservePage from './pages/ReservePage';
import AdminPage from './pages/AdminPage';

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
import Faqs from './components/sections/Faqs';
import FollowUs from './components/sections/FollowUs';
import LineFooter from './components/sections/LineFooter';

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

  // On navigation to a standalone page (route starting with "/"), jump to the
  // top — otherwise the previous page's scroll position carries over. In-page
  // anchor links (#about, #how, …) are left alone so they scroll to their target.
  const pageKey = route.startsWith('/') ? route.split(/[?#]/)[0] : '';
  useEffect(() => {
    if (pageKey) window.scrollTo(0, 0);
  }, [pageKey]);

  let content: JSX.Element;

  // The mobile top bar is taller on the homepage (it adds the section-anchor
  // nav row). Standalone pages only get the compact bar.
  const isHome = !['/tokupack', '/brand/', '/competition', '/location', '/venue', '/reserve', '/admin']
    .some((p) => route.startsWith(p));

  if (route.startsWith('/tokupack')) {
    content = <TokupackPage />;
  } else if (route.startsWith('/brand/')) {
    // "/brand/:slug" or "/brand/:slug/product/:id"
    const [slug, sub, productId] = route
      .slice('/brand/'.length)
      .split(/[?#]/)[0]
      .split('/');
    content =
      sub === 'product' && productId ? (
        <ProductDetailPage
          key={`${slug}/${productId}`}
          slug={slug}
          productId={productId}
        />
      ) : (
        <BrandPage slug={slug} />
      );
  } else if (route.startsWith('/competition')) {
    content = <CompetitionPage />;
  } else if (route.startsWith('/location')) {
    content = <LocationPage />;
  } else if (route.startsWith('/venue')) {
    content = <VenueLayoutPage />;
  } else if (route.startsWith('/reserve')) {
    content = <ReservePage />;
  } else if (route.startsWith('/admin')) {
    content = <AdminPage />;
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
          <Faqs faqs={faqs} />
          <FollowUs socials={socials} />
          <LineFooter />
        </main>
      </>
    );
  }

  // The admin dashboard is a standalone tool — no site sidebar/offsets.
  const isAdmin = route.startsWith('/admin');
  if (isAdmin) return content;

  return (
    <>
      <Sidebar />
      <div
        className={`md:pl-[76px] md:pt-0 ${isHome ? 'pt-[6.5rem]' : 'pt-14'}`}
      >
        {content}
      </div>
    </>
  );
}
