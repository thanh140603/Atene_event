import type { BrandContent } from '../../data/brands';
import { useT } from '../../i18n/LanguageProvider';
import { useL } from '../../i18n/localized';

/**
 * Brand introduction: the brand name centered with its story below,
 * mirroring the reference brand-page layout.
 */
export default function BrandIntro({ brand }: { brand: BrandContent }) {
  const t = useT();
  const l = useL();
  const story = l(brand.story);
  return (
    <section className="bg-white">
      <div className="section-container py-12 text-center sm:py-16">
        {brand.logoUrl ? (
          <h1>
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="mx-auto h-14 w-auto sm:h-16"
            />
          </h1>
        ) : (
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            {brand.name}
          </h1>
        )}
        <p className="mt-3 text-sm font-medium text-neutral-500">
          {l(brand.tagline)}
        </p>

        {story ? (
          <p className="mx-auto mt-12 max-w-2xl whitespace-pre-line text-base leading-loose text-neutral-700">
            {story}
          </p>
        ) : (
          <p className="mx-auto mt-12 max-w-2xl text-sm italic text-neutral-400">
            {t('brand.hero.storyComingSoon')}
          </p>
        )}
      </div>
    </section>
  );
}
