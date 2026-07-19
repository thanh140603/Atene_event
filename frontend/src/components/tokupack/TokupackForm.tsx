import { useState } from 'react';
import { api } from '../../lib/api';

const BRANDS = [
  'VT Cosmetics',
  'Purito',
  'Beplain',
  'TORHOP',
  'Lubylab',
  'Dr.DEEP',
  'BABACO',
  'Daily Weekly',
];

// Q3 — single choice: brands + specials (mirrors the Google Form exactly)
const PREFERRED_OPTIONS = [...BRANDS, 'すべて希望する', 'その他'];

// Q4 — multiple choice: brands + specials
const LIVE_COMMERCE_OPTIONS = [
  ...BRANDS,
  '特に決まっていない',
  '他のコラボレーション形式を希望する',
];

const OTHER = 'その他';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preferredBrand, setPreferredBrand] = useState('');
  const [preferredBrandOther, setPreferredBrandOther] = useState('');
  const [liveCommerceBrands, setLiveCommerceBrands] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleLiveBrand = (value: string) => {
    setLiveCommerceBrands((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    );
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'お名前を入力してください。';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = '有効なメールアドレスを入力してください。';
    if (!preferredBrand) next.preferredBrand = '1つ選択してください。';
    if (preferredBrand === OTHER && !preferredBrandOther.trim())
      next.preferredBrandOther = '内容を入力してください。';
    if (liveCommerceBrands.length === 0)
      next.liveCommerceBrands = '1つ以上選択してください。';
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
        email: email.trim(),
        preferredBrand,
        preferredBrandOther:
          preferredBrand === OTHER ? preferredBrandOther.trim() : '',
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
              送信ありがとうございました
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              TOKUPACKのリクエストを受け付けました。
              イベント当日の詳細はご登録のメールアドレスにご案内します。
            </p>
            <a
              href="#/"
              className="btn-pill mt-8 bg-neutral-900 text-white hover:opacity-90"
            >
              ← イベントページに戻る
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
            <Label required>あなたのお名前</Label>
            <p className="mt-1 text-xs text-neutral-400">
              参加チケットに記載のお名前をご記入ください。
            </p>
            <input
              className={`mt-2 ${inputClass}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田 花子"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-brand">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mt-8">
            <Label required>メールアドレス</Label>
            <p className="mt-1 text-xs text-neutral-400">
              事前登録時に使用したメールアドレスをご記入ください。
            </p>
            <input
              type="email"
              className={`mt-2 ${inputClass}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-brand">{errors.email}</p>
            )}
          </div>

          {/* Q3 — preferred brand (single) */}
          <div className="mt-8">
            <Label required>
              イベント当日、どのブランドの「Tokupack」を一番受け取りたいですか？
            </Label>
            <div className="mt-3 space-y-2">
              {PREFERRED_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                    preferredBrand === opt
                      ? 'border-[#2f6bff] bg-[#2f6bff]/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="preferredBrand"
                    className="accent-[#2f6bff]"
                    checked={preferredBrand === opt}
                    onChange={() => setPreferredBrand(opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            {preferredBrand === OTHER && (
              <input
                className={`mt-3 ${inputClass}`}
                value={preferredBrandOther}
                onChange={(e) => setPreferredBrandOther(e.target.value)}
                placeholder="その他の内容をご記入ください"
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
            <Label required>
              今後、どのブランドのTOKUPACKでライブ配信（ライブコマース）をしてみたいですか？
            </Label>
            <p className="mt-1 text-xs text-neutral-400">
              複数選択できます。
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
                  <span>{opt}</span>
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
            <Label>ご質問・ご要望（任意）</Label>
            <textarea
              rows={4}
              className={`mt-2 ${inputClass} resize-none`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="ご自由にご記入ください"
            />
          </div>

          {/* Submit */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={status === 'saving'}
              className="btn-pill w-full justify-center bg-neutral-900 py-4 text-base text-white hover:opacity-90 disabled:opacity-40 sm:w-auto sm:px-16"
            >
              {status === 'saving' ? '送信中…' : '送信する →'}
            </button>
            {status === 'error' && (
              <p className="text-xs text-brand">
                送信に失敗しました。時間をおいて再度お試しください。
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
