"use client";

import { useState, useEffect } from "react";
import { CircleOfChairs } from "./Hero";

const TOTAL = 12;
const START = 3;       // empieza con 3 sillas iluminadas
const MS_PER_SEAT = 2000; // una silla cada 2s

export default function AnimatedCircle() {
  const [lit, setLit] = useState(START);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Si acaba de completarse, esperar y resetear
    if (complete) {
      const t = setTimeout(() => {
        setComplete(false);
        setLit(1); // reinicia desde 1
      }, 2400);
      return () => clearTimeout(t);
    }

    // Avanzar una silla
    const t = setTimeout(() => {
      setLit((prev) => {
        if (prev >= TOTAL) {
          setComplete(true);
          return TOTAL;
        }
        return prev + 1;
      });
    }, MS_PER_SEAT);

    return () => clearTimeout(t);
  }, [lit, complete]);

  const remaining = TOTAL - lit;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Circle */}
      <div className="w-full max-w-sm aspect-square bg-beige rounded-3xl flex items-center justify-center p-6">
        <CircleOfChairs litCount={lit} size={320} radius={118} />
      </div>

      {/* Message */}
      <div
        style={{ transition: "opacity 0.4s ease" }}
        className={`text-center px-2 ${complete ? "opacity-100" : "opacity-100"}`}
      >
        {complete ? (
          <p className="text-terracota font-heading text-base font-semibold">
            ¡Círculo completo! Gracias a quienes regalaron un asiento 🎉
          </p>
        ) : (
          <p className="text-verde/65 font-sans text-sm leading-snug">
            {remaining <= 0
              ? "¡Círculo completo!"
              : (
                <>
                  Falta{remaining > 1 ? "n" : ""}{" "}
                  <span className="font-bold text-terracota">
                    {remaining} {remaining === 1 ? "asiento" : "asientos"}
                  </span>{" "}
                  para completar un nuevo círculo
                </>
              )
            }
          </p>
        )}
      </div>
    </div>
  );
}
