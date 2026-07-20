import type { BrandContent } from '../../data/brands';
import { useT } from '../../i18n/LanguageProvider';

/**
 * Single hero-product feature: one large product image beside its name,
 * description and an explore link.
 */
export default function BrandSingleProduct({ brand }: { brand: BrandContent }) {
  const t = useT();
  const p = brand.singleProduct;

  return (
    <section className="bg-neutral-50">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('brand.singleProduct.title')}</h2>
        <div className="heading-rule" />

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Product image */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            {p?.imageUrl ? (
              <img
                src={p.imageUrl}
                alt={p.name ?? t('brand.singleProduct.title')}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center border-2 border-dashed border-neutral-300">
                <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                  {t('brand.usp.imagePlaceholder')}
                </span>
              </div>
            )}
          </div>

          {/* Copy */}
          <div>
            {p?.name ? (
              <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
                {p.name}
              </h3>
            ) : (
              <span className="block h-6 w-1/2 rounded bg-neutral-200" />
            )}

            {p?.description ? (
              <p className="mt-6 text-sm leading-relaxed text-neutral-600">
                {p.description}
              </p>
            ) : (
              <div className="mt-6 space-y-3">
                <span className="block h-4 w-full rounded bg-neutral-200" />
                <span className="block h-4 w-5/6 rounded bg-neutral-200" />
                <span className="block h-4 w-2/3 rounded bg-neutral-200" />
              </div>
            )}

            <a
              href={p?.link ?? '#/tokupack'}
              className="btn-pill mt-10 bg-neutral-900 text-white hover:opacity-90"
            >
              {t('brand.explore')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
