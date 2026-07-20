import type { BrandContent, TokupackSeriesCard } from '../../../data/brands';
import { useT } from '../../../i18n/LanguageProvider';

function SeriesCard({ card }: { card: TokupackSeriesCard }) {
  const t = useT();
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {card.imageUrl ? (
        <img
          src={card.imageUrl}
          alt={card.label}
          className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex aspect-[4/5] w-full items-center justify-center border-b-2 border-dashed border-neutral-300 bg-neutral-50">
          <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">
            {card.label}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col items-center gap-4 p-6 text-center">
        <h3 className="text-base font-bold tracking-wide text-neutral-900">
          {card.label}
        </h3>
        {card.caption && (
          <p className="text-xs text-neutral-500">{card.caption}</p>
        )}
        <a
          href={card.link ?? '#/tokupack'}
          className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand transition hover:opacity-80"
        >
          {t('brand.learnMore')}
        </a>
      </div>
    </div>
  );
}

export default function FeaturedTokupackSeries({
  brand,
}: {
  brand: BrandContent;
}) {
  const t = useT();
  const series = brand.tokupackSeries ?? [];
  if (series.length === 0) return null;

  return (
    <section className="bg-neutral-50">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('brand.tokupackSeries.title')}</h2>
        <div className="heading-rule" />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {series.map((card) => (
            <SeriesCard key={card.label} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
