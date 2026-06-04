"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, ArrowRight, Heart, Send, Check } from "lucide-react";

/* ─── Razones de contacto ─── */
const reasons = [
  {
    id: "circulo",
    icon: "🫂",
    label: "Quiero participar en un Círculo",
    desc: "Inscribirme en un espacio gratuito de escucha",
    href: "/circulos",
    color: "#1CBF45",
  },
  {
    id: "donar",
    icon: "💛",
    label: "Quiero apoyar la causa",
    desc: "Regalar un asiento o hacer una donación",
    href: "/dona",
    color: "#C8197A",
  },
  {
    id: "monitor",
    icon: "🎓",
    label: "Quiero ser monitor/a voluntario/a",
    desc: "Formarme para facilitar Círculos de Escucha",
    color: "#6B2DB5",
  },
  {
    id: "prensa",
    icon: "📰",
    label: "Soy de prensa o medios",
    desc: "Entrevistas, notas periodísticas o alianzas",
    color: "#F5A623",
  },
  {
    id: "otra",
    icon: "💬",
    label: "Tengo otra consulta",
    desc: "Cualquier otra pregunta o comentario",
    color: "#3D3D3D",
  },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: "¿Los Círculos de Escucha tienen costo?",
    a: "No. Son completamente gratuitos para quienes participan. Funcionan gracias a personas que regalan asientos.",
  },
  {
    q: "¿Dónde se realizan los Círculos?",
    a: "En distintas comunidades de Chile, cada lunes. También contamos con modalidad online para quienes no pueden asistir presencialmente.",
  },
  {
    q: "¿Cuánto tiempo toma la formación de monitores/as?",
    a: "El programa de formación tiene una duración de 3 meses, con sesiones semanales. Es completamente voluntario.",
  },
  {
    q: "¿Cómo puedo hacer una donación como empresa?",
    a: "Tenemos convenios para donaciones empresariales con beneficio tributario bajo la Ley 21.440. Escríbenos para coordinar.",
  },
  {
    q: "¿Tienen FECU Social o informes de transparencia?",
    a: "Sí. Publicamos nuestra FECU Social anualmente. Puedes solicitarla escribiéndonos o descargándola desde nuestra sección de transparencia.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-gray-100 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-4 gap-4">
        <p className="font-sans font-medium text-verde text-sm">{q}</p>
        <span
          className="shrink-0 text-terracota text-lg font-bold transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </div>
      {open && (
        <p className="pb-4 font-sans text-sm text-verde/60 leading-relaxed -mt-1">{a}</p>
      )}
    </div>
  );
}

/* ─── Success screen ─── */
function SuccessScreen({ reason, name }: { reason: string; name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-terracota/10 flex items-center justify-center mb-6">
        <Check size={36} className="text-terracota" strokeWidth={2.5} />
      </div>
      <h2 className="font-heading text-3xl text-verde mb-3">¡Recibimos tu mensaje, {name}!</h2>
      <p className="text-verde/60 font-sans max-w-sm leading-relaxed mb-8">
        {reason === "monitor"
          ? "Nos pondremos en contacto contigo pronto con los detalles del próximo proceso de formación."
          : reason === "prensa"
          ? "Nuestro equipo de comunicaciones te responderá en un plazo máximo de 48 horas hábiles."
          : "Te responderemos al correo que dejaste en menos de 24 horas. Gracias por escribirnos."}
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-terracota text-white font-sans font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
      >
        <Heart size={16} fill="currentColor" />
        Volver al inicio
      </Link>
    </div>
  );
}

/* ─── Main page ─── */
export default function ContactoPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const selectedReason = reasons.find((r) => r.id === selected);
  const canSubmit = name.trim() && email.includes("@") && message.trim().length > 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: enviar a Formspree / backend
    setSent(true);
  };

  const inputCls =
    "w-full bg-white border border-gray-200 focus:border-terracota rounded-xl px-4 py-3 font-sans text-verde text-sm outline-none transition-colors placeholder:text-gray-300";

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-beige pt-16 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="inline-flex items-center gap-2 bg-white text-terracota text-xs font-sans font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-terracota animate-pulse" />
              Estamos escuchando
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-verde leading-tight mb-4">
              Hola, ¿en qué podemos<br />
              <span className="text-terracota">ayudarte?</span>
            </h1>
            <p className="text-verde/60 font-sans text-lg max-w-xl mx-auto leading-relaxed">
              No hay consulta pequeña. Cuéntanos qué necesitas y te responderemos
              en menos de 24 horas.
            </p>
          </div>
        </section>

        {/* ── Reason selector ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <p className="font-sans font-semibold text-verde/50 text-xs uppercase tracking-widest mb-5">
            ¿Sobre qué quieres contactarnos?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {reasons.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  if (r.href) {
                    window.location.href = r.href;
                  } else {
                    setSelected(r.id);
                    setSent(false);
                    setTimeout(() => {
                      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
                className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 group ${
                  selected === r.id
                    ? "border-terracota bg-terracota/5 shadow-sm"
                    : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-2xl mb-2 block">{r.icon}</span>
                    <p className="font-sans font-semibold text-verde text-sm leading-tight">{r.label}</p>
                    <p className="font-sans text-verde/50 text-xs mt-1 leading-snug">{r.desc}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="shrink-0 mt-1 text-verde/20 group-hover:text-terracota transition-colors"
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Form + Info ── */}
        {selected && (
          <section id="contact-form" className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

              {/* Form */}
              <div className="lg:col-span-3">
                {sent ? (
                  <SuccessScreen reason={selected} name={name} />
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-semibold text-white w-fit"
                      style={{ backgroundColor: selectedReason?.color }}
                    >
                      <span>{selectedReason?.icon}</span>
                      {selectedReason?.label}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-xs font-semibold text-verde/60 uppercase tracking-wider">
                          Tu nombre
                        </label>
                        <input
                          className={inputCls}
                          placeholder="¿Cómo te llamas?"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-xs font-semibold text-verde/60 uppercase tracking-wider">
                          Tu correo
                        </label>
                        <input
                          className={inputCls}
                          type="email"
                          placeholder="tu@correo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-xs font-semibold text-verde/60 uppercase tracking-wider">
                        {selected === "monitor"
                          ? "¿Por qué quieres ser monitor/a?"
                          : selected === "prensa"
                          ? "¿Sobre qué quieres conversar?"
                          : "¿En qué podemos ayudarte?"}
                      </label>
                      <textarea
                        className={`${inputCls} resize-none`}
                        rows={5}
                        placeholder={
                          selected === "monitor"
                            ? "Cuéntanos sobre ti y tu motivación..."
                            : selected === "prensa"
                            ? "Medio, tipo de nota, fecha tentativa..."
                            : "Cuéntanos con calma, no hay respuesta incorrecta..."
                        }
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="self-start flex items-center gap-2 bg-terracota text-white font-sans font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Send size={15} />
                      Enviar mensaje
                    </button>

                    <p className="text-xs font-sans text-verde/40 -mt-2">
                      Te responderemos en menos de 24 horas hábiles.
                    </p>
                  </form>
                )}
              </div>

              {/* Info sidebar */}
              <div className="lg:col-span-2 flex flex-col gap-6">

                {/* Contact card */}
                <div className="bg-beige rounded-2xl p-6 flex flex-col gap-4">
                  <p className="font-heading text-lg text-verde">Contacto directo</p>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-terracota/10 flex items-center justify-center shrink-0">
                        <Mail size={14} className="text-terracota" />
                      </div>
                      <a
                        href="mailto:hola@corporacionescuchar.cl"
                        className="font-sans text-sm text-verde hover:text-terracota transition-colors"
                      >
                        hola@corporacionescuchar.cl
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-terracota/10 flex items-center justify-center shrink-0">
                        <Phone size={14} className="text-terracota" />
                      </div>
                      <a
                        href="https://wa.me/56998218311"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm text-verde hover:text-terracota transition-colors"
                      >
                        +56 9 9821 8311
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-terracota/10 flex items-center justify-center shrink-0">
                        <MapPin size={14} className="text-terracota" />
                      </div>
                      <span className="font-sans text-sm text-verde/70">Santiago de Chile</span>
                    </li>
                  </ul>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/56998218311?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20C%C3%ADrculos%20de%20Escucha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-sans font-medium text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity mt-1"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Escríbenos por WhatsApp
                  </a>
                </div>

                {/* Redes */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6">
                  <p className="font-heading text-lg text-verde mb-4">Síguenos</p>
                  <div className="flex gap-3">
                    {[
                      {
                        href: "https://www.instagram.com/corporacionescuchar/",
                        label: "Instagram",
                        bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
                        svg: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-4 h-4">
                            <rect x="2" y="2" width="20" height="20" rx="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="0.8" fill="white" stroke="none" />
                          </svg>
                        ),
                      },
                      {
                        href: "https://www.facebook.com/circulos.de.escucha",
                        label: "Facebook",
                        bg: "bg-[#1877F2]",
                        svg: (
                          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                          </svg>
                        ),
                      },
                      {
                        href: "https://youtube.com",
                        label: "YouTube",
                        bg: "bg-[#FF0000]",
                        svg: (
                          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                          </svg>
                        ),
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center hover:opacity-85 transition-opacity`}
                        aria-label={s.label}
                      >
                        {s.svg}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        <section className="bg-beige py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-terracota mb-3">
              Preguntas frecuentes
            </p>
            <h2 className="font-heading text-3xl text-verde mb-8">
              Lo que más nos preguntan
            </h2>
            <div>
              {faqs.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing ── */}
        <section className="py-16 text-center">
          <div className="max-w-xl mx-auto px-4 sm:px-6">
            <p className="font-heading text-2xl text-verde mb-3">
              ¿Preferís que te llamemos?
            </p>
            <p className="text-verde/55 font-sans mb-6">
              Déjanos tu número y te llamamos nosotros, sin costo.
            </p>
            <a
              href="https://wa.me/56998218311"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-sans font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
