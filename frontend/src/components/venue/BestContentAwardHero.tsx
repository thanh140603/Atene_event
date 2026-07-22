import { useT } from '../../i18n/LanguageProvider';

export default function BestContentAwardHero() {
  const t = useT();
  return (
    <section id="award" className="bg-white">
      <div className="section-container py-10 sm:py-12">
        <h2 className="section-heading">{t('venue.award.heading')}</h2>
        <div className="heading-rule" />

        {/* Hero visual — delivered banner image. */}
        <div className="mt-12 overflow-hidden rounded-2xl">
          <img
            src="/venue/7.png"
            alt={`${t('venue.award.titleLine1')} ${t('venue.award.titleLine2')}`}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
