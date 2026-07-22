import { homeAssets } from '../../lib/homeAssets';
import { useT } from '../../i18n/LanguageProvider';

export default function LineFooter() {
  const t = useT();
  return (
    <section className="bg-brand-dark">
      <div className="section-container pb-10 pt-16 sm:pt-20">
        {/* LINE content */}
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          {/* Left: text + button */}
          <div className="flex-1">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-neutral-400">
              <span className="h-px w-5 bg-neutral-400" />
              {t('home.follow.lineLabel')}
            </p>
            <h3 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {t('home.follow.lineTitle')}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
              {t('home.follow.lineDesc')}
            </p>
            <a
              href="https://line.me/ti/p/wbxRR8KLmQ"
              target="_blank"
              rel="noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-neutral-900 transition hover:opacity-90 sm:inline-flex sm:w-auto"
            >
              <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden>
                <path d="M12 3C6.5 3 2 6.6 2 11c0 2.86 1.87 5.37 4.68 6.78-.15.52-.96 3.3-.99 3.52 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.42 4.28-2.83.55.08 1.12.12 1.7.12 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
              </svg>
              {t('home.follow.lineBtn')}
            </a>
          </div>

          {/* Right: QR code */}
          <div className="flex flex-col items-center gap-3 self-center sm:self-auto">
            <img
              src={homeAssets.lineQr}
              alt={t('home.follow.lineAlt')}
              className="h-40 w-40 rounded-lg sm:h-32 sm:w-32"
            />
            <p className="text-[10px] font-semibold tracking-[0.2em] text-neutral-500">
              {t('home.follow.lineScanLabel')}
            </p>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 pt-2 text-center">
          <p className="text-sm font-semibold text-neutral-400">Powered by ATENE</p>
          <p className="mt-1 text-xs text-neutral-600">© 2026 ATENE. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
