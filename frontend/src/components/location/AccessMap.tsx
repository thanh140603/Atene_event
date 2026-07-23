import { useT } from '../../i18n/LanguageProvider';

export const GMAP_URL =
  'https://www.google.com/maps/place/InterContinental+the+Strings+Tokyo+by+IHG/@35.6282365,139.7402153,18.53z/data=!3m1!5s0x60188a5ae14f9aab:0x198694fc506fd2a1!4m9!3m8!1s0x60188a5ae105f69f:0xca89ff0033f2e939!5m2!4m1!1i2!8m2!3d35.6278741!4d139.74077!16s%2Fg%2F1213ttz_?entry=tts';

const MAP_IMAGE = encodeURI('/homepage/05_Location/Map.png');

export default function AccessMap() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('location.access.title')}</h2>
        <div className="heading-rule" />

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-neutral-200">
          <img
            src={MAP_IMAGE}
            alt={t('location.access.mapTitle')}
            className="w-full object-cover"
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-neutral-500">
            {t('location.access.venueJa')}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {t('location.access.venueEn')}
          </p>

          <a
            href={GMAP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-md border border-neutral-300 px-8 py-2.5 text-xs font-semibold tracking-widest text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            {t('location.access.googleMap')}
          </a>
        </div>
      </div>
    </section>
  );
}
