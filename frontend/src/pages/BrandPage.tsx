import TokuPackLogo from '../components/TokuPackLogo';
import BrandHero from '../components/brand/BrandHero';
import BrandTokupackSet from '../components/brand/BrandTokupackSet';
import BrandProductsUsp from '../components/brand/BrandProductsUsp';
import BrandCta from '../components/brand/BrandCta';
import FeaturedBrandHero from '../components/brand/featured/FeaturedBrandHero';
import FeaturedTokupackSeries from '../components/brand/featured/FeaturedTokupackSeries';
import FeaturedProductShowcase from '../components/brand/featured/FeaturedProductShowcase';
import FeaturedCollabCta from '../components/brand/featured/FeaturedCollabCta';
import { getBrand } from '../data/brands';
import { useT } from '../i18n/LanguageProvider';

export default function BrandPage({ slug }: { slug: string }) {
  const t = useT();
  const brand = getBrand(slug);
  const isFeatured = brand?.layout === 'featured';

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
        <div className="section-container flex h-16 items-center justify-between gap-3">
          <a href="#top" className="flex min-w-0 items-center gap-2">
            <TokuPackLogo size={34} />
            <span className="truncate text-sm font-bold tracking-wide">
              {brand ? brand.name.toUpperCase() : t('brand.wordmarkFallback')}
            </span>
          </a>
          <a
            href="#brands"
            className="shrink-0 whitespace-nowrap rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            {t('brand.allBrands')}
          </a>
        </div>
      </header>

      {brand ? (
        <main id="top">
          {isFeatured ? (
            <>
              <FeaturedBrandHero brand={brand} />
              <FeaturedTokupackSeries brand={brand} />
              <FeaturedProductShowcase brand={brand} />
              <FeaturedCollabCta brand={brand} />
            </>
          ) : (
            <>
              <BrandHero brand={brand} />
              <BrandTokupackSet brand={brand} />
              <BrandProductsUsp brand={brand} />
              <BrandCta brand={brand} />
            </>
          )}
        </main>
      ) : (
        <main
          id="top"
          className="flex min-h-[60vh] items-center justify-center px-6 text-center"
        >
          <div>
            <p className="text-lg font-semibold text-neutral-900">
              {t('brand.notFound.title')}
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              {t('brand.notFound.body', { slug })}
            </p>
            <a
              href="#brands"
              className="btn-pill mt-6 bg-brand text-white hover:opacity-90"
            >
              {t('brand.notFound.browse')}
            </a>
          </div>
        </main>
      )}

      <footer className="bg-brand-dark text-neutral-400">
        <div className="section-container flex flex-col items-center gap-3 py-12 text-center">
          <TokuPackLogo size={44} />
          <p className="text-sm font-semibold text-white">
            {t('brand.footer.participatingBrands')}
          </p>
          <p className="text-xs">{t('brand.footer.poweredBy')}</p>
          <p className="mt-3 text-[11px] text-neutral-500">
            {t('footer.rights')}
          </p>
        </div>
      </footer>
    </>
  );
}
