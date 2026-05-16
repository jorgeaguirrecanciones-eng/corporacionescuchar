const pillars = [
  {
    icon: "👂",
    title: "Escucha",
    desc: "Espacios seguros para compartir experiencias sin juicio.",
  },
  {
    icon: "🤝",
    title: "Contención",
    desc: "Redes que alivian el estrés y el malestar emocional.",
  },
  {
    icon: "◎",
    title: "Comunidad",
    desc: "Vínculos que fortalecen la resiliencia individual y colectiva.",
  },
];

export default function WhatYouMakePossible() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: pillars */}
          <div>
            <p className="text-terracota font-sans font-semibold text-sm uppercase tracking-wider mb-3">
              Lo que haces posible
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-verde mb-8 leading-tight">
              Cuando alguien encuentra un espacio para hablar, algo cambia
            </h2>
            <div className="flex flex-col gap-4">
              {pillars.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-xl shrink-0 shadow-sm">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-verde text-base mb-0.5">
                      {p.title}
                    </h3>
                    <p className="text-verde/70 text-sm font-sans leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo + testimony */}
          <div className="flex flex-col gap-5">
            {/* Photo */}
            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://static.wixstatic.com/media/cf2b8e_9868894826c4477cb8df0dee04c1ba37~mv2.jpg"
                alt="Personas unidas en un Círculo de Escucha"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Testimony */}
            <blockquote className="bg-white rounded-2xl p-5 shadow-sm border border-border relative">
              <span className="absolute -top-4 left-5 text-terracota text-5xl font-heading leading-none">"</span>
              <p className="text-verde font-sans text-sm leading-relaxed pt-3 mb-3">
                Llegué sin ganas de hablar. Me sentí escuchada, comprendida y acompañada. Hoy me siento menos sola y parte de una comunidad que me hace bien.
              </p>
              <footer className="text-verde/60 text-xs font-sans">
                — Camila, participante de un Círculo de Escucha
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
