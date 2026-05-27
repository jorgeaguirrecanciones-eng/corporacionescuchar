"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Gift } from "lucide-react";

/* ─── Feed — diseñado para que el ciclo sume exactamente 12 ─── */
const feed = [
  { name: "Camila", seats: 2 },
  { name: "Felipe", seats: 1 },
  { name: "Valentina", seats: 3 },
  { name: "Diego", seats: 2 },
  { name: "Sofía", seats: 1 },
  { name: "Andrés", seats: 2 },
  { name: "Javiera", seats: 1 },
  { name: "Matías", seats: 2 },
  { name: "Isidora", seats: 3 },
  { name: "Paula", seats: 2 },
  { name: "Sebastián", seats: 1 },
  { name: "Tomás", seats: 3 },
  { name: "Constanza", seats: 1 },
];

const TOTAL = 12;
const INTERVAL = 3200;

const VIDEO_THUMB =
  "https://static.wixstatic.com/media/cf2b8e_fe109ead2ca942babb72a4f947d2ea89~mv2.jpeg/v1/fill/w_412,h_233,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/cf2b8e_fe109ead2ca942babb72a4f947d2ea89~mv2.jpeg";
const VIDEO_EMBED = "https://www.youtube.com/embed/OF4TSod3eL0?autoplay=1&rel=0";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [litCount, setLitCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [complete, setComplete] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (complete) {
      const t = setTimeout(() => {
        setComplete(false);
        setLitCount(0);
        setVisible(false);
        setTimeout(() => {
          setIndex((i) => (i + 1) % feed.length);
          setVisible(true);
        }, 350);
      }, 2200);
      return () => clearTimeout(t);
    }

    if (litCount === TOTAL - 3) return;

    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        const nextIndex = (index + 1) % feed.length;
        const added = feed[nextIndex].seats;
        const newLit = litCount + added;

        if (newLit >= TOTAL) {
          setLitCount(TOTAL);
          setComplete(true);
        } else {
          setLitCount(newLit);
        }
        setIndex(nextIndex);
        setVisible(true);
      }, 350);
    }, INTERVAL);

    return () => clearTimeout(t);
  }, [index, litCount, complete]);

  const { name, seats } = feed[index];
  const remaining = TOTAL - litCount;

  return (
    <section className="bg-white pt-12 pb-4 md:pt-16 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left: copy */}
          <div>
            <button
              onClick={() => setVideoOpen(true)}
              className="relative w-full rounded-2xl overflow-hidden mb-7 group block"
              aria-label="Ver video"
            >
              <img
                src={VIDEO_THUMB}
                alt="Círculo de Escucha"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-terracota ml-1" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>

            <p className="text-verde/50 font-sans text-sm font-semibold uppercase tracking-widest mb-4">
              Aporta un espacio en el Círculo de Escucha
            </p>
            <h1 className="font-heading text-[2.6rem] md:text-[3.2rem] leading-[1.1] text-verde mb-5">
              Escucharnos{" "}
              <span className="text-terracota">es urgente.</span>
            </h1>
            <p className="text-verde/70 text-lg leading-relaxed mb-8 max-w-md">
              No te pedimos que resuelvas la soledad del mundo. Solo que hagas posible que una persona más sepa lo que es ser escuchada de verdad.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <Link
                href="/dona"
                className="inline-flex items-center justify-center gap-2 bg-terracota hover:bg-terracota-dark text-white font-sans font-medium px-7 py-3.5 rounded-full transition-colors text-base"
              >
                <Gift size={18} />
                Aporta un espacio
              </Link>
              <div className="flex flex-col items-center sm:items-start gap-1">
                <Link
                  href="/circulos"
                  className="inline-flex items-center justify-center gap-2 text-white font-sans font-medium px-7 py-3.5 rounded-full transition-opacity hover:opacity-90 text-base"
                  style={{ backgroundColor: "#C8197A" }}
                >
                  Quiero participar
                </Link>
                <span className="text-verde/50 text-xs font-sans">
                  Inscríbete en un Círculo de Escucha
                </span>
              </div>
            </div>
          </div>

          {/* Right: círculo + ticker */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-beige rounded-3xl flex flex-col items-center p-6 gap-4">

              {/* Ticker */}
              <div
                style={{ transition: "opacity 350ms ease" }}
                className={`inline-flex items-center gap-2.5 bg-white/70 px-4 py-2 rounded-full ${visible ? "opacity-100" : "opacity-0"}`}
              >
                <Gift size={13} className="text-terracota shrink-0" />
                {complete ? (
                  <span className="text-sm font-sans text-terracota font-semibold whitespace-nowrap">
                    ¡Círculo completo! 🎉
                  </span>
                ) : (
                  <span className="text-sm font-sans text-verde/70 whitespace-nowrap">
                    <span className="font-semibold text-verde">{name}</span>
                    {" aportó "}
                    <span className="font-semibold text-terracota">
                      {seats} {seats === 1 ? "espacio" : "espacios"}
                    </span>
                  </span>
                )}
              </div>

              {/* Círculo */}
              <div className="w-full aspect-square flex items-center justify-center">
                <CircleOfChairs litCount={litCount} size={320} radius={118} />
              </div>

              {/* Mensaje de urgencia */}
              <p className="text-verde/65 font-sans text-sm text-center">
                {complete ? (
                  <span className="font-bold text-terracota">¡Círculo completo! Gracias a todos 🎉</span>
                ) : litCount === 0 ? (
                  <>
                    Sé el primero en{" "}
                    <span className="font-bold text-terracota">aportar un espacio</span>
                  </>
                ) : remaining === 1 ? (
                  <>
                    ¡Falta solo{" "}
                    <span className="font-bold text-terracota">1 espacio</span>{" "}
                    para completar un nuevo círculo!
                  </>
                ) : (
                  <>
                    Faltan{" "}
                    <span className="font-bold text-terracota">{remaining} espacios</span>{" "}
                    para completar un nuevo círculo
                  </>
                )}
              </p>

            </div>
          </div>

        </div>
      </div>

      {/* Modal de video */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video">
              <iframe
                src={VIDEO_EMBED}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              aria-label="Cerrar video"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
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

  const positions = Array.from({ length: totalSeats }, (_, i) => {
    const angle = (i / totalSeats) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      lit: i < litCount,
    };
  });

  // Ring (+1) and chord (+4) connections — deduplicated
  const connections: Array<{ a: number; b: number }> = [];
  const seen = new Set<string>();
  for (let i = 0; i < totalSeats; i++) {
    for (const offset of [1, 4]) {
      const j = (i + offset) % totalSeats;
      const a = Math.min(i, j);
      const b = Math.max(i, j);
      const key = `${a}-${b}`;
      if (!seen.has(key)) {
        seen.add(key);
        connections.push({ a, b });
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Subtle background */}
      <circle cx={cx} cy={cy} r={radius * 0.52} fill="#3D3D3D" opacity="0.03" />
      <circle cx={cx} cy={cy} r={radius * 0.38} fill="#3D3D3D" opacity="0.04" />

      {/* Dashed guide ring */}
      <circle
        cx={cx} cy={cy} r={radius}
        fill="none"
        stroke="#9B9B9B"
        strokeWidth="0.6"
        strokeDasharray="4 7"
        opacity="0.08"
      />

      {/* Network lines */}
      {connections.map(({ a, b }) => {
        const pa = positions[a];
        const pb = positions[b];
        const bothLit = pa.lit && pb.lit;
        const eitherLit = pa.lit || pb.lit;
        return (
          <line
            key={`net-${a}-${b}`}
            x1={pa.x} y1={pa.y}
            x2={pb.x} y2={pb.y}
            stroke={bothLit ? "#6B2DB5" : "#9B9B9B"}
            strokeWidth={bothLit ? 0.9 : 0.5}
            opacity={bothLit ? 0.22 : eitherLit ? 0.1 : 0.06}
          />
        );
      })}

      {/* Person nodes */}
      {positions.map(({ x, y, lit }, i) => (
        <Person key={`person-${i}`} x={x} y={y} lit={lit} />
      ))}

      {/* Center: listening symbol */}
      <CenterListening cx={cx} cy={cy} />
    </svg>
  );
}

function Person({ x, y, lit }: { x: number; y: number; lit: boolean }) {
  const fill = lit ? "#6B2DB5" : "#C4B8A8";
  const stroke = lit ? "#4A1D8A" : "#A89888";

  return (
    <g transform={`translate(${x},${y})`}>
      {lit && <circle cx={0} cy={0} r={19} fill="#6B2DB5" opacity={0.15} />}
      {/* Head */}
      <circle cx={0} cy={-9} r={5} fill={fill} stroke={stroke} strokeWidth={0.8} />
      {/* Shoulders */}
      <path d="M -9 6 Q -10 -3 0 -3 Q 10 -3 9 6 Z" fill={fill} stroke={stroke} strokeWidth={0.8} />
    </g>
  );
}

function CenterListening({ cx, cy }: { cx: number; cy: number }) {
  // Upward arcs (210° each) centered on 12 o'clock — sound/listening waves
  // Formula: M -r*cos15° r*sin15° A r r 0 1 0 r*cos15° r*sin15°
  const arc = (r: number) =>
    `M ${(-r * 0.966).toFixed(2)} ${(r * 0.259).toFixed(2)} A ${r} ${r} 0 1 0 ${(r * 0.966).toFixed(2)} ${(r * 0.259).toFixed(2)}`;

  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Background glow */}
      <circle cx={0} cy={0} r={58} fill="#3D3D3D" opacity={0.03} />
      <circle cx={0} cy={0} r={46} fill="#3D3D3D" opacity={0.05} />
      <circle cx={0} cy={0} r={34} fill="#3D3D3D" opacity={0.07} />
      <circle cx={0} cy={0} r={30} fill="white" opacity={0.96} />
      {/* Listening arcs — morado, progressive opacity */}
      <path d={arc(20)} fill="none" stroke="#6B2DB5" strokeWidth={2}   strokeLinecap="round" opacity={0.2}  />
      <path d={arc(14)} fill="none" stroke="#6B2DB5" strokeWidth={2.2} strokeLinecap="round" opacity={0.45} />
      <path d={arc(8)}  fill="none" stroke="#6B2DB5" strokeWidth={2.5} strokeLinecap="round" opacity={0.65} />
      {/* Center dot */}
      <circle cx={0} cy={0} r={3} fill="#6B2DB5" opacity={0.65} />
    </g>
  );
}
