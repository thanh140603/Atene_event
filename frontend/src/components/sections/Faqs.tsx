import type { Faq } from '../../types';
import { useT } from '../../i18n/LanguageProvider';

export default function Faqs({ faqs }: { faqs: Faq[] }) {
  const t = useT();
  return (
    <section id="faqs" className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('home.faqs.heading')}</h2>
        <div className="heading-rule" />
        <p className="mt-6 text-center text-sm text-neutral-500">
          {t('home.faqs.sub')}
        </p>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-2">
          {faqs.map((faq, i) => (
            <div key={faq.id} className="border-b border-neutral-100 pb-5">
              <div className="flex gap-3">
                <span className="text-sm font-bold text-brand">
                  Q{i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
