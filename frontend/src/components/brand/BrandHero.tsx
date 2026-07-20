import type { BrandContent } from '../../data/brands';
import { brandVideos } from '../../lib/homeAssets';
import { useT } from '../../i18n/LanguageProvider';

export default function BrandHero({ brand }: { brand: BrandContent }) {
  const t = useT();
  const videoUrl = brandVideos[brand.slug] ?? brand.heroVideoUrl;
  return (
    <section className="bg-white">
      <div className="section-container py-16 sm:py-20">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-brand">
          {t('brand.kicker')}
        </p>
        <h1 className="mt-4 text-center text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          {brand.name}
        </h1>
        <p className="mt-3 text-center text-sm font-medium text-neutral-500">
          {brand.tagline}
        </p>

        {/* Brand animation video */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
          {videoUrl ? (
            <video
              src={videoUrl}
              className="aspect-video w-full object-cover"
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <Placeholder
              label={t('brand.hero.videoPlaceholder')}
              className="aspect-video"
            />
          )}
        </div>

        {/* Banner still */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
          {brand.heroImageUrl ? (
            <img
              src={brand.heroImageUrl}
              alt={t('brand.hero.bannerAlt', { name: brand.name })}
              className="aspect-[16/7] w-full object-cover"
            />
          ) : (
            <Placeholder
              label={t('brand.hero.bannerPlaceholder')}
              className="aspect-[16/7]"
            />
          )}
        </div>

        {/* Story */}
        {brand.story ? (
          <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-loose text-neutral-700">
            {brand.story}
          </p>
        ) : (
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm italic text-neutral-400">
            {t('brand.hero.storyComingSoon')}
          </p>
        )}
      </div>
    </section>
  );
}

function Placeholder({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-center justify-center border-2 border-dashed border-neutral-300 ${className}`}
    >
      <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
        {label}
      </span>
    </div>
  );
}
