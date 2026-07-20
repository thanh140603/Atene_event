import { homeAssets } from '../../lib/homeAssets';
import { useT } from '../../i18n/LanguageProvider';

export default function FindTokupack() {
  const t = useT();
  return (
    <section
      className="relative"
      style={{
        backgroundImage: `url(${homeAssets.bookingBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="section-container flex items-center justify-center py-24 sm:py-32">
        {/* Centered white box */}
        <div className="w-full max-w-2xl rounded-3xl bg-white/90 px-8 py-12 shadow-xl backdrop-blur-sm sm:px-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
            {t('home.find.headingPre')}
            <span className="text-brand">{t('home.find.headingHi')}</span>
            {t('home.find.headingPost')}
          </h2>
          <p className="mt-5 text-sm font-semibold text-neutral-700">
            {t('home.find.line1a')}
            <br />
            {t('home.find.line1b')}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            {t('home.find.line2a')}
            <br />
            {t('home.find.line2b')}
          </p>
          <a
            href="#/tokupack"
            className="btn-pill mt-8 bg-neutral-900 text-white hover:opacity-90"
          >
            {t('home.find.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
