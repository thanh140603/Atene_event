// Booth positions are expressed in the SVG viewBox coordinate system below
// (800 × 470). The layout mirrors the reference floor map: a left/right anchor
// booth, a 4×2 grid of brands in the middle, and an ENTER marker at the bottom.
interface Booth {
  cx: number;
  cy: number;
  w: number;
  h: number;
  lines: string[];
  size?: number;
}

const COL = [250, 348, 446, 546]; // grid column centres
const ROW_TOP = 198;
const ROW_BOTTOM = 283;

const booths: Booth[] = [
  // Left anchor
  { cx: 158, cy: 240, w: 82, h: 74, lines: ['Purito', 'SEOUL'], size: 13 },

  // Top row
  { cx: COL[0], cy: ROW_TOP, w: 86, h: 38, lines: ['DAILY WEEKLY'], size: 9 },
  { cx: COL[1], cy: ROW_TOP, w: 86, h: 38, lines: ['LUBYLAB'], size: 11 },
  { cx: COL[2], cy: ROW_TOP, w: 86, h: 38, lines: ['Babaco'], size: 13 },
  { cx: COL[3], cy: ROW_TOP, w: 96, h: 38, lines: ['Quadthera'], size: 12 },

  // Bottom row
  { cx: COL[0], cy: ROW_BOTTOM, w: 86, h: 38, lines: ['Torhop'], size: 13 },
  { cx: COL[1], cy: ROW_BOTTOM, w: 86, h: 38, lines: ['Dr.deep'], size: 12 },
  { cx: COL[2], cy: ROW_BOTTOM, w: 86, h: 38, lines: ['beplain'], size: 12 },
  { cx: COL[3], cy: ROW_BOTTOM, w: 96, h: 46, lines: ['zipie', 'ATIKE'], size: 11 },

  // Right anchor
  { cx: 642, cy: 240, w: 84, h: 74, lines: ['VT', 'COSMETICS'], size: 12 },
];

function BoothTag({ cx, cy, w, h, lines, size = 12 }: Booth) {
  const x = cx - w / 2;
  const y = cy - h / 2;
  const lineHeight = 13;
  const firstY = cy - ((lines.length - 1) * lineHeight) / 2 + size / 3;

  return (
    <g filter="url(#boothShadow)">
      {/* tail (drawn first so the body covers the seam) */}
      <path
        d={`M ${x + 15} ${y + h} l 6 8 l 6 -8 z`}
        fill="url(#boothFill)"
        stroke="#cbcbcb"
        strokeWidth={1}
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={7}
        fill="url(#boothFill)"
        stroke="#cbcbcb"
        strokeWidth={1}
      />
      {/* subtle top highlight for the glossy bevel look */}
      <rect x={x + 2} y={y + 2} width={w - 4} height={(h - 4) / 2} rx={5} fill="#ffffff" opacity={0.55} />
      {lines.map((ln, i) => (
        <text
          key={i}
          x={cx}
          y={firstY + i * lineHeight}
          textAnchor="middle"
          fontSize={size}
          fontWeight={700}
          letterSpacing={ln === ln.toUpperCase() ? 0.5 : 0}
          fill="#171717"
        >
          {ln}
        </text>
      ))}
    </g>
  );
}

export default function VenueMap() {
  return (
    <section id="venue" className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">VENUE LAYOUT</h2>
        <div className="heading-rule" />

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-neutral-600">
          11ブランドの限定Tokupackが一堂に。会場マップで各ブランドのブースを確認して、
          お気に入りを見つけましょう。
        </p>

        <div className="mx-auto mt-14 max-w-4xl">
          <svg
            viewBox="0 0 800 470"
            role="img"
            aria-label="Venue floor plan showing brand booths and the entrance"
            className="h-auto w-full"
            style={{ fontFamily: 'inherit' }}
          >
            <defs>
              <linearGradient id="boothFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="55%" stopColor="#f2f2f2" />
                <stop offset="100%" stopColor="#d9d9d9" />
              </linearGradient>
              <filter id="boothShadow" x="-20%" y="-20%" width="140%" height="150%">
                <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* ---- Hall outline ---- */}
            <path
              d="M 108 350
                 L 108 172
                 L 152 122
                 Q 154 118 162 118
                 L 638 118
                 Q 646 118 648 122
                 L 692 172
                 L 692 350
                 L 455 350
                 M 345 350
                 L 108 350"
              fill="none"
              stroke="#111111"
              strokeWidth={5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* decorative top pillars */}
            <rect x="250" y="112" width="26" height="10" fill="#111111" />
            <rect x="524" y="112" width="26" height="10" fill="#111111" />

            {/* faint interior aisle dividers between grid columns */}
            {[299, 397, 494].map((x) => (
              <line
                key={x}
                x1={x}
                y1={160}
                x2={x}
                y2={322}
                stroke="#e5e5e5"
                strokeWidth={1.5}
              />
            ))}

            {/* ---- Booths ---- */}
            {booths.map((b, i) => (
              <BoothTag key={i} {...b} />
            ))}

            {/* ---- Stage / DJ booth marker near the entrance ---- */}
            <rect x="372" y="372" width="16" height="6" rx={2} fill="#111111" />
            <rect x="396" y="366" width="8" height="20" rx={2} fill="#111111" />
            <rect x="412" y="372" width="16" height="6" rx={2} fill="#111111" />

            {/* ---- ENTER guide ---- */}
            <g stroke="#9ca3af" strokeWidth={1.5} strokeDasharray="4 4" fill="none">
              <path d="M 350 355 L 360 405" />
              <path d="M 450 355 L 440 405" />
              <line x1="300" y1="428" x2="360" y2="428" />
              <line x1="440" y1="428" x2="500" y2="428" />
            </g>
            {/* up arrows indicating entry direction */}
            <path d="M 360 405 l -4 6 M 360 405 l 4 6" stroke="#9ca3af" strokeWidth={1.5} fill="none" />
            <path d="M 440 405 l -4 6 M 440 405 l 4 6" stroke="#9ca3af" strokeWidth={1.5} fill="none" />
            <text
              x="400"
              y="433"
              textAnchor="middle"
              fontSize={15}
              fontWeight={800}
              letterSpacing={3}
              fill="#111111"
            >
              ENTER
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
