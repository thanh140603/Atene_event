import type { SocialLink } from '../../types';
import { homeAssets } from '../../lib/homeAssets';
import { useT } from '../../i18n/LanguageProvider';

function platformLabel(platform: string) {
  if (platform === 'tiktok') return { icon: '♪', name: 'TIKTOK' };
  return { icon: '◎', name: 'INSTAGRAM' };
}

export default function FollowUs({ socials }: { socials: SocialLink[] }) {
  const t = useT();
  return (
    <section id="follow" className="bg-neutral-50">
      <div className="section-container py-20 sm:py-24">
        <h2 className="text-center text-lg font-bold tracking-tight">
          {t('home.follow.heading')}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {socials.map((s) => {
            const p = platformLabel(s.platform);
            return (
              <div
                key={s.id}
                className="flex flex-col items-center rounded-lg border border-neutral-200 bg-white px-6 py-10 text-center"
              >
                <p className="flex items-center gap-1.5 text-xs font-medium tracking-[0.2em] text-neutral-400">
                  <span aria-hidden>{p.icon}</span> {p.name}
                </p>
                <p className="mt-5 font-serif text-2xl font-semibold tracking-wide text-neutral-900">
                  {s.label}
                </p>
                <p className="mt-1 text-xs text-neutral-400">{s.handle}</p>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-md border border-neutral-300 px-10 py-2.5 text-xs font-semibold tracking-widest text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
                >
                  {t('home.follow.follow')}
                </a>
              </div>
            );
          })}

          {/* LINE — scan to add */}
          <div className="flex flex-col items-center rounded-lg border border-neutral-200 bg-white px-6 py-10 text-center">
            <p className="flex items-center gap-1.5 text-xs font-medium tracking-[0.2em] text-neutral-400">
              <span aria-hidden>💬</span> LINE
            </p>
            <img
              src={homeAssets.lineQr}
              alt={t('home.follow.lineAlt')}
              className="mt-5 h-32 w-32"
            />
            <p className="mt-4 text-xs text-neutral-400">
              {t('home.follow.lineScan')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
