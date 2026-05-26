"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CircleOfChairs } from "@/components/home/Hero";
import { Gift, ArrowRight, ArrowLeft, Check } from "lucide-react";

const SEAT_PRICE = 7000;
const PRESETS = [1, 2, 3, 5, 10];

type Frequency = "monthly" | "once";

function fmt(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

/* ─── Step indicator ─── */
function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-12">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-semibold transition-all duration-300 ${
              s < current
                ? "bg-terracota text-white"
                : s === current
                ? "bg-verde text-white shadow-md"
                : "bg-verde/15 text-verde/40"
            }`}
          >
            {s < current ? <Check size={13} strokeWidth={3} /> : s}
          </div>
          {s < 3 && (
            <div
              className={`w-10 h-px transition-colors duration-500 ${
                s < current ? "bg-terracota" : "bg-verde/15"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Main page ─── */
export default function HazteSocioPage() {
  const [step, setStep] = useState(1);
  const [seats, setSeats] = useState(3);
  const [showCustom, setShowCustom] = useState(false);
  const [customInput, setCustomInput] = useState("13");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const effectiveSeats = showCustom
    ? Math.max(1, parseInt(customInput) || 1)
    : seats;
  const total = effectiveSeats * SEAT_PRICE;
  const litCount = Math.min(effectiveSeats, 12);
  const overflowCount = effectiveSeats > 12 ? effectiveSeats - 12 : 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-beige">
        <div className="max-w-lg mx-auto px-4 pt-10 pb-24">
          <StepDots current={step} />

          {/* ══════════════════════════════════════
              PASO 1 — Selección de asientos
          ══════════════════════════════════════ */}
          {step === 1 && (
            <div className="flex flex-col items-center">
              <span className="text-xs font-sans font-semibold tracking-widest text-terracota uppercase mb-3">
                Paso 1 de 3
              </span>
              <h1 className="font-heading text-3xl md:text-4xl text-verde text-center leading-tight mb-2">
                ¿Cuántos espacios<br />quieres aportar?
              </h1>
              <p className="text-verde/55 font-sans text-sm text-center mb-10">
                Cada espacio vale {fmt(SEAT_PRICE)}
              </p>

              {/* Circle — the hero of this step */}
              <div className="relative mb-2">
                <div className="w-72 h-72 sm:w-80 sm:h-80">
                  <CircleOfChairs litCount={litCount} size={320} radius={118} totalSeats={12} />
                </div>

                {/* Overflow badge when seats > 12 */}
                {overflowCount > 0 && (
                  <div className="absolute bottom-6 right-0 bg-terracota text-white font-heading font-bold text-sm px-3 py-1.5 rounded-full shadow-lg">
                    +{overflowCount} más
                  </div>
                )}
              </div>

              {/* Counter */}
              <div className="text-center mb-8">
                <div className="font-heading text-7xl font-bold text-verde leading-none tabular-nums">
                  {effectiveSeats}
                </div>
                <div className="text-verde/50 font-sans text-sm mt-1">
                  espacio{effectiveSeats !== 1 ? "s" : ""}
                </div>
                <div className="mt-3 text-terracota font-heading text-3xl font-bold leading-none">
                  {fmt(total)}
                </div>
              </div>

              {/* Preset pills */}
              <div className="flex flex-wrap justify-center gap-2.5 mb-6">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => { setSeats(p); setShowCustom(false); }}
                    className={`w-13 h-13 w-[52px] h-[52px] rounded-full font-sans font-bold text-base transition-all duration-200 ${
                      !showCustom && seats === p
                        ? "bg-verde text-white shadow-lg shadow-verde/25 scale-110"
                        : "bg-white text-verde border-2 border-verde/20 hover:border-verde/50 hover:scale-105"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                {/* Más button */}
                <button
                  onClick={() => {
                    setShowCustom(true);
                    setCustomInput("13");
                  }}
                  className={`px-5 h-[52px] rounded-full font-sans font-bold text-sm transition-all duration-200 ${
                    showCustom
                      ? "bg-verde text-white shadow-lg shadow-verde/25"
                      : "bg-white text-verde border-2 border-verde/20 hover:border-verde/50"
                  }`}
                >
                  Más ›
                </button>
              </div>

              {/* Custom stepper — visible when "Más" selected */}
              {showCustom && (
                <div className="flex items-center gap-4 mb-6 bg-white border-2 border-verde/20 rounded-2xl px-5 py-3">
                  <button
                    onClick={() =>
                      setCustomInput(String(Math.max(11, (parseInt(customInput) || 11) - 1)))
                    }
                    className="w-9 h-9 rounded-full bg-verde/10 text-verde font-bold text-xl flex items-center justify-center hover:bg-verde/20 transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={11}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="w-16 text-center font-heading text-2xl font-bold text-verde bg-transparent focus:outline-none"
                  />
                  <button
                    onClick={() =>
                      setCustomInput(String((parseInt(customInput) || 0) + 1))
                    }
                    className="w-9 h-9 rounded-full bg-verde/10 text-verde font-bold text-xl flex items-center justify-center hover:bg-verde/20 transition-colors"
                  >
                    +
                  </button>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                className="w-full bg-terracota hover:bg-terracota-dark text-white font-sans font-semibold px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2 text-base shadow-lg shadow-terracota/20"
              >
                Continuar
                <ArrowRight size={18} />
              </button>

              <p className="text-verde/35 text-xs font-sans text-center mt-5">
                Podrás cancelar o pausar tu aporte cuando quieras
              </p>
            </div>
          )}

          {/* ══════════════════════════════════════
              PASO 2 — Frecuencia
          ══════════════════════════════════════ */}
          {step === 2 && (
            <div className="flex flex-col items-center">
              <span className="text-xs font-sans font-semibold tracking-widest text-terracota uppercase mb-3">
                Paso 2 de 3
              </span>
              <h1 className="font-heading text-3xl md:text-4xl text-verde text-center leading-tight mb-2">
                ¿Cómo quieres<br />apoyar?
              </h1>
              <p className="text-verde/55 font-sans text-sm text-center mb-10">
                {effectiveSeats} espacio{effectiveSeats !== 1 ? "s" : ""} · {fmt(total)}
              </p>

              <div className="flex flex-col gap-4 w-full mb-10">
                {/* Mensual */}
                <button
                  onClick={() => setFrequency("monthly")}
                  className={`rounded-2xl p-6 text-left border-2 transition-all duration-200 ${
                    frequency === "monthly"
                      ? "border-terracota bg-white shadow-xl shadow-terracota/10"
                      : "border-verde/20 bg-white hover:border-verde/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-heading text-xl text-verde font-bold mb-1.5">
                        Mensual
                      </div>
                      <div className="text-verde/60 font-sans text-sm leading-relaxed">
                        Tu espacio acompaña a alguien cada lunes, mes a mes. Puedes pausar o cancelar cuando quieras.
                      </div>
                      <div className="mt-4 text-terracota font-heading text-2xl font-bold">
                        {fmt(total)}
                        <span className="text-sm font-sans font-normal text-verde/45 ml-1">/ mes</span>
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        frequency === "monthly"
                          ? "border-terracota bg-terracota"
                          : "border-verde/25"
                      }`}
                    >
                      {frequency === "monthly" && (
                        <Check size={12} className="text-white" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                  {frequency === "monthly" && (
                    <div className="mt-4 pt-4 border-t border-verde/10 flex items-center gap-2">
                      <Gift size={13} className="text-terracota" />
                      <span className="text-verde/60 text-xs font-sans">
                        La opción más poderosa — un espacio permanente para quien más lo necesita
                      </span>
                    </div>
                  )}
                </button>

                {/* Única vez */}
                <button
                  onClick={() => setFrequency("once")}
                  className={`rounded-2xl p-6 text-left border-2 transition-all duration-200 ${
                    frequency === "once"
                      ? "border-terracota bg-white shadow-xl shadow-terracota/10"
                      : "border-verde/20 bg-white hover:border-verde/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-heading text-xl text-verde font-bold mb-1.5">
                        Donación única
                      </div>
                      <div className="text-verde/60 font-sans text-sm leading-relaxed">
                        Un aporte puntual que permite sostener varios círculos. Sin compromisos.
                      </div>
                      <div className="mt-4 text-terracota font-heading text-2xl font-bold">
                        {fmt(total)}
                        <span className="text-sm font-sans font-normal text-verde/45 ml-1">
                          una vez
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        frequency === "once"
                          ? "border-terracota bg-terracota"
                          : "border-verde/25"
                      }`}
                    >
                      {frequency === "once" && (
                        <Check size={12} className="text-white" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-verde/60 font-sans font-medium px-5 py-3.5 rounded-full border-2 border-verde/20 hover:border-verde/40 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Volver
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-terracota hover:bg-terracota-dark text-white font-sans font-semibold px-8 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-terracota/20"
                >
                  Continuar
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              PASO 3 — Datos + pago
          ══════════════════════════════════════ */}
          {step === 3 && (
            <div className="flex flex-col items-center">
              <span className="text-xs font-sans font-semibold tracking-widest text-terracota uppercase mb-3">
                Paso 3 de 3
              </span>
              <h1 className="font-heading text-3xl md:text-4xl text-verde text-center leading-tight mb-2">
                Casi listo
              </h1>
              <p className="text-verde/55 font-sans text-sm text-center mb-8">
                ¿A quién le avisamos cuando aportes tu espacio?
              </p>

              {/* Summary */}
              <div className="w-full bg-verde rounded-2xl p-5 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/50 text-[10px] font-sans uppercase tracking-widest mb-1">
                      Tu donación
                    </div>
                    <div className="text-white font-heading text-lg font-bold leading-tight">
                      {effectiveSeats} espacio{effectiveSeats !== 1 ? "s" : ""}
                    </div>
                    <div className="text-white/60 text-sm font-sans">
                      {frequency === "monthly" ? "Mensual" : "Donación única"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-terracota font-heading text-2xl font-bold">
                      {fmt(total)}
                    </div>
                    <div className="text-white/40 text-xs font-sans">
                      {frequency === "monthly" ? "/ mes" : "una vez"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="w-full space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-sans font-medium text-verde mb-1.5">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full border-2 border-verde/20 rounded-xl px-4 py-3 font-sans text-verde placeholder:text-verde/30 focus:outline-none focus:border-verde transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-verde mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full border-2 border-verde/20 rounded-xl px-4 py-3 font-sans text-verde placeholder:text-verde/30 focus:outline-none focus:border-verde transition-colors bg-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 text-verde/60 font-sans font-medium px-5 py-3.5 rounded-full border-2 border-verde/20 hover:border-verde/40 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Volver
                </button>
                <button
                  disabled={!name.trim() || !email.trim()}
                  className="flex-1 bg-terracota hover:bg-terracota-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-sans font-semibold px-8 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-terracota/20"
                >
                  <Gift size={15} />
                  Ir a pagar
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-verde/35 text-xs font-sans">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Pago seguro a través de Mercado Pago
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
