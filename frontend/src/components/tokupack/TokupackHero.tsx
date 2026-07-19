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

/**
 * Blue-gradient intro band styled after the reference inquiry form.
 * Introduces the TokuPack request form and lists the participating brands.
 */
export default function TokupackHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(120deg, #eaf1ff 0%, #dce8ff 45%, #eef4ff 100%)',
      }}
    >
      {/* faint oversized watermark, echoing the reference "C" */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 select-none text-[220px] font-black leading-none text-white/40 sm:text-[300px]"
      >
        T
      </span>

      <div className="section-container relative py-20 text-center sm:py-24">
        <p className="text-xs font-semibold tracking-[0.3em] text-[#2f6bff] sm:text-sm">
          CREATOR SOURCING DAY 2026 · TOKUPACK
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-2xl font-extrabold leading-snug tracking-tight text-neutral-900 sm:text-4xl">
          受け取りたいTOKUPACKを教えてください
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-neutral-600">
          イベント当日に受け取りたいブランドと、今後ライブ配信してみたいブランドを
          事前に教えてください。あなたにぴったりのK-Beauty体験をご用意します。
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
