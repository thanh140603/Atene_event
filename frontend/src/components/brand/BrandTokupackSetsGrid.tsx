import type { BrandContent } from '../../data/brands';
import { useT } from '../../i18n/LanguageProvider';

/**
 * TOKUPACK SET section for multi-set brands (VT, Celonia, Purito): one card
 * per set — the delivered set image, an Explore button and the set label
 * (TOKUPACK A / B / C) — linking to the set's own sub-page
 * (`#/brand/:slug/set/:id`). Replaces the single-set section + USP + carousel
 * on the brand page; those live on each sub-page instead.
 */
export default function BrandTokupackSetsGrid({
  brand,
}: {
  brand: BrandContent;
}) {
  const t = useT();
  const sets = brand.tokupackSets ?? [];
  if (sets.length === 0) return null;

  return (
    <section className="bg-neutral-50">
      <div className="section-container py-12 sm:py-16">
        <h2 className="section-heading">{t('brand.tokupackSet.title')}</h2>
        <div className="heading-rule" />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {sets.map((set) => (
            <div key={set.id} className="flex flex-col">
              <a
                href={`#/brand/${brand.slug}/set/${set.id}`}
                className="block overflow-hidden rounded-xl border border-neutral-200 bg-white"
              >
                <img
                  src={set.cardImageUrl}
                  alt={set.label}
                  loading="lazy"
                  className="w-full object-cover"
                />
              </a>
              <a
                href={`#/brand/${brand.slug}/set/${set.id}`}
                className="mt-5 flex w-full items-center justify-center rounded-md border border-brand py-2.5 text-sm font-medium tracking-wide text-brand transition hover:bg-brand hover:text-white"
              >
                {t('brand.explore')}
              </a>
              <p className="mt-4 text-center text-sm font-bold tracking-widest text-neutral-900">
                {set.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
