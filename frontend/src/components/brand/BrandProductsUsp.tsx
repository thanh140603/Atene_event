import type { BrandContent, UspCard } from '../../data/brands';
import { useT } from '../../i18n/LanguageProvider';

function UspTile({ card, index }: { card: UspCard; index: number }) {
  const t = useT();
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {card.imageUrl ? (
        <img
          src={card.imageUrl}
          alt={card.title ?? t('brand.usp.productAlt', { index: index + 1 })}
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center border-b-2 border-dashed border-neutral-300 bg-neutral-50">
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
            {t('brand.usp.imagePlaceholder')}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col items-start gap-4 p-6">
        {card.title ? (
          <h3 className="text-sm font-bold text-neutral-900">{card.title}</h3>
        ) : (
          <span className="h-4 w-1/2 rounded bg-neutral-200" />
        )}
        <a
          href={card.link ?? '#/tokupack'}
          className="mt-auto inline-flex items-center justify-center rounded-md border border-neutral-300 px-6 py-2 text-xs font-semibold tracking-widest text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
        >
          {t('brand.explore')}
        </a>
      </div>
    </div>
  );
}

export default function BrandProductsUsp({ brand }: { brand: BrandContent }) {
  const t = useT();
  if (brand.usps.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('brand.usp.title')}</h2>
        <div className="heading-rule" />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brand.usps.map((card, i) => (
            <UspTile key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
