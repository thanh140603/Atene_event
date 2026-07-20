import type { BrandContent } from '../../data/brands';
import { useT } from '../../i18n/LanguageProvider';

/**
 * Brand introduction: the brand name centered with its story below,
 * mirroring the reference brand-page layout.
 */
export default function BrandIntro({ brand }: { brand: BrandContent }) {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container py-20 text-center sm:py-24">
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          {brand.name}
        </h1>
        <p className="mt-3 text-sm font-medium text-neutral-500">
          {brand.tagline}
        </p>

        {brand.story ? (
          <p className="mx-auto mt-12 max-w-2xl text-base leading-loose text-neutral-700">
            {brand.story}
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
