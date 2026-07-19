export const GMAP_URL =
  'https://www.google.com/maps/place/InterContinental+the+Strings+Tokyo+by+IHG/@35.6282365,139.7402153,18.53z/data=!3m1!5s0x60188a5ae14f9aab:0x198694fc506fd2a1!4m9!3m8!1s0x60188a5ae105f69f:0xca89ff0033f2e939!5m2!4m1!1i2!8m2!3d35.6278741!4d139.74077!16s%2Fg%2F1213ttz_?entry=tts';

// Keyless embed centred on the venue — shows the labelled marker without an API key.
const GMAP_EMBED =
  'https://www.google.com/maps?q=InterContinental+the+Strings+Tokyo+by+IHG&z=16&output=embed';

export default function AccessMap() {
  return (
    <section className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">Access</h2>
        <div className="heading-rule" />

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
          <iframe
            title="Map to InterContinental the Strings Tokyo"
            src={GMAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[280px] w-full sm:h-[360px]"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-neutral-500">
            ストリングスホテル東京インターコンチネンタル
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            InterContinental the Strings Tokyo by IHG
          </p>

          <a
            href={GMAP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-md border border-neutral-300 px-8 py-2.5 text-xs font-semibold tracking-widest text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            Google Map
          </a>
        </div>
      </div>
    </section>
  );
}
