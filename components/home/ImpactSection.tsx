const pillars = [
  {
    icon: "◎",
    title: "Círculos abiertos",
    desc: "Para cualquier persona que necesite ser escuchada.",
  },
  {
    icon: "🎓",
    title: "Formación de monitores/as",
    desc: "Personas voluntarias capacitadas para facilitar con calidad y calidez.",
  },
  {
    icon: "📍",
    title: "Instalación en comunidades",
    desc: "Llegamos a más territorios con espacios seguros.",
  },
  {
    icon: "⚙",
    title: "Gestión y acompañamiento",
    desc: "Coordinación, evaluación y mejora continua.",
  },
];

const stats = [
  { value: "2014", label: "Escuchando y acompañando", prefix: "Desde" },
  { value: "+8.500", label: "Personas han participado en nuestros círculos" },
  { value: "+150", label: "Monitores/as formados/as" },
  { value: "+120", label: "Círculos activos en comunidades" },
];

export default function ImpactSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div
              key={s.value}
              className="bg-verde rounded-2xl p-5 text-center"
            >
              {s.prefix && (
                <p className="text-white/60 font-sans text-xs mb-0.5">{s.prefix}</p>
              )}
              <p className="font-heading text-3xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-white/70 text-xs font-sans leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
