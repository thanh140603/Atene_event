import { useState } from 'react';
import type { Faq } from '../../types';
import { useT } from '../../i18n/LanguageProvider';

export default function Faqs({ faqs }: { faqs: Faq[] }) {
  const t = useT();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faqs" className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">{t('home.faqs.heading')}</h2>
        <div className="heading-rule" />
        <p className="mt-6 text-center text-sm text-neutral-500">
          {t('home.faqs.sub')}
        </p>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-2">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="border-b border-neutral-100 pb-5">
                <button
                  className="flex w-full gap-3 text-left"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-brand shrink-0">
                    Q{i + 1}
                  </span>
                  <div className="flex flex-1 items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-neutral-900">
                      {faq.question}
                    </h3>
                    <span className="text-neutral-400 text-sm shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>
                {isOpen && (
                  <p className="mt-2 pl-8 text-xs leading-relaxed text-neutral-500">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
