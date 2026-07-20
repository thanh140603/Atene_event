import type { EventInfo } from '../../types';
import { homeAssets } from '../../lib/homeAssets';
import { useT } from '../../i18n/LanguageProvider';

export default function CreatorSourcingDay({ event }: { event: EventInfo }) {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2">
        {/* Editorial image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-200">
          <img
            src={homeAssets.creatorPhoto}
            alt={t('home.creator.imageAlt')}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-6 top-6 text-sm font-medium tracking-[0.3em] text-white/90 mix-blend-difference">
            {t('home.creator.tokyoTag')}
          </span>
        </div>

        {/* Copy + stats */}
        <div>
          <img
            src={homeAssets.csdBadge}
            alt=""
            aria-hidden
            className="mb-6 h-16 w-16 object-contain"
          />
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            CREATOR SOURCING DAY
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600">
            K-BeautyブランドのTikTok限定「TOKUPACK」を、誰よりも早く体験・測定できるほか、
            まだ一般公開されていない特別なセットをいち早く知ることができ、実際のライブ販売につながる機会を得られます。
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {event.stats.map((s) => (
              <div key={s.id} className="border-l-2 border-brand pl-4">
                <p className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] leading-tight text-neutral-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
