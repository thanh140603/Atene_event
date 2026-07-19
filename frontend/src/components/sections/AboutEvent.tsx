import type { EventInfo } from '../../types';
import { homeAssets } from '../../lib/homeAssets';
import { useT } from '../../i18n/LanguageProvider';

export default function AboutEvent({ event }: { event: EventInfo }) {
  const t = useT();
  return (
    <section id="about" className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('home.about.heading')}</h2>
        <div className="heading-rule" />

        <p className="mt-8 text-center text-base text-neutral-600 sm:text-lg">
          {event.aboutSubtitle}
        </p>

        {/* Logo with トク(得) / パック(Pack) annotations */}
        <div className="mt-14 flex justify-center">
          <img
            src={homeAssets.aboutLogo}
            alt={t('home.about.logoAlt')}
            className="w-full max-w-2xl"
          />
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-neutral-600 sm:text-base">
          {event.aboutBody}
        </p>
      </div>
    </section>
  );
}
