import type { BrandContent, UspCard } from '../../data/brands';
import { useT } from '../../i18n/LanguageProvider';
import { useL } from '../../i18n/localized';

/** Placeholder tile shown while a brand's catalog images haven't landed yet. */
function UspPlaceholderTile({ card }: { card: UspCard }) {
  const t = useT();
  const l = useL();
  const title = l(card.title);
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="flex aspect-square w-full items-center justify-center border-b-2 border-dashed border-neutral-300 bg-neutral-50">
        <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
          {t('brand.usp.imagePlaceholder')}
        </span>
      </div>

      <div className="flex flex-1 flex-col items-start gap-4 p-6">
        {title ? (
          <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
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
  const l = useL();
  if (brand.usps.length === 0) return null;

  const hasImages = brand.usps.some((c) => c.imageUrl);

  return (
    /* `id` is the scroll target of the TOKUPACK SET "Explore" button;
       scroll-mt offsets the sticky header. */
    <section id="brand-usp" className="scroll-mt-16 bg-white">
      <div className="section-container py-12 sm:py-16">
        <h2 className="section-heading">{t('brand.usp.title')}</h2>
        <div className="heading-rule" />

        {hasImages ? (
          /* Full-width catalog pages, stacked in reading order. */
          <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-10">
            {brand.usps
              .filter((c) => c.imageUrl)
              .map((card, i) => (
                <img
                  key={i}
                  src={card.imageUrl}
                  alt={
                    l(card.title) ?? t('brand.usp.productAlt', { index: i + 1 })
                  }
                  loading="lazy"
                  className="w-full rounded-2xl border border-neutral-200"
                />
              ))}
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brand.usps.map((card, i) => (
              <UspPlaceholderTile key={i} card={card} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
