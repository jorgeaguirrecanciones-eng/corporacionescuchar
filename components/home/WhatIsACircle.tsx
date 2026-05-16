const PHOTOS = [
  {
    src: "https://static.wixstatic.com/media/cf2b8e_fe109ead2ca942babb72a4f947d2ea89~mv2.jpeg",
    alt: "Personas sentadas en círculo durante una sesión de escucha",
  },
  {
    src: "https://static.wixstatic.com/media/cf2b8e_636483e26da6493c9d4390dd6f415131~mv2.jpeg",
    alt: "Grupo de participantes de Corporación Escuchar",
  },
  {
    src: "https://static.wixstatic.com/media/cf2b8e_f287f1187b544b54b43ea599fd5a2266~mv2.png",
    alt: "Círculo de Escucha en espacio comunitario",
  },
];

const pillars = [
  { label: "Escucha activa", desc: "Sin interrupciones ni consejos" },
  { label: "Sin jerarquías", desc: "Todos los roles son iguales" },
  { label: "Comunidad real", desc: "Vínculos que trascienden el círculo" },
  { label: "Bienestar emocional", desc: "Resiliencia individual y colectiva" },
];

export default function WhatIsACircle() {
  return (
    <section className="bg-beige py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-2xl mb-10">
          <span className="inline-block text-xs font-sans font-semibold tracking-widest text-terracota uppercase mb-3">
            Los círculos
          </span>
          <h2 className="font-heading text-3xl md:text-[2.6rem] text-verde leading-tight mb-4">
            ¿Qué es un<br className="hidden sm:block" />{" "}
            Círculo de Escucha?
          </h2>
          <p className="text-verde/70 text-lg leading-relaxed">
            Un espacio gratuito donde personas se reúnen a escucharse sin juicio,
            sin roles y sin jerarquías. Solo presencia genuina, contención y comunidad.
            Cada lunes, en todo Chile.
          </p>
        </div>

        {/* Main photo — desktop full width, mobile full width */}
        <div className="rounded-3xl overflow-hidden mb-4" style={{ aspectRatio: "16/7" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS[0].src}
            alt={PHOTOS[0].alt}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Desktop: 2 photos + stat card */}
        <div className="hidden md:grid grid-cols-3 gap-4 mb-4">
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS[1].src}
              alt={PHOTOS[1].alt}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS[2].src}
              alt={PHOTOS[2].alt}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Stat card */}
          <div className="rounded-2xl bg-verde p-6 flex flex-col justify-between" style={{ aspectRatio: "4/3" }}>
            <div>
              <div className="text-white/50 text-[10px] font-sans uppercase tracking-widest mb-5">
                Cómo participar
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-white font-heading text-3xl font-bold leading-none">Lunes</div>
                  <div className="text-white/60 text-sm font-sans mt-1">Todos los lunes, 19:30 hrs</div>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="text-terracota font-heading text-2xl font-bold leading-none">Gratuito</div>
                  <div className="text-white/60 text-sm font-sans mt-1">Sin costo ni compromiso</div>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="text-white font-heading text-lg font-semibold leading-none">Online y presencial</div>
                  <div className="text-white/60 text-sm font-sans mt-1">En todo Chile</div>
                </div>
              </div>
            </div>
            <a
              href="https://www.corporacionescuchar.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 text-xs font-sans hover:text-white/70 transition-colors"
            >
              corporacionescuchar.cl →
            </a>
          </div>
        </div>

        {/* Mobile: horizontal scroll strip */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4 mb-4">
          {PHOTOS.slice(1).map((photo, i) => (
            <div
              key={i}
              className="snap-start shrink-0 rounded-2xl overflow-hidden w-64 h-48"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Stat card mobile */}
          <div className="snap-start shrink-0 rounded-2xl bg-verde p-5 w-56 h-48 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <div className="text-white font-heading text-2xl font-bold">Lunes</div>
                <div className="text-white/60 text-xs font-sans">19:30 hrs</div>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="text-terracota font-heading text-xl font-bold">Gratuito</div>
                <div className="text-white/60 text-xs font-sans">Sin costo ni compromiso</div>
              </div>
            </div>
            <div className="text-white/40 text-[10px] font-sans">corporacionescuchar.cl →</div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pillars.map((p) => (
            <div key={p.label} className="bg-beige rounded-2xl p-4">
              <div className="font-heading text-verde font-semibold mb-1 text-sm md:text-base">
                {p.label}
              </div>
              <div className="text-verde/60 text-xs md:text-sm font-sans leading-snug">
                {p.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
