import { useT } from '../../i18n/LanguageProvider';

export default function BookLivestream() {
  const t = useT();
  return (
    <section className="bg-brand-dark text-white">
      <div className="section-container py-20 sm:py-24">
        <p className="text-center text-sm font-semibold tracking-wide">
          {t('home.book.kicker')}
        </p>
        <div className="heading-rule !bg-white" />

        <h2 className="mx-auto mt-10 max-w-3xl text-center text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {t('home.book.headingPre')}
          <br />
          <span className="text-brand">{t('home.book.headingHi')}</span>{' '}
          {t('home.book.headingPost')}
        </h2>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-neutral-300">
          {t('home.book.body1')}
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-neutral-400">
          {t('home.book.body2')}
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#reserve" className="btn-pill bg-brand text-white hover:opacity-90">
            {t('home.book.bookBtn')}
          </a>
          <a
            href="#/competition"
            className="btn-pill border border-white/40 text-white hover:bg-white/10"
          >
            {t('home.book.exploreBtn')}
          </a>
        </div>
      </div>
    </section>
  );
}
