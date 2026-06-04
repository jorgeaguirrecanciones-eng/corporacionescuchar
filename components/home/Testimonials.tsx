const testimonials = [
  { name: "Karla", age: 51, quote: "Me llevo autoestima, lo que me pasa no es sólo mío." },
  { name: "Vivi", age: 55, quote: "La solidaridad de esta familia escogida." },
  { name: "Ada", age: 65, quote: "Tranquila, mi malestar no es sólo mío." },
  { name: "Gladys", age: 65, quote: "Aliviada, al compartir, la mochila pesa menos." },
  { name: "Paulo", age: 60, quote: "Agradecido, nos unen muchas experiencias." },
  { name: "Carmen", age: 43, quote: "Una buena energía que se multiplica." },
  { name: "Lucas", age: 40, quote: "Muy agradecido por la valentía y la confianza." },
  { name: "Ricardo", age: 65, quote: "Empatía, me tocó lo dicho." },
  { name: "Azucena", age: 71, quote: "Feliz de aprender del compartir, feliz de aportar experiencias." },
  { name: "María", age: 51, quote: "Contenta, me llevo el mirarme al espejo y tomar conciencia de mí." },
  { name: "Ada", age: 65, quote: "Feliz de que mi experiencia les sirva y de que me escuchen." },
  { name: "Paula", age: 72, quote: "Aprendí que puedo saltar los protocolos y enfrentar." },
  { name: "Vivian", age: 70, quote: "Super contenta, la experiencia me abrió los ojos." },
  { name: "Alba", age: 82, quote: "Contenta, aprendo de sus ejemplos." },
  { name: "Gloria", age: 74, quote: "Enriquecida por sus experiencias." },
  { name: "Lidia", age: 73, quote: "Más liviana y enriquecida." },
  { name: "Alicia", age: 71, quote: "Me voy tranquila y con esperanza." },
  { name: "Mario", age: 36, quote: "Me llevo esperanza, es posible ser resiliente." },
  { name: "María", age: 51, quote: "Agradecida por las experiencias que compartieron, aprendí mucho." },
  { name: "Elena", age: 73, quote: "Comprender y no juzgar." },
  { name: "Miguel", age: 54, quote: "Lo primero es cuidarme yo." },
];

/* Split en 3 filas */
const row1 = testimonials.slice(0, 7);
const row2 = testimonials.slice(7, 14);
const row3 = testimonials.slice(14);

function Card({ name, age, quote }: { name: string; age: number; quote: string }) {
  return (
    <div className="shrink-0 bg-white rounded-2xl px-5 py-4 shadow-sm max-w-[280px] mx-3 border border-gray-100">
      <p className="text-verde font-sans text-sm leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="mt-3 font-sans text-xs font-semibold" style={{ color: "#C8197A" }}>
        — {name}, {age} años
      </p>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 35,
}: {
  items: typeof testimonials;
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items, ...items];
  const anim =
    direction === "left"
      ? `marquee-left ${speed}s linear infinite`
      : `marquee-right ${speed}s linear infinite`;

  return (
    <div className="overflow-hidden group">
      <div
        className="flex w-max"
        style={{ animation: anim }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.animationPlayState = "running")
        }
      >
        {doubled.map((t, i) => (
          <Card key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 text-center">
        <p className="text-xs font-sans font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8197A" }}>
          En sus propias palabras
        </p>
        <h2 className="font-heading text-3xl md:text-4xl text-verde leading-tight">
          Lo que se llevan del Círculo
        </h2>
        <p className="text-verde/55 font-sans mt-3 max-w-lg mx-auto">
          Testimonios reales de personas que participaron en nuestros Círculos de Escucha.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <MarqueeRow items={row1} direction="left" speed={40} />
        <MarqueeRow items={row2} direction="right" speed={33} />
        <MarqueeRow items={row3} direction="left" speed={38} />
      </div>
    </section>
  );
}
