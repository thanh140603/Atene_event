import { useT } from '../../i18n/LanguageProvider';

// Floor plan artwork (uploaded to /venue) with empty booth boxes; brand logos
// are overlaid at fixed percentage positions matching each box in the image.
const VENUE_IMG = encodeURI('/venue/Venue.png');
const LOGO_BLACK = '/homepage/03_Participating Brands_Asset/Logo_Black';
const black = (f: string) => encodeURI(`${LOGO_BLACK}/${f}`);

interface Slot {
  /** Percentage box (relative to the Venue.png dimensions). */
  left: number;
  top: number;
  w: number;
  h: number;
  name: string;
  /** Logo image; when absent, `name` is rendered as a text logo. */
  src?: string;
  /** Dark tiles are filled black with a white logo, like the reference. */
  dark?: boolean;
  /** Serif text logo (e.g. Celonia). */
  serif?: boolean;
  /** Render the logo a bit smaller inside its box. */
  shrink?: boolean;
}

const slots: Slot[] = [
  // Left anchor — slightly smaller logo so it doesn't spill out of its box.
  { left: 7, top: 29.5, w: 17, h: 29, name: 'VT Cosmetics', src: black('VT.png'), shrink: true },

  // Left 2×2 block
  { left: 26.6, top: 21.5, w: 10.6, h: 20.5, name: 'Babaco', src: black('Babaco.png') },
  { left: 38.8, top: 21.5, w: 9.5, h: 20.5, name: 'Daily Weekly', src: black('DailyWeekly.png') },
  { left: 25, top: 42.7, w: 11.5, h: 23.8, name: 'Torhop', src: black('Torhop.png') },
  { left: 37.3, top: 42.7, w: 11, h: 23.8, name: 'Dr.Deep', src: black('Dr.Deep.png') },

  // Right 2×2 block
  { left: 52, top: 21.5, w: 9.5, h: 20.5, name: 'Beplain', src: black('Beplain.png') },
  { left: 62.8, top: 21.5, w: 10.7, h: 20.5, name: 'Celonia', src: black('Celonia.png') },
  { left: 52, top: 42.7, w: 10.8, h: 23.8, name: 'Lubylab', src: black('Lubylab.png') },
  { left: 64.5, top: 42.7, w: 10.8, h: 23.8, name: 'ATENE', src: black('Atene_Logo_Black (1).png') },

  // Right anchor
  { left: 75.8, top: 29.5, w: 19.2, h: 29, name: 'Purito Seoul', src: black('Purito.png') },
];

function BoothLogo({ slot }: { slot: Slot }) {
  return (
    <div
      className={`absolute flex items-center justify-center ${
        slot.dark ? 'bg-neutral-900' : ''
      }`}
      style={{
        left: `${slot.left}%`,
        top: `${slot.top}%`,
        width: `${slot.w}%`,
        height: `${slot.h}%`,
      }}
    >
      {slot.src ? (
        <img
          src={slot.src}
          alt={slot.name}
          className={`object-contain ${
            slot.shrink ? 'max-h-[52%] max-w-[60%]' : 'max-h-[70%] max-w-[78%]'
          }`}
          loading="lazy"
        />
      ) : (
        <span
          className={`px-1 text-center font-bold leading-tight ${
            slot.dark ? 'text-white' : 'text-neutral-900'
          } ${slot.serif ? 'font-serif font-medium tracking-wide' : 'tracking-[0.15em]'}`}
          // Scales with the map width so text logos shrink on small screens.
          style={{ fontSize: 'clamp(9px, 1.6cqw, 22px)' }}
        >
          {slot.name}
        </span>
      )}
    </div>
  );
}

export default function VenueMap() {
  const t = useT();
  return (
    <section id="venue" className="bg-white">
      <div className="section-container py-10 sm:py-12">
        <h2 className="section-heading">{t('venue.map.title')}</h2>
        <div className="heading-rule" />

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-neutral-600">
          {t('venue.map.desc')}
        </p>

        {/* Gift box — small pink label top-left, body copy in black. */}
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-neutral-200 p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
            {t('venue.map.giftLabel')}
          </p>
          <p className="mt-3 text-justify text-sm leading-relaxed text-neutral-900">
            {t('venue.map.giftBody')}
          </p>
        </div>

        <div
          role="img"
          aria-label={t('venue.map.svgLabel')}
          className="relative mx-auto mt-14 max-w-4xl [container-type:inline-size]"
        >
          <img src={VENUE_IMG} alt="" className="h-auto w-full" />
          {slots.map((s) => (
            <BoothLogo key={s.name} slot={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
