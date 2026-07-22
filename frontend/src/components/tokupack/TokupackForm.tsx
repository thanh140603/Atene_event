import { useState } from 'react';
import { api } from '../../lib/api';
import { useT } from '../../i18n/LanguageProvider';

const BRANDS = [
  'VT Cosmetics',
  'Purito',
  'Beplain',
  'TORHOP',
  'Lubylab',
  'Dr.DEEP',
  'BABACO',
  'Daily Weekly',
  'Celonia',
  'Zipiel',
];

// Stable option values sent to the API. Brand names are kept verbatim; the
// special choices keep their original Japanese values as the stored identifier
// while their visible label is resolved via t() at render time.
const ALL_BRANDS = 'すべて希望する';
const OTHER = 'その他';
const UNDECIDED = '特に決まっていない';
const OTHER_COLLAB = '他のコラボレーション形式を希望する';

// Maps a special option value to its i18n label key. Brand names have no entry
// and are displayed as-is.
const SPECIAL_LABEL_KEYS: Record<string, string> = {
  [ALL_BRANDS]: 'tokupack.form.options.allBrands',
  [OTHER]: 'tokupack.form.options.other',
  [UNDECIDED]: 'tokupack.form.options.undecided',
  [OTHER_COLLAB]: 'tokupack.form.options.otherCollab',
};

// Q3 — multiple choice: brands + specials
const PREFERRED_OPTIONS = [...BRANDS, ALL_BRANDS, OTHER];

// Q4 — multiple choice: brands + specials
const LIVE_COMMERCE_OPTIONS = [...BRANDS, UNDECIDED, OTHER_COLLAB];

type Status = 'idle' | 'saving' | 'done' | 'error';

function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-neutral-800">
      {children}
      {required && <span className="ml-1 text-brand">*</span>}
    </label>
  );
}

const inputClass =
  'w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-[#2f6bff] focus:bg-white focus:ring-2 focus:ring-[#2f6bff]/20';

export default function TokupackForm() {
  const t = useT();

  const optionLabel = (value: string) => {
    const key = SPECIAL_LABEL_KEYS[value];
    return key ? t(key) : value;
  };

  const [name, setName] = useState('');
  const [tiktokId, setTiktokId] = useState('');
  const [email, setEmail] = useState('');
  const [preferredBrands, setPreferredBrands] = useState<string[]>([]);
  const [preferredBrandOther, setPreferredBrandOther] = useState('');
  const [liveCommerceBrands, setLiveCommerceBrands] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleIn =
    (set: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) =>
      set((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
  const togglePreferredBrand = toggleIn(setPreferredBrands);
  const toggleLiveBrand = toggleIn(setLiveCommerceBrands);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = t('tokupack.form.name.error');
    if (!tiktokId.trim()) next.tiktokId = t('tokupack.form.tiktokId.error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = t('tokupack.form.email.error');
    if (preferredBrands.length === 0)
      next.preferredBrand = t('tokupack.form.preferredBrand.error');
    if (preferredBrands.includes(OTHER) && !preferredBrandOther.trim())
      next.preferredBrandOther = t('tokupack.form.preferredBrand.otherError');
    if (liveCommerceBrands.length === 0)
      next.liveCommerceBrands = t('tokupack.form.liveCommerce.error');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('saving');
    try {
      await api.createTokupackApplication({
        name: name.trim(),
        tiktokId: tiktokId.trim(),
        email: email.trim(),
        // The API stores a single string — multiple picks are comma-joined.
        preferredBrand: preferredBrands.join(', '),
        preferredBrandOther: preferredBrands.includes(OTHER)
          ? preferredBrandOther.trim()
          : '',
        liveCommerceBrands,
        comment: comment.trim() || undefined,
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <section className="bg-white">
        <div className="section-container py-24">
          <div className="mx-auto max-w-xl rounded-2xl border border-neutral-200 p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-white">
              ✓
            </div>
            <h2 className="mt-6 text-xl font-bold text-neutral-900">
              {t('tokupack.form.success.title')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {t('tokupack.form.success.message')}
            </p>
            <a
              href="#/"
              className="btn-pill mt-8 bg-neutral-900 text-white hover:opacity-90"
            >
              {t('tokupack.form.success.back')}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="section-container py-16 sm:py-20">
        <form
          onSubmit={submit}
          noValidate
          className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 p-6 shadow-sm sm:p-10"
        >
          {/* Name */}
          <div>
            <Label required>{t('tokupack.form.name.label')}</Label>
            <p className="mt-1 text-xs text-neutral-400">
              {t('tokupack.form.name.help')}
            </p>
            <input
              className={`mt-2 ${inputClass}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('tokupack.form.name.placeholder')}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-brand">{errors.name}</p>
            )}
          </div>

          {/* TikTok ID */}
          <div className="mt-8">
            <Label required>{t('tokupack.form.tiktokId.label')}</Label>
            <p className="mt-1 text-xs text-neutral-400">
              {t('tokupack.form.tiktokId.help')}
            </p>
            <input
              className={`mt-2 ${inputClass}`}
              value={tiktokId}
              onChange={(e) => setTiktokId(e.target.value)}
              placeholder={t('tokupack.form.tiktokId.placeholder')}
            />
            {errors.tiktokId && (
              <p className="mt-1 text-xs text-brand">{errors.tiktokId}</p>
            )}
          </div>

          {/* Email */}
          <div className="mt-8">
            <Label required>{t('tokupack.form.email.label')}</Label>
            <p className="mt-1 text-xs text-neutral-400">
              {t('tokupack.form.email.help')}
            </p>
            <input
              type="email"
              className={`mt-2 ${inputClass}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('tokupack.form.email.placeholder')}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-brand">{errors.email}</p>
            )}
          </div>

          {/* Q3 — preferred brands (multiple) */}
          <div className="mt-8">
            <Label required>{t('tokupack.form.preferredBrand.label')}</Label>
            <p className="mt-1 text-xs text-neutral-400">
              {t('tokupack.form.liveCommerce.help')}
            </p>
            <div className="mt-3 space-y-2">
              {PREFERRED_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                    preferredBrands.includes(opt)
                      ? 'border-[#2f6bff] bg-[#2f6bff]/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-[#2f6bff]"
                    checked={preferredBrands.includes(opt)}
                    onChange={() => togglePreferredBrand(opt)}
                  />
                  <span>{optionLabel(opt)}</span>
                </label>
              ))}
            </div>
            {preferredBrands.includes(OTHER) && (
              <input
                className={`mt-3 ${inputClass}`}
                value={preferredBrandOther}
                onChange={(e) => setPreferredBrandOther(e.target.value)}
                placeholder={t('tokupack.form.preferredBrand.otherPlaceholder')}
              />
            )}
            {errors.preferredBrand && (
              <p className="mt-1 text-xs text-brand">{errors.preferredBrand}</p>
            )}
            {errors.preferredBrandOther && (
              <p className="mt-1 text-xs text-brand">
                {errors.preferredBrandOther}
              </p>
            )}
          </div>

          {/* Q4 — live commerce brands (multiple) */}
          <div className="mt-8">
            <Label required>{t('tokupack.form.liveCommerce.label')}</Label>
            <p className="mt-1 text-xs text-neutral-400">
              {t('tokupack.form.liveCommerce.help')}
            </p>
            <div className="mt-3 space-y-2">
              {LIVE_COMMERCE_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                    liveCommerceBrands.includes(opt)
                      ? 'border-[#2f6bff] bg-[#2f6bff]/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-[#2f6bff]"
                    checked={liveCommerceBrands.includes(opt)}
                    onChange={() => toggleLiveBrand(opt)}
                  />
                  <span>{optionLabel(opt)}</span>
                </label>
              ))}
            </div>
            {errors.liveCommerceBrands && (
              <p className="mt-1 text-xs text-brand">
                {errors.liveCommerceBrands}
              </p>
            )}
          </div>

          {/* Comment (optional) */}
          <div className="mt-8">
            <Label>{t('tokupack.form.comment.label')}</Label>
            <textarea
              rows={4}
              className={`mt-2 ${inputClass} resize-none`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t('tokupack.form.comment.placeholder')}
            />
          </div>

          {/* Submit */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={status === 'saving'}
              className="btn-pill w-full justify-center bg-neutral-900 py-4 text-base text-white hover:opacity-90 disabled:opacity-40 sm:w-auto sm:px-16"
            >
              {status === 'saving'
                ? t('tokupack.form.submit.saving')
                : t('tokupack.form.submit.idle')}
            </button>
            {status === 'error' && (
              <p className="text-xs text-brand">
                {t('tokupack.form.submit.error')}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
