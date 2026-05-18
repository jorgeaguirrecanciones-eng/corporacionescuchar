"use client";

import { useState } from "react";
import { Check, Heart } from "lucide-react";
import { CircleOfChairs } from "./Hero";

const seats = [
  {
    count: 1,
    price: "$10.000",
    impact: "Abro un espacio de escucha",
    emotional: "Permito que alguien sea escuchado",
  },
  {
    count: 2,
    price: "$20.000",
    impact: "Acompaño a dos personas",
    emotional: "Dos personas ya no están solas",
  },
  {
    count: 3,
    price: "$30.000",
    impact: "Soy parte activa del círculo",
    emotional: "Hago posible un círculo completo",
    popular: true,
  },
  {
    count: 5,
    price: "$50.000",
    impact: "Ayudo a abrir nuevos círculos",
    emotional: "Mi apoyo llega a nuevas comunidades",
  },
  {
    count: 0,
    price: "Tú decides",
    impact: "Elijo cuánto quiero aportar",
    emotional: "Cualquier monto transforma vidas",
    free: true,
  },
];

const TOTAL_SEATS = 12;
const CAMPAIGN_OPENED = 47;
const CAMPAIGN_GOAL = 120;

export default function SeatSelector() {
  const [selected, setSelected] = useState(2);

  const selectedSeat = seats[selected];
  const litCount = selectedSeat.free ? 3 : selectedSeat.count;

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Campaign progress */}
        <div className="mb-10 text-center">
          <p className="text-sm font-sans text-verde/60 mb-1">Campaña activa</p>
          <div className="inline-flex items-baseline gap-2">
            <span className="font-heading text-3xl text-verde font-bold">{CAMPAIGN_OPENED}</span>
            <span className="text-verde/60 font-sans text-sm">asientos abiertos de {CAMPAIGN_GOAL} meta</span>
          </div>
          <div className="mt-3 max-w-md mx-auto bg-beige rounded-full h-2.5">
            <div
              className="bg-terracota h-2.5 rounded-full transition-all"
              style={{ width: `${(CAMPAIGN_OPENED / CAMPAIGN_GOAL) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="font-heading text-2xl md:text-3xl text-verde text-center mb-8">
          Elige cuántos asientos quieres abrir
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
          {/* Cards */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {seats.map((seat, i) => {
                const isSelected = selected === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`relative rounded-2xl border-2 p-4 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-terracota bg-white shadow-lg shadow-terracota/10"
                        : "border-border bg-white hover:border-terracota/40"
                    }`}
                  >
                    {seat.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracota text-white text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full">
                        popular
                      </span>
                    )}

                    <div className="font-heading text-lg font-bold text-verde mb-0.5">
                      {seat.free ? "Monto libre" : `${seat.count} asiento${seat.count > 1 ? "s" : ""}`}
                    </div>
                    <div className="text-terracota font-sans font-semibold text-sm mb-2">
                      {seat.price}
                    </div>
                    <div className="text-verde/70 text-xs font-sans leading-snug mb-3">
                      {seat.impact}
                    </div>

                    {/* Chair icons */}
                    <div className="flex flex-wrap gap-0.5">
                      {seat.free ? (
                        <Heart size={13} className="text-terracota" fill="currentColor" />
                      ) : (
                        Array.from({ length: seat.count }).map((_, j) => (
                          <span key={j} className="text-[11px] text-terracota">⌾</span>
                        ))
                      )}
                    </div>

                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-terracota rounded-full flex items-center justify-center">
                        <Check size={11} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Emotional copy */}
            <div className="mt-5 p-4 bg-beige rounded-2xl">
              <p className="text-verde font-heading text-base italic">
                "{selectedSeat.emotional}"
              </p>
            </div>

            {/* CTA */}
            <button className="mt-5 w-full sm:w-auto bg-terracota hover:bg-terracota-dark text-white font-sans font-medium px-8 py-3.5 rounded-full transition-colors flex items-center gap-2 text-base">
              Regalar mi asiento
              <span className="text-lg">→</span>
            </button>
          </div>

          {/* Circle visualization */}
          <div className="hidden lg:flex flex-col items-center gap-3">
            <div className="w-64 h-64">
              <CircleOfChairs litCount={litCount} size={260} radius={95} totalSeats={12} />
            </div>
            <p className="text-center font-heading text-3xl font-bold text-verde">
              {selectedSeat.free ? "♡" : selectedSeat.count}
            </p>
            <p className="text-verde/60 font-sans text-sm text-center">
              {selectedSeat.free ? "con amor" : `asiento${selectedSeat.count > 1 ? "s" : ""} abierto${selectedSeat.count > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

