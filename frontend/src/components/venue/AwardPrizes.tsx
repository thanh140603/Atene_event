import { useT } from '../../i18n/LanguageProvider';

export default function AwardPrizes() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container py-8 sm:py-10">
        {/* SOUTH KOREA visual — delivered banner image. */}
        <div className="overflow-hidden rounded-2xl border-2 border-brand">
          <img
            src="/venue/8.png"
            alt={t('venue.prizes.banner')}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
