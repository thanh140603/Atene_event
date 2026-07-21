import { useEffect, useState } from 'react';
import type { BrandContent, BrandProduct } from '../../data/brands';
import { useT } from '../../i18n/LanguageProvider';
import { useL } from '../../i18n/localized';

/** Products visible at once: 1 (mobile) / 2 (sm) / 3 (lg). */
function usePerView() {
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const mqs = [
      window.matchMedia('(min-width: 1024px)'),
      window.matchMedia('(min-width: 640px)'),
    ];
    const update = () =>
      setPerView(mqs[0].matches ? 3 : mqs[1].matches ? 2 : 1);
    update();
    mqs.forEach((m) => m.addEventListener('change', update));
    return () => mqs.forEach((m) => m.removeEventListener('change', update));
  }, []);
  return perView;
}

/**
 * Product carousel shown below PRODUCTS USP: the set headline + contents on
 * the left, then a window of product cards (image + Explore button) with
 * left / right arrows stepping one product at a time.
 *
 * The track is a closed circle: `perView` clones of the last/first products
 * sit at either end, and after sliding onto a clone we snap (no animation)
 * back to the matching real slide — so the loop never visibly rewinds.
 */
export default function BrandProductsCarousel({
  brand,
}: {
  brand: BrandContent;
}) {
  const t = useT();
  const l = useL();
  const products = brand.products ?? [];
  const count = products.length;
  const perView = usePerView();
  const looping = count > 1;

  // Leftmost visible slide on the extended track [lastN, ...products, firstN].
  const [index, setIndex] = useState(perView);
  const [animate, setAnimate] = useState(true);

  // Keep the track aligned when the viewport size class changes.
  useEffect(() => {
    setAnimate(false);
    setIndex(perView);
  }, [perView]);

  // Re-enable the transition one frame after an instant snap.
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  if (count === 0) return null;

  const slides: BrandProduct[] = looping
    ? [
        ...products.slice(-perView),
        ...products,
        ...products.slice(0, perView),
      ]
    : products;
  const activeDot = ((index - perView) % count + count) % count;

  const prev = () => setIndex((i) => Math.max(i - 1, perView - 1));
  const next = () => setIndex((i) => Math.min(i + 1, perView + count));

  /** Slid onto a clone → snap to its real counterpart without animating. */
  const handleTransitionEnd = () => {
    if (index < perView) {
      setAnimate(false);
      setIndex(index + count);
    } else if (index >= perView + count) {
      setAnimate(false);
      setIndex(index - count);
    }
  };

  const arrowClass =
    'shrink-0 text-brand transition hover:opacity-70 disabled:opacity-30';

  return (
    <section className="bg-white">
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-3">
          {/* Lineup headline — only the copy delivered in `DETAILS/text.txt` */}
          <div className="lg:self-start">
            {brand.productsHeadline && (
              <h2 className="text-justify text-lg font-bold leading-relaxed tracking-tight text-neutral-900 sm:text-xl">
                {l(brand.productsHeadline)}
              </h2>
            )}
          </div>

          {/* Arrows + sliding window of product cards */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={prev}
              disabled={!looping}
              aria-label={t('brand.productList.prev')}
              className={arrowClass}
            >
              <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="min-w-0 flex-1 overflow-hidden">
              <div
                className={`flex ${animate ? 'transition-transform duration-500 ease-out' : ''}`}
                style={{
                  transform: `translateX(-${(looping ? index : 0) * (100 / perView)}%)`,
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {slides.map((p, i) => (
                  <div
                    key={i}
                    className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3"
                  >
                    <img
                      src={p.imageUrl}
                      alt={l(p.name) ?? t('brand.productList.productAlt', { index: i })}
                      loading="lazy"
                      className="aspect-[4/5] w-full rounded-lg object-cover"
                    />
                    <a
                      href={p.link ?? `#/brand/${brand.slug}/product/${p.id}`}
                      className="mt-5 flex w-full items-center justify-center rounded-md border border-brand py-2.5 text-sm font-medium tracking-wide text-brand transition hover:bg-brand hover:text-white"
                    >
                      {t('brand.explore')}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={next}
              disabled={!looping}
              aria-label={t('brand.productList.next')}
              className={arrowClass}
            >
              <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Page dots */}
        {looping && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(perView + i)}
                aria-label={t('brand.productList.goTo', { index: i + 1 })}
                className={`h-2 w-2 rounded-full transition ${
                  i === activeDot ? 'bg-brand' : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
