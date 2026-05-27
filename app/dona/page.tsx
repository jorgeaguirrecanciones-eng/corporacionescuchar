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
  if (current === 4) return null;
  return (
    <div className="flex items-center justify-center gap-2 mb-12">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-semibold transition-all duration-300 ${
              s < current
                ? "bg-terracota text-white"
                : s === current
                ? "bg-[#6B2DB5] text-white shadow-md"
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
function formatCardNumber(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

export default function DonaPage() {
  const [step, setStep] = useState(1);
  const goToStep = (n: number) => { window.scrollTo({ top: 0, behavior: "instant" }); setStep(n); };
  const [seats, setSeats] = useState(3);
  const [showCustom, setShowCustom] = useState(false);
  const [customInput, setCustomInput] = useState("13");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [paying, setPaying] = useState(false);

  const cardReady =
    cardNumber.replace(/\s/g, "").length === 16 &&
    cardName.trim().length > 2 &&
    cardExpiry.length === 5 &&
    cardCvv.length >= 3;

  const handlePay = async () => {
    if (!cardReady || !name.trim() || !email.trim()) return;
    setPaying(true);
    await new Promise(r => setTimeout(r, 2000));
    setPaying(false);
    goToStep(4);
  };

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
                    className={`w-[52px] h-[52px] rounded-full font-sans font-bold text-base transition-all duration-200 ${
                      !showCustom && seats === p
                        ? "bg-[#6B2DB5] text-white shadow-lg shadow-[#6B2DB5]/25 scale-110"
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
                onClick={() => goToStep(2)}
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
                  onClick={() => goToStep(1)}
                  className="flex items-center gap-1.5 text-verde/60 font-sans font-medium px-5 py-3.5 rounded-full border-2 border-verde/20 hover:border-verde/40 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Volver
                </button>
                <button
                  onClick={() => goToStep(3)}
                  className="flex-1 bg-terracota hover:bg-terracota-dark text-white font-sans font-semibold px-8 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-terracota/20"
                >
                  Continuar
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              PASO 3 — Datos + tarjeta
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
                Completa tus datos y el pago en un solo paso
              </p>

              {/* Summary */}
              <div className="w-full bg-verde rounded-2xl p-5 mb-6">
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

              {/* ── Tus datos ── */}
              <div className="w-full space-y-4 mb-6">
                <div className="text-[10px] font-sans font-bold text-verde/40 uppercase tracking-widest mb-1">
                  Tus datos
                </div>
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

              {/* ── Mercado Pago Card Brick (mock) ── */}
              <div className="w-full rounded-2xl border-2 border-[#009EE3]/30 bg-white overflow-hidden mb-6 shadow-sm">
                {/* MP header */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#F5FAFF] border-b border-[#009EE3]/15">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 48 20" className="h-5" aria-label="Mercado Pago">
                      <rect width="48" height="20" rx="3" fill="#009EE3"/>
                      <text x="4" y="14" fill="white" fontSize="8" fontFamily="sans-serif" fontWeight="bold">mercado</text>
                      <text x="4" y="14" fill="white" fontSize="8" fontFamily="sans-serif" fontWeight="bold" dy="0">mercado pago</text>
                    </svg>
                    <span className="text-[11px] text-[#009EE3] font-sans font-semibold">Pago con tarjeta</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {/* Card brand icons placeholder */}
                    <div className="w-8 h-5 rounded bg-[#1A1F71] opacity-70" />
                    <div className="w-8 h-5 rounded bg-[#EB001B] opacity-70" />
                  </div>
                </div>

                {/* Card form */}
                <div className="px-5 py-5 space-y-4">
                  {/* Card number */}
                  <div>
                    <label className="block text-xs font-sans font-medium text-[#555] mb-1.5 uppercase tracking-wide">
                      Número de tarjeta
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="w-full border border-[#DDD] rounded-lg px-4 py-3 font-mono text-[#222] placeholder:text-[#CCC] focus:outline-none focus:border-[#009EE3] transition-colors text-base tracking-wider"
                      />
                      <svg viewBox="0 0 24 24" className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#CCC]" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="5" width="20" height="14" rx="2"/>
                        <line x1="2" y1="10" x2="22" y2="10"/>
                      </svg>
                    </div>
                  </div>

                  {/* Cardholder */}
                  <div>
                    <label className="block text-xs font-sans font-medium text-[#555] mb-1.5 uppercase tracking-wide">
                      Nombre en la tarjeta
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={e => setCardName(e.target.value.toUpperCase())}
                      placeholder="NOMBRE APELLIDO"
                      className="w-full border border-[#DDD] rounded-lg px-4 py-3 font-sans text-[#222] placeholder:text-[#CCC] focus:outline-none focus:border-[#009EE3] transition-colors uppercase tracking-wide"
                    />
                  </div>

                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-sans font-medium text-[#555] mb-1.5 uppercase tracking-wide">
                        Vencimiento
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full border border-[#DDD] rounded-lg px-4 py-3 font-mono text-[#222] placeholder:text-[#CCC] focus:outline-none focus:border-[#009EE3] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-medium text-[#555] mb-1.5 uppercase tracking-wide">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value.replace(/\D/g,"").slice(0,4))}
                          placeholder="···"
                          maxLength={4}
                          className="w-full border border-[#DDD] rounded-lg px-4 py-3 font-mono text-[#222] placeholder:text-[#CCC] focus:outline-none focus:border-[#009EE3] transition-colors"
                        />
                        <svg viewBox="0 0 24 24" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CCC]" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="2" y="5" width="20" height="14" rx="2"/>
                          <line x1="2" y1="10" x2="22" y2="10"/>
                          <rect x="5" y="13" width="4" height="2" rx="0.5" fill="currentColor" stroke="none"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* SSL note inside form */}
                  <div className="flex items-center gap-1.5 text-[#AAA] text-[10px] font-sans pt-1">
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Tus datos están cifrados y nunca llegan a nuestros servidores
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => goToStep(2)}
                  className="flex items-center gap-1.5 text-verde/60 font-sans font-medium px-5 py-3.5 rounded-full border-2 border-verde/20 hover:border-verde/40 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Volver
                </button>
                <button
                  onClick={handlePay}
                  disabled={paying || !name.trim() || !email.trim() || !cardReady}
                  className="flex-1 bg-[#009EE3] hover:bg-[#007BBF] disabled:opacity-40 disabled:cursor-not-allowed text-white font-sans font-semibold px-8 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#009EE3]/20"
                >
                  {paying ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Procesando pago…
                    </>
                  ) : (
                    <>
                      <Gift size={15} />
                      Confirmar aporte {fmt(total)}
                    </>
                  )}
                </button>
              </div>

              <p className="text-verde/30 text-[11px] font-sans text-center mt-4">
                Al confirmar autorizas un {frequency === "monthly" ? "débito mensual" : "pago único"} de {fmt(total)} desde tu tarjeta
              </p>
            </div>
          )}

          {/* ══════════════════════════════════════
              PASO 4 — Confirmación
          ══════════════════════════════════════ */}
          {step === 4 && (
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-terracota/15 flex items-center justify-center mb-6">
                <Check size={36} className="text-terracota" strokeWidth={2.5} />
              </div>

              <h1 className="font-heading text-3xl md:text-4xl text-verde leading-tight mb-3">
                ¡Gracias, {name.split(" ")[0]}!
              </h1>
              <p className="text-verde/60 font-sans text-base leading-relaxed mb-8 max-w-sm">
                Tu aporte de <strong className="text-verde">{fmt(total)}</strong>{" "}
                {frequency === "monthly" ? "mensual" : "único"} está confirmado.{" "}
                A fin de mes te escribiremos con los nombres de las personas que escuchaste.
              </p>

              {/* Summary card */}
              <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-verde/10 mb-8 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-verde/40 font-sans uppercase tracking-widest mb-1">Espacios</div>
                    <div className="font-heading font-bold text-xl text-verde">{effectiveSeats}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-verde/40 font-sans uppercase tracking-widest mb-1">Monto</div>
                    <div className="font-heading font-bold text-xl text-terracota">{fmt(total)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-verde/40 font-sans uppercase tracking-widest mb-1">Tipo</div>
                    <div className="font-sans font-medium text-verde text-sm">{frequency === "monthly" ? "Mensual" : "Donación única"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-verde/40 font-sans uppercase tracking-widest mb-1">Confirmación a</div>
                    <div className="font-sans text-verde/70 text-sm truncate">{email}</div>
                  </div>
                </div>
              </div>

              <a
                href="/"
                className="inline-flex items-center gap-2 bg-verde text-white font-sans font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Volver al inicio
                <ArrowRight size={16} />
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
