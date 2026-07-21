import TokuPackLogo from '../components/TokuPackLogo';
import BrandTokupackSet from '../components/brand/BrandTokupackSet';
import BrandProductsUsp from '../components/brand/BrandProductsUsp';
import BrandProductsCarousel from '../components/brand/BrandProductsCarousel';
import BrandCta from '../components/brand/BrandCta';
import { getBrand, getTokupackSet } from '../data/brands';
import { useT } from '../i18n/LanguageProvider';

/**
 * Sub-page of a multi-set brand (`#/brand/:slug/set/:id`) — the same flow as
 * a single-set brand page but without the video / logo / story intro: it opens
 * directly with the set's TOKUPACK SET section, then USP, then the DETAILS
 * carousel and the CTA. See BRAND_MULTI_SET_LAYOUT.md.
 */
export default function BrandSetPage({
  slug,
  setId,
}: {
  slug: string;
  setId: string;
}) {
  const t = useT();
  const brand = getBrand(slug);
  const set = getTokupackSet(slug, setId);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
        <div className="section-container flex h-16 items-center justify-between gap-3">
          <a
            href={`#/brand/${slug}`}
            className="flex min-w-0 items-center gap-2"
          >
            <TokuPackLogo size={34} />
            <span className="truncate text-sm font-bold tracking-wide">
              {brand ? brand.name.toUpperCase() : t('brand.wordmarkFallback')}
            </span>
          </a>
          <a
            href={`#/brand/${slug}`}
            className="shrink-0 whitespace-nowrap rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            {t('brand.productDetail.backToBrand')}
          </a>
        </div>
      </header>

      {brand && set ? (
        <main id="top">
          {/* The set's data poured into the standard single-set components. */}
          {(() => {
            const setBrand = {
              ...brand,
              tokupack: set.tokupack,
              usps: set.usps,
              productsHeadline: set.productsHeadline,
              products: set.products,
              tokupackSets: undefined,
            };
            return (
              <>
                <BrandTokupackSet brand={setBrand} />
                <BrandProductsUsp brand={setBrand} />
                {setBrand.products?.length ? (
                  <BrandProductsCarousel brand={setBrand} />
                ) : null}
                <BrandCta brand={setBrand} />
              </>
            );
          })()}
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
            <a
              href={`#/brand/${slug}`}
              className="btn-pill mt-6 bg-brand text-white hover:opacity-90"
            >
              {t('brand.productDetail.backToBrand')}
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
