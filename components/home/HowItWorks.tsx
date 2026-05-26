const steps = [
  {
    icon: "⌾",
    paso: "Paso 1",
    title: "Elige cuántos espacios aportar",
    desc: "Cada espacio vale $7.000 y permite que una persona participe en un círculo.",
  },
  {
    icon: "♡",
    paso: "Paso 2",
    title: "Tu aporte financia círculos completamente gratuitos",
    desc: "El 100% de tu donación va a sostener los espacios donde ocurre la escucha.",
  },
  {
    icon: "◎",
    paso: "Paso 3",
    title: "Monitores certificados facilitan cada círculo",
    desc: "Personas voluntarias, formadas por nosotros, garantizan la calidad y la calidez del espacio.",
  },
  {
    icon: "✉",
    paso: "Paso 4",
    title: "Sabrás exactamente a quién escuchaste",
    desc: "Al mes siguiente recibirás los nombres reales de quienes participaron gracias a tu aporte.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-beige py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="max-w-xl mx-auto text-center mb-14">
          <span className="inline-block text-xs font-sans font-semibold tracking-widest text-terracota uppercase mb-3">
            Así funciona
          </span>
          <h2 className="font-heading text-3xl md:text-[2.6rem] text-verde leading-tight">
            Aportar un espacio es más<br />concreto de lo que parece
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-9 left-[calc(100%+2px)] w-5 h-px bg-terracota/25 z-10" />
              )}

              <div className="flex flex-col h-full bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-[52px] h-[52px] rounded-full bg-beige border border-terracota/20 flex items-center justify-center text-xl mb-5 shrink-0">
                  <span className="text-terracota">{step.icon}</span>
                </div>

                <span className="text-terracota font-sans text-[10px] font-bold uppercase tracking-widest mb-2">
                  {step.paso}
                </span>
                <h3 className="font-heading font-semibold text-verde text-base leading-snug mb-2">
                  {step.title}
                </h3>
                <p className="text-verde/60 text-sm font-sans leading-relaxed mt-auto pt-2">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
