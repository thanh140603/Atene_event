import { useRef, useState } from 'react';
import TokuPackLogo from '../components/TokuPackLogo';
import { getBrand, getProduct } from '../data/brands';
import { useT } from '../i18n/LanguageProvider';
import { useL } from '../i18n/localized';

/**
 * Product detail page (`#/brand/:slug/product/:id`).
 *
 * Layout mirrors the ecommerce reference:
 *   1. Gallery — vertical thumbnail rail + large main image with hover-zoom
 *      (zoom pane replaces the info column while hovering, desktop only),
 *      beside an info panel (name, price/spec rows, buy buttons).
 *      Images come from the product's `DETAILS/<n>/JP_Detailed/` folder.
 *   2. DETAILS — the `JP_Thumb*` images stacked full-width, USP-style.
 */
export default function ProductDetailPage({
  slug,
  productId,
}: {
  slug: string;
  productId: string;
}) {
  const t = useT();
  const l = useL();
  const brand = getBrand(slug);
  const product = getProduct(slug, productId);

  const [active, setActive] = useState(0);
  /** Cursor position over the main image, in %, or null when not hovering. */
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  /** Scroll the thumbnail rail by one thumbnail (vertical on desktop). */
  const scrollRail = (dir: 1 | -1) => {
    const el = railRef.current;
    const thumb = el?.firstElementChild as HTMLElement | null;
    if (!el || !thumb) return;
    const vertical = getComputedStyle(el).flexDirection === 'column';
    const step = dir * ((vertical ? thumb.offsetHeight : thumb.offsetWidth) + 16);
    el.scrollBy(vertical ? { top: step, behavior: 'smooth' } : { left: step, behavior: 'smooth' });
  };

  const gallery =
    product?.galleryImages?.length
      ? product.galleryImages
      : product
        ? [product.imageUrl]
        : [];
  const mainImage = gallery[Math.min(active, gallery.length - 1)];

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

      {brand && product ? (
        <main id="top">
          {/* ── 1. Gallery + info ─────────────────────────────────────── */}
          <section className="bg-white">
            <div className="mx-auto w-full max-w-[1400px] px-6 py-14 sm:px-10 sm:py-20">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[6rem_minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
                {/* Thumbnail rail (horizontal on mobile, vertical on desktop).
                    On desktop `h-0 + min-h-full + overflow-hidden` keeps the rail
                    from growing the grid row: its height follows the main image,
                    with step arrows to scroll the overflow. */}
                <div className="order-2 flex min-w-0 items-center gap-2 lg:order-1 lg:h-0 lg:min-h-full lg:flex-col lg:overflow-hidden">
                  {gallery.length > 4 && (
                    <button
                      type="button"
                      onClick={() => scrollRail(-1)}
                      aria-label={t('brand.productList.prev')}
                      className="hidden h-8 w-full shrink-0 items-center justify-center rounded-md text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900 lg:flex"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  )}

                  <div
                    ref={railRef}
                    className="flex min-w-0 flex-1 gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:min-h-0 lg:w-full lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden"
                  >
                    {gallery.map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={t('brand.productList.goTo', { index: i + 1 })}
                        className={`h-20 w-20 shrink-0 overflow-hidden transition lg:h-24 lg:w-full ${
                          i === active
                            ? 'ring-1 ring-inset ring-neutral-900'
                            : 'opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={src}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {gallery.length > 4 && (
                    <button
                      type="button"
                      onClick={() => scrollRail(1)}
                      aria-label={t('brand.productList.next')}
                      className="hidden h-8 w-full shrink-0 items-center justify-center rounded-md text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900 lg:flex"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Main image with hover-zoom */}
                <div
                  className="order-1 cursor-crosshair overflow-hidden lg:order-2"
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setZoom({
                      x: ((e.clientX - r.left) / r.width) * 100,
                      y: ((e.clientY - r.top) / r.height) * 100,
                    });
                  }}
                  onMouseLeave={() => setZoom(null)}
                >
                  <img
                    src={mainImage}
                    alt={l(product.name) ?? t('brand.productList.productAlt', { index: active + 1 })}
                    className="aspect-square w-full bg-white object-contain"
                  />
                </div>

                {/* Info panel — covered by the zoom pane while hovering (desktop) */}
                <div className="relative order-3 lg:pt-4">
                  <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                    {l(product.name)}
                  </h1>

                  <dl className="mt-10 space-y-4 text-sm sm:text-base">
                    {product.listPrice && (
                      <div className="flex items-center gap-10">
                        <dt
                          className={`w-24 shrink-0 ${product.salePrice ? 'text-neutral-400' : 'text-neutral-500'}`}
                        >
                          {t('brand.productDetail.listPrice')}
                        </dt>
                        {/* Struck through only when a sale price undercuts it. */}
                        <dd
                          className={
                            product.salePrice
                              ? 'text-neutral-400 line-through'
                              : 'font-semibold text-neutral-900'
                          }
                        >
                          {product.listPrice}
                        </dd>
                      </div>
                    )}
                    {product.salePrice && (
                      <div className="flex items-center gap-10">
                        <dt className="w-24 shrink-0 text-neutral-500">
                          {t('brand.productDetail.salePrice')}
                        </dt>
                        <dd className="flex items-center gap-3 font-semibold text-neutral-900">
                          {product.salePrice}
                          {product.discountLabel && (
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-[11px] font-bold text-white">
                              {product.discountLabel}
                            </span>
                          )}
                        </dd>
                      </div>
                    )}
                    {product.volume && (
                      <div className="flex items-center gap-10">
                        <dt className="w-24 shrink-0 text-neutral-500">
                          {t('brand.productDetail.volume')}
                        </dt>
                        <dd className="text-neutral-700">{product.volume}</dd>
                      </div>
                    )}
                  </dl>

                  {product.detailImages?.length ? (
                    <div className="mt-14 border-b border-neutral-200 pb-10">
                      {/* Scrolls to the 商品詳細 stack below (a plain anchor
                          would change the hash route). */}
                      <button
                        type="button"
                        onClick={() =>
                          document
                            .getElementById('product-details')
                            ?.scrollIntoView({ behavior: 'smooth' })
                        }
                        className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-neutral-800 px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto sm:min-w-[16rem]"
                      >
                        {t('brand.productDetail.details')}
                      </button>
                    </div>
                  ) : null}

                  {/* Hover-zoom pane (desktop only) */}
                  {zoom && (
                    <div
                      aria-hidden
                      className="absolute inset-0 z-10 hidden rounded-xl border border-neutral-200 bg-white bg-no-repeat lg:block"
                      style={{
                        backgroundImage: `url("${mainImage}")`,
                        backgroundSize: '220%',
                        backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── 2. DETAILS — stacked full-width pages, USP-style ─────── */}
          {product.detailImages?.length ? (
            <section id="product-details" className="scroll-mt-16 bg-neutral-50">
              <div className="section-container py-20 sm:py-24">
                <h2 className="section-heading">
                  {t('brand.productDetail.detailsTitle')}
                </h2>
                <div className="heading-rule" />

                <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-10">
                  {product.detailImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={t('brand.productList.productAlt', { index: i + 1 })}
                      loading="lazy"
                      className="w-full rounded-2xl border border-neutral-200"
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </main>
      ) : (
        <main
          id="top"
          className="flex min-h-[60vh] items-center justify-center px-6 text-center"
        >
          <div>
            <p className="text-lg font-semibold text-neutral-900">
              {t('brand.productDetail.notFound')}
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
