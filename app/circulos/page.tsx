"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ArrowLeft, ArrowRight, Check } from "lucide-react";

/* ─── Types ─── */
interface FormData {
  nombres: string;
  apellido: string;
  email: string;
  celular: string;
  fechaNac: string;
  sexo: string;
  nacionalidad: string;
  pais: string;
  ocupacion: string;
  educacion: string;
  comoSupiste: string;
  migratoria: string;
  discapacidad: string;
  lgbtiq: string;
}

const empty: FormData = {
  nombres: "", apellido: "", email: "", celular: "",
  fechaNac: "", sexo: "", nacionalidad: "", pais: "", ocupacion: "", educacion: "",
  comoSupiste: "", migratoria: "", discapacidad: "", lgbtiq: "",
};

/* ─── Pill option component ─── */
function Pill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full border-2 text-sm font-sans font-medium transition-all duration-200 cursor-pointer ${
        selected
          ? "border-terracota bg-terracota text-white"
          : "border-gray-200 text-gray-500 hover:border-terracota hover:text-terracota"
      }`}
    >
      {label}
    </button>
  );
}

/* ─── Field wrapper ─── */
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-heading text-xl text-verde leading-snug">{label}</label>
      {hint && <p className="text-sm font-sans text-verde/50 -mt-1">{hint}</p>}
      {children}
    </div>
  );
}

/* ─── Input style ─── */
const inputCls = "w-full border-0 border-b-2 border-gray-200 focus:border-terracota outline-none bg-transparent py-3 font-sans text-verde text-base transition-colors placeholder:text-gray-300";

/* ─── Success screen ─── */
function SuccessScreen({ name }: { name: string }) {
  return (
    <div className="min-h-screen bg-beige flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-terracota/10 flex items-center justify-center mb-6">
        <Heart size={36} className="text-terracota" fill="currentColor" />
      </div>
      <h1 className="font-heading text-3xl text-verde mb-4">
        Gracias, {name || "gracias"} 💛
      </h1>
      <p className="text-verde/70 font-sans text-lg max-w-md leading-relaxed mb-2">
        Recibimos tus datos. Te escribiremos al correo con el enlace para unirte al Círculo,
        <strong> al menos una hora antes del inicio.</strong>
      </p>
      <p className="text-verde/50 font-sans text-sm max-w-sm mb-10">
        Si tienes alguna duda, escríbenos a{" "}
        <a href="mailto:hola@corporacionescuchar.cl" className="text-terracota underline">
          hola@corporacionescuchar.cl
        </a>
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-terracota text-white font-sans font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

/* ─── Main page ─── */
export default function CirculosPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormData>(empty);

  const set = (field: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const canNext1 = form.nombres.trim() && form.apellido.trim() && form.email.includes("@");
  const canNext2 = form.fechaNac && form.pais.trim();

  const handleSubmit = () => {
    // TODO: enviar a Formspree o tu backend aquí
    setDone(true);
  };

  if (done) return <SuccessScreen name={form.nombres} />;

  return (
    <main className="min-h-screen bg-white">

      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-verde/60 hover:text-verde text-sm font-sans transition-colors">
            <ArrowLeft size={16} />
            Volver
          </Link>

          {/* Step dots */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`rounded-full transition-all duration-300 ${
                  n < step
                    ? "w-6 h-2 bg-terracota"
                    : n === step
                    ? "w-6 h-2 bg-terracota"
                    : "w-2 h-2 bg-gray-200"
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-sans text-verde/40">{step} de 3</span>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-12">

        {/* ── PASO 1 ── */}
        {step === 1 && (
          <div className="flex flex-col gap-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-beige text-terracota px-4 py-1.5 rounded-full text-sm font-sans font-medium mb-6">
                <Heart size={13} fill="currentColor" />
                Estamos aquí para escucharte
              </div>
              <h1 className="font-heading text-4xl text-verde leading-tight mb-3">
                Hola, nos alegra<br />que estés aquí.
              </h1>
              <p className="text-verde/60 font-sans text-base leading-relaxed">
                Un Círculo de Escucha es un espacio gratuito, seguro y sin juicio.
                Solo necesitamos saber un poco sobre ti para encontrar el mejor espacio.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <Field label="¿Cómo te llamas?">
                <div className="flex gap-4">
                  <input
                    className={inputCls}
                    placeholder="Tu nombre"
                    value={form.nombres}
                    onChange={(e) => set("nombres", e.target.value)}
                  />
                  <input
                    className={inputCls}
                    placeholder="Tu apellido"
                    value={form.apellido}
                    onChange={(e) => set("apellido", e.target.value)}
                  />
                </div>
              </Field>

              <Field
                label="¿A qué correo te escribimos?"
                hint="Te enviaremos el enlace al Círculo aquí"
              >
                <input
                  className={inputCls}
                  type="email"
                  placeholder="tu@correo.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>

              <Field
                label="¿Y a qué número podemos llamarte?"
                hint="Solo si necesitamos coordinar algo contigo — opcional"
              >
                <input
                  className={inputCls}
                  type="tel"
                  placeholder="+56 9 ..."
                  value={form.celular}
                  onChange={(e) => set("celular", e.target.value)}
                />
              </Field>
            </div>

            <button
              disabled={!canNext1}
              onClick={() => setStep(2)}
              className="self-start flex items-center gap-2 bg-terracota text-white font-sans font-medium px-8 py-3.5 rounded-full transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continuar
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ── PASO 2 ── */}
        {step === 2 && (
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-terracota font-sans text-sm font-medium mb-4">
                Hola, {form.nombres} 👋
              </p>
              <h1 className="font-heading text-4xl text-verde leading-tight mb-3">
                Cuéntanos<br />un poco más.
              </h1>
              <p className="text-verde/60 font-sans text-base leading-relaxed">
                Esta información nos ayuda a entender mejor a quienes participan en los Círculos.
                Todo es confidencial.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <Field label="¿Cuándo naciste?">
                <input
                  className={inputCls}
                  type="date"
                  value={form.fechaNac}
                  onChange={(e) => set("fechaNac", e.target.value)}
                />
              </Field>

              <Field label="¿Cómo te identificas?">
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Mujer", "Hombre", "No binario/a", "Prefiero no decir"].map((op) => (
                    <Pill key={op} label={op} selected={form.sexo === op} onClick={() => set("sexo", op)} />
                  ))}
                </div>
              </Field>

              <Field label="¿De dónde eres?">
                <input
                  className={inputCls}
                  placeholder="Tu nacionalidad"
                  value={form.nacionalidad}
                  onChange={(e) => set("nacionalidad", e.target.value)}
                />
              </Field>

              <Field label="¿Y dónde vives hoy?">
                <input
                  className={inputCls}
                  placeholder="País o ciudad"
                  value={form.pais}
                  onChange={(e) => set("pais", e.target.value)}
                />
              </Field>

              <Field label="¿A qué te dedicas?" hint="Opcional">
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Trabajo", "Estudio", "Trabajo y estudio", "Estoy buscando trabajo", "Otro"].map((op) => (
                    <Pill key={op} label={op} selected={form.ocupacion === op} onClick={() => set("ocupacion", op)} />
                  ))}
                </div>
              </Field>

              <Field label="¿Cuál es tu nivel educativo?" hint="Opcional">
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Básica", "Media", "Técnica", "Universitaria", "Postgrado", "Prefiero no decir"].map((op) => (
                    <Pill key={op} label={op} selected={form.educacion === op} onClick={() => set("educacion", op)} />
                  ))}
                </div>
              </Field>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 border-2 border-gray-200 text-verde/60 font-sans font-medium px-6 py-3.5 rounded-full hover:border-verde/40 transition-colors"
              >
                <ArrowLeft size={16} />
                Atrás
              </button>
              <button
                disabled={!canNext2}
                onClick={() => setStep(3)}
                className="flex items-center gap-2 bg-terracota text-white font-sans font-medium px-8 py-3.5 rounded-full transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continuar
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── PASO 3 ── */}
        {step === 3 && (
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-terracota font-sans text-sm font-medium mb-4">
                Ya casi, {form.nombres} ✨
              </p>
              <h1 className="font-heading text-4xl text-verde leading-tight mb-3">
                Solo un par<br />de preguntas más.
              </h1>
              <p className="text-verde/60 font-sans text-base leading-relaxed">
                Estas preguntas nos ayudan a asegurarnos de que nadie se quede sin un espacio.
                Responde lo que quieras.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <Field label="¿Cómo llegaste hasta nosotros?">
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "Redes sociales",
                    "Un amigo o familiar",
                    "Google",
                    "Una institución",
                    "El boca a boca",
                    "Otro",
                  ].map((op) => (
                    <Pill key={op} label={op} selected={form.comoSupiste === op} onClick={() => set("comoSupiste", op)} />
                  ))}
                </div>
              </Field>

              <Field
                label="¿Estás viviendo fuera de tu país de origen?"
                hint="Esta información nos ayuda a priorizar espacios para personas en situación migratoria"
              >
                <div className="flex gap-2 pt-1">
                  {["Sí", "No", "Prefiero no decir"].map((op) => (
                    <Pill key={op} label={op} selected={form.migratoria === op} onClick={() => set("migratoria", op)} />
                  ))}
                </div>
              </Field>

              <Field
                label="¿Tienes alguna situación de discapacidad?"
                hint="Para asegurarnos de ofrecerte el formato más accesible"
              >
                <div className="flex gap-2 pt-1">
                  {["Sí", "No", "Prefiero no decir"].map((op) => (
                    <Pill key={op} label={op} selected={form.discapacidad === op} onClick={() => set("discapacidad", op)} />
                  ))}
                </div>
              </Field>

              <Field
                label="¿Te identificas con la comunidad LGBTIQ+?"
                hint="Contamos con espacios especialmente diseñados para la comunidad"
              >
                <div className="flex gap-2 pt-1">
                  {["Sí", "No", "Prefiero no decir"].map((op) => (
                    <Pill key={op} label={op} selected={form.lgbtiq === op} onClick={() => set("lgbtiq", op)} />
                  ))}
                </div>
              </Field>

              {/* Closing warmth */}
              <div className="bg-beige rounded-2xl p-5">
                <p className="text-verde/70 font-sans text-sm leading-relaxed">
                  💛 La información que nos entregues es completamente confidencial. Solo la usamos
                  de manera anónima para entender mejor a nuestra comunidad.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 border-2 border-gray-200 text-verde/60 font-sans font-medium px-6 py-3.5 rounded-full hover:border-verde/40 transition-colors"
              >
                <ArrowLeft size={16} />
                Atrás
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-terracota text-white font-sans font-medium px-8 py-3.5 rounded-full transition-opacity hover:opacity-90"
              >
                <Heart size={16} fill="currentColor" />
                Quiero inscribirme
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
