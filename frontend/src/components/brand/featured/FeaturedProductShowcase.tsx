import type { BrandContent, ShowcaseProduct } from '../../../data/brands';
import { useT } from '../../../i18n/LanguageProvider';

function ProductTile({ product, index }: { product: ShowcaseProduct; index: number }) {
  const t = useT();
  return (
    <div className="group flex flex-col">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name ?? t('brand.showcase.productAlt', { index: index + 1 })}
          className="aspect-square w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50">
          <span className="px-2 text-center text-[10px] font-medium uppercase tracking-widest text-neutral-400">
            {product.name ?? t('brand.showcase.productFallback')}
          </span>
        </div>
      )}

      <p className="mt-3 min-h-[2.5rem] text-center text-xs font-semibold leading-tight text-neutral-800">
        {product.name ?? ''}
      </p>
      <a
        href={product.link ?? '#/tokupack'}
        className="mx-auto inline-flex items-center gap-1 text-xs font-semibold text-brand transition hover:opacity-80"
      >
        {t('brand.learnMore')}
      </a>
    </div>
  );
}

export default function FeaturedProductShowcase({
  brand,
}: {
  brand: BrandContent;
}) {
  const showcase = brand.showcase;
  if (!showcase || showcase.products.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="mx-auto max-w-3xl text-center text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
          {showcase.heading}
        </h2>
        <div className="heading-rule" />

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {showcase.products.map((product, i) => (
            <ProductTile key={i} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
