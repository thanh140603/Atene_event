import { homeAssets } from '../../lib/homeAssets';
import { useT } from '../../i18n/LanguageProvider';

export default function HomeLocation() {
  const t = useT();
  return (
    <section id="location" className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('home.location.heading')}</h2>
        <div className="heading-rule" />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Venue photo */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={homeAssets.venuePhoto}
              alt={t('home.location.venueAlt')}
              className="h-full min-h-[240px] w-full object-cover"
            />
          </div>

          {/* Details + map */}
          <div className="flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
              {t('home.location.venueKicker')}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900">
              {t('home.location.venueName')}
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              {t('home.location.address')}
            </p>
            <p className="mt-1 text-sm font-semibold text-neutral-800">
              {t('home.location.date')}
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200">
              <img
                src={homeAssets.locationMap}
                alt={t('home.location.mapAlt')}
                className="w-full object-cover"
              />
            </div>

            <a
              href="#/location"
              className="btn-pill mt-6 self-start bg-neutral-900 text-white hover:opacity-90"
            >
              {t('home.location.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
