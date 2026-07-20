import type { BrandContent } from '../../data/brands';
import { brandVideos } from '../../lib/homeAssets';
import { useT } from '../../i18n/LanguageProvider';

/**
 * Opening section: the brand animation video filling the whole section,
 * autoplaying (muted, looped) as soon as the page opens.
 */
export default function BrandVideoHero({ brand }: { brand: BrandContent }) {
  const t = useT();
  const videoUrl = brandVideos[brand.slug] ?? brand.heroVideoUrl;

  return (
    <section className="relative w-full bg-black">
      {videoUrl ? (
        <video
          src={videoUrl}
          className="h-[60vh] w-full object-cover sm:h-[85vh]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <div className="flex h-[60vh] w-full items-center justify-center sm:h-[85vh]">
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
            {t('brand.hero.videoPlaceholder')}
          </span>
        </div>
      )}
    </section>
  );
}
