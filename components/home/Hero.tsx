"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

/* ─── Feed — diseñado para que el ciclo sume exactamente 12 ─── */
const feed = [
  { name: "Camila", seats: 2 },      // → 2  | faltan 10
  { name: "Felipe", seats: 1 },      // → 3  | faltan 9
  { name: "Valentina", seats: 3 },   // → 6  | faltan 6
  { name: "Diego", seats: 2 },       // → 8  | faltan 4
  { name: "Sofía", seats: 1 },       // → 9  | faltan 3 ★
  { name: "Andrés", seats: 2 },      // → 11 | falta 1
  { name: "Javiera", seats: 1 },     // → 12 | ¡COMPLETO!
  { name: "Matías", seats: 2 },      // → 2  | faltan 10
  { name: "Isidora", seats: 3 },     // → 5  | faltan 7
  { name: "Paula", seats: 2 },       // → 7  | faltan 5
  { name: "Sebastián", seats: 1 },   // → 8  | faltan 4
  { name: "Tomás", seats: 3 },       // → 11 | falta 1
  { name: "Constanza", seats: 1 },   // → 12 | ¡COMPLETO!
];

const TOTAL = 12;
const INTERVAL = 3200; // ms entre nombres

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [litCount, setLitCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Estado de círculo completo: esperar y luego avanzar al siguiente
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

    // Pausar cuando faltan exactamente 3 — el visitante siente que puede completar el círculo
    if (litCount === TOTAL - 3) return;

    // Avanzar al siguiente donante
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

          </div>

          {/* Right: círculo + ticker + mensaje — todo dentro del box beige */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-beige rounded-3xl flex flex-col items-center p-6 gap-4">

              {/* Círculo */}
              <div className="w-full aspect-square flex items-center justify-center">
                <CircleOfChairs litCount={litCount} size={320} radius={118} />
              </div>

              {/* Ticker — quién acaba de donar */}
              <div
                style={{ transition: "opacity 350ms ease" }}
                className={`inline-flex items-center gap-2.5 bg-white/70 px-4 py-2 rounded-full ${visible ? "opacity-100" : "opacity-0"}`}
              >
                <Heart size={13} className="text-terracota shrink-0" fill="currentColor" />
                {complete ? (
                  <span className="text-sm font-sans text-terracota font-semibold whitespace-nowrap">
                    ¡Círculo completo! 🎉
                  </span>
                ) : (
                  <span className="text-sm font-sans text-verde/70 whitespace-nowrap">
                    <span className="font-semibold text-verde">{name}</span>
                    {" ya regaló "}
                    <span className="font-semibold text-terracota">
                      {seats} {seats === 1 ? "asiento" : "asientos"}
                    </span>
                  </span>
                )}
              </div>

              {/* Mensaje de urgencia */}
              <p className="text-verde/65 font-sans text-sm text-center">
                {complete ? (
                  <span className="font-bold text-terracota">¡Círculo completo! Gracias a todos 🎉</span>
                ) : litCount === 0 ? (
                  <>
                    Sé el primero en{" "}
                    <span className="font-bold text-terracota">regalar un asiento</span>
                  </>
                ) : remaining === 1 ? (
                  <>
                    ¡Falta solo{" "}
                    <span className="font-bold text-terracota">1 asiento</span>{" "}
                    para completar un nuevo círculo!
                  </>
                ) : (
                  <>
                    Faltan{" "}
                    <span className="font-bold text-terracota">{remaining} asientos</span>{" "}
                    para completar un nuevo círculo
                  </>
                )}
              </p>

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
      <circle cx={cx} cy={cy} r={radius * 0.52} fill="#E8603C" opacity="0.05" />
      <circle cx={cx} cy={cy} r={radius * 0.38} fill="#E8603C" opacity="0.07" />
      <circle
        cx={cx} cy={cy} r={radius}
        fill="none"
        stroke="#1A4A5C"
        strokeWidth="0.6"
        strokeDasharray="4 7"
        opacity="0.1"
      />
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
      <CenterHeart cx={cx} cy={cy} />
    </svg>
  );
}

function Chair({ x, y, angleDeg, lit }: { x: number; y: number; angleDeg: number; lit: boolean }) {
  const rot = angleDeg + 90;
  const seatFill   = lit ? "#E8603C" : "#E2D8CC";
  const seatStroke = lit ? "#C94E2C" : "#C4B8A8";
  const backFill   = lit ? "#B8422A" : "#CEC0AE";
  const backStroke = lit ? "#963220" : "#B0A090";

  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      {lit && <circle cx={0} cy={0} r={22} fill="#E8603C" opacity={0.18} />}
      <rect x={-12} y={-2} width={24} height={15} rx={4} fill={seatFill} stroke={seatStroke} strokeWidth={1.2} />
      <rect x={-9} y={-17} width={18} height={15} rx={3.5} fill={backFill} stroke={backStroke} strokeWidth={1.2} />
      <line x1={-12} y1={-2} x2={12} y2={-2} stroke="white" strokeWidth={1.5} opacity={0.6} />
    </g>
  );
}

function CenterHeart({ cx, cy }: { cx: number; cy: number }) {
  const heartPath = "M 20.84 4.61 a 5.5 5.5 0 0 0 -7.78 0 L 12 5.67 l -1.06 -1.06 a 5.5 5.5 0 0 0 -7.78 7.78 l 1.06 1.06 L 12 21.23 l 7.78 -7.78 1.06 -1.06 a 5.5 5.5 0 0 0 0 -7.78 z";
  const s = 4.2;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle cx={0} cy={0} r={58} fill="#E8603C" opacity={0.05} />
      <circle cx={0} cy={0} r={46} fill="#E8603C" opacity={0.08} />
      <circle cx={0} cy={0} r={34} fill="#E8603C" opacity={0.12} />
      <circle cx={0} cy={0} r={30} fill="white" opacity={0.95} />
      <g transform={`scale(${s}) translate(-12,-11)`}>
        <path d={heartPath} fill="#C94E2C" opacity={0.12} />
      </g>
      <g transform={`scale(${s}) translate(-12,-12)`}>
        <path d={heartPath} fill="#E8603C" />
      </g>
      <ellipse cx={-5} cy={-8} rx={7} ry={4} fill="white" opacity={0.22} transform="rotate(-25,-5,-8)" />
    </g>
  );
}
