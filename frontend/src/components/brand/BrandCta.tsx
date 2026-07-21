import type { BrandContent } from '../../data/brands';
import { useT } from '../../i18n/LanguageProvider';

export default function BrandCta({ brand }: { brand: BrandContent }) {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="section-container py-24 text-center sm:py-32">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
          {t('brand.cta.heading', { name: brand.name })}
        </h2>
        <a
          href="#/reserve"
          className="btn-pill mt-10 bg-brand px-8 py-4 text-base text-white shadow-lg shadow-brand/20 hover:opacity-90"
        >
          {t('brand.cta.button')}
        </a>
      </div>
    </section>
  );
}
