import Link from "next/link";
import { Heart } from "lucide-react";

const pills = [
  { label: "Espacios gratuitos" },
  { label: "Comunidad" },
  { label: "Acompañamiento" },
  { label: "Impacto visible" },
];

export default function Hero() {
  return (
    <section className="bg-white pt-12 pb-4 md:pt-16 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <h1 className="font-heading text-[2.6rem] md:text-[3.2rem] leading-[1.1] text-verde mb-5">
              Regala un asiento en un{" "}
              <span className="text-terracota">Círculo de Escucha.</span>
            </h1>
            <p className="text-verde/70 text-lg leading-relaxed mb-8 max-w-md">
              Tu aporte permite que una persona —con nombre y apellido— encuentre un espacio gratuito de escucha, contención y comunidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <Link
                href="/dona"
                className="inline-flex items-center justify-center gap-2 bg-terracota hover:bg-terracota-dark text-white font-sans font-medium px-7 py-3.5 rounded-full transition-colors text-base"
              >
                <Heart size={18} fill="currentColor" />
                Regala un asiento
              </Link>
              <div className="flex flex-col items-center sm:items-start gap-1">
                <Link
                  href="/circulos"
                  className="inline-flex items-center justify-center gap-2 border-2 border-verde/30 hover:border-verde text-verde font-sans font-medium px-7 py-3.5 rounded-full transition-colors text-base"
                >
                  Recibe un asiento
                </Link>
                <span className="text-verde/50 text-xs font-sans">
                  Inscríbete en un Círculo de Escucha
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {pills.map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center text-sm font-sans text-verde/70 bg-beige px-3 py-1.5 rounded-full"
                >
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: circle illustration */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm aspect-square bg-beige rounded-3xl flex items-center justify-center p-6">
              <CircleOfChairs litCount={4} size={320} radius={118} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Shared circle component ─── */

export function CircleOfChairs({
  litCount,
  size = 380,
  radius = 140,
  totalSeats = 12,
}: {
  litCount: number;
  size?: number;
  radius?: number;
  totalSeats?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Ambient atmosphere */}
      <circle cx={cx} cy={cy} r={radius * 0.52} fill="#E8603C" opacity="0.05" />
      <circle cx={cx} cy={cy} r={radius * 0.38} fill="#E8603C" opacity="0.07" />

      {/* Orbit ring */}
      <circle
        cx={cx} cy={cy} r={radius}
        fill="none"
        stroke="#1A4A5C"
        strokeWidth="0.6"
        strokeDasharray="4 7"
        opacity="0.1"
      />

      {/* Radial lines */}
      {Array.from({ length: totalSeats }).map((_, i) => {
        const angle = (i / totalSeats) * 2 * Math.PI - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        const lit = i < litCount;
        return (
          <line
            key={`line-${i}`}
            x1={cx} y1={cy} x2={x} y2={y}
            stroke={lit ? "#E8603C" : "#1A4A5C"}
            strokeWidth={lit ? "1" : "0.5"}
            opacity={lit ? 0.18 : 0.07}
          />
        );
      })}

      {/* Chairs */}
      {Array.from({ length: totalSeats }).map((_, i) => {
        const angle = (i / totalSeats) * 2 * Math.PI - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        const angleDeg = (angle * 180) / Math.PI;
        const lit = i < litCount;
        return (
          <Chair key={`chair-${i}`} x={x} y={y} angleDeg={angleDeg} lit={lit} />
        );
      })}

      {/* Center heart — the emotional focal point */}
      <CenterHeart cx={cx} cy={cy} />
    </svg>
  );
}

/* ─── Chair: top-down icon, backrest faces outward ─── */
function Chair({
  x, y, angleDeg, lit,
}: {
  x: number; y: number; angleDeg: number; lit: boolean;
}) {
  const rot = angleDeg + 90; // backrest faces outward

  const seatFill  = lit ? "#E8603C" : "#E2D8CC";
  const seatStroke = lit ? "#C94E2C" : "#C4B8A8";
  const backFill  = lit ? "#B8422A" : "#CEC0AE";
  const backStroke = lit ? "#963220" : "#B0A090";

  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      {/* Glow when lit */}
      {lit && (
        <circle cx={0} cy={0} r={22} fill="#E8603C" opacity={0.18} />
      )}

      {/* ── Seat (wider, bottom) ── */}
      <rect x={-12} y={-2} width={24} height={15} rx={4}
        fill={seatFill} stroke={seatStroke} strokeWidth={1.2} />

      {/* ── Backrest (narrower, top — faces outward) ── */}
      <rect x={-9} y={-17} width={18} height={15} rx={3.5}
        fill={backFill} stroke={backStroke} strokeWidth={1.2} />

      {/* Thin gap line to visually separate the two */}
      <line x1={-12} y1={-2} x2={12} y2={-2}
        stroke="white" strokeWidth={1.5} opacity={0.6} />
    </g>
  );
}

/* ─── Large heart: the emotional center ─── */
function CenterHeart({ cx, cy }: { cx: number; cy: number }) {
  const heartPath =
    "M 20.84 4.61 a 5.5 5.5 0 0 0 -7.78 0 L 12 5.67 l -1.06 -1.06 a 5.5 5.5 0 0 0 -7.78 7.78 l 1.06 1.06 L 12 21.23 l 7.78 -7.78 1.06 -1.06 a 5.5 5.5 0 0 0 0 -7.78 z";

  // scale 4.2 → heart visual ~70px tall in SVG units
  const s = 4.2;

  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Glow halos */}
      <circle cx={0} cy={0} r={58} fill="#E8603C" opacity={0.05} />
      <circle cx={0} cy={0} r={46} fill="#E8603C" opacity={0.08} />
      <circle cx={0} cy={0} r={34} fill="#E8603C" opacity={0.12} />

      {/* White backdrop for contrast */}
      <circle cx={0} cy={0} r={30} fill="white" opacity={0.95} />

      {/* Drop shadow */}
      <g transform={`scale(${s}) translate(-12,-11)`}>
        <path d={heartPath} fill="#C94E2C" opacity={0.12} />
      </g>

      {/* Main heart */}
      <g transform={`scale(${s}) translate(-12,-12)`}>
        <path d={heartPath} fill="#E8603C" />
      </g>

      {/* Shine highlight */}
      <ellipse cx={-5} cy={-8} rx={7} ry={4}
        fill="white" opacity={0.22}
        transform="rotate(-25,-5,-8)" />
    </g>
  );
}
