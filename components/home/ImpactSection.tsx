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
  { value: "2014", label: "Escuchando y acompañando", prefix: "Desde", bg: "#C8197A", light: false },
  { value: "+8.500", label: "Personas han participado en nuestros círculos", bg: "#6B2DB5", light: false },
  { value: "+150", label: "Monitores/as formados/as", bg: "#1CBF45", light: false },
  { value: "+120", label: "Círculos activos en comunidades", bg: "#F5D800", light: true },
];

export default function ImpactSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-2xl p-5 text-center"
              style={{ backgroundColor: s.bg }}
            >
              {s.prefix && (
                <p className={`font-sans text-xs mb-0.5 ${s.light ? "text-black/50" : "text-white/70"}`}>
                  {s.prefix}
                </p>
              )}
              <p className={`font-heading text-3xl font-bold mb-1 ${s.light ? "text-black/80" : "text-white"}`}>
                {s.value}
              </p>
              <p className={`text-xs font-sans leading-snug ${s.light ? "text-black/60" : "text-white/80"}`}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
