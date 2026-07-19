import type { BrandContent } from '../../data/brands';
import { useT } from '../../i18n/LanguageProvider';

export default function BrandTokupackSet({ brand }: { brand: BrandContent }) {
  const t = useT();
  const { tokupack } = brand;
  const hasItems = tokupack.items.length > 0;

  return (
    <section className="bg-neutral-50">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('brand.tokupackSet.title')}</h2>
        <div className="heading-rule" />

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Set image */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            {tokupack.imageUrl ? (
              <img
                src={tokupack.imageUrl}
                alt={t('brand.tokupackSet.imageAlt', { name: brand.name })}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center border-2 border-dashed border-neutral-300">
                <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                  {t('brand.tokupackSet.imagePlaceholder')}
                </span>
              </div>
            )}
          </div>

          {/* Contents */}
          <div>
            <h3 className="text-xl font-bold text-neutral-900 sm:text-2xl">
              {tokupack.subtitle || t('brand.tokupackSet.detailsComingSoon')}
            </h3>

            <ul className="mt-8 space-y-4">
              {hasItems
                ? tokupack.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span className="text-sm leading-relaxed text-neutral-700">
                        {item}
                      </span>
                    </li>
                  ))
                : Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
                      <span className="h-4 w-2/3 rounded bg-neutral-200" />
                    </li>
                  ))}
            </ul>

            <a
              href="#/tokupack"
              className="btn-pill mt-10 bg-brand text-white hover:opacity-90"
            >
              {t('brand.explore')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
