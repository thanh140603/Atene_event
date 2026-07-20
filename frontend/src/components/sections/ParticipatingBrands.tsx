import type { Brand } from '../../types';
import { brandImages } from '../../lib/homeAssets';
import { useT } from '../../i18n/LanguageProvider';

function BrandCard({ brand }: { brand: Brand }) {
  const t = useT();
  const count = brand.tokupacks?.length ?? 0;
  const image = brandImages[brand.slug] ?? brand.imageUrl;
  return (
    <div className="group flex flex-col">
      {/* Image / placeholder */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-300">
        {image ? (
          <img
            src={image}
            alt={brand.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-lg font-semibold tracking-wide text-neutral-500">
              {brand.name}
            </span>
          </div>
        )}
      </div>

      <h3 className="mt-3 text-sm font-bold text-neutral-900">{brand.name}</h3>
      <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">
        {brand.tagline}
      </p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600">
          {t('home.brands.setsAvailable', { count })}
        </span>
        <a
          href={`#/brand/${brand.slug}`}
          className="inline-flex items-center gap-1 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
        >
          {t('home.brands.view')}
        </a>
      </div>
    </div>
  );
}

export default function ParticipatingBrands({ brands }: { brands: Brand[] }) {
  const t = useT();
  return (
    <section id="brands" className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('home.brands.heading')}</h2>
        <div className="heading-rule" />

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-neutral-600">
          {t('home.brands.intro')}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {brands.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
