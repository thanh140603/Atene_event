import { useT } from '../../i18n/LanguageProvider';

const BRANDS = [
  'VT Cosmetics',
  'Purito',
  'Celonia',
  'Beplain',
  'TORHOP',
  'Lubylab',
  'Dr.DEEP',
  'BABACO',
  'Daily Weekly',
  'Zipiel',
];

/**
 * Intro band styled after the reference inquiry form.
 * Introduces the TokuPack request form and lists the participating brands.
 */
export default function TokupackHero() {
  const t = useT();
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ background: '#efefef' }}
    >
      <div className="section-container relative py-20 text-center sm:py-24">
        <p className="text-xs font-semibold tracking-[0.3em] text-brand sm:text-sm">
          {t('tokupack.hero.eyebrow')}
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-2xl font-extrabold leading-snug tracking-tight text-neutral-900 sm:text-4xl">
          {t('tokupack.hero.title')}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-neutral-600">
          {t('tokupack.hero.subtitle')}
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium text-neutral-500">
          {BRANDS.map((b, i) => (
            <span key={b} className="flex items-center gap-3">
              {i > 0 && <span className="text-neutral-300">/</span>}
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
