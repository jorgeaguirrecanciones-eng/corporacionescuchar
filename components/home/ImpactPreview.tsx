import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MOCK_POSTS, CATEGORY_META } from "@/lib/posts";

const stats = [
  { value: "2014", prefix: "Desde", label: "Escuchando y acompañando", bg: "#C8197A" },
  { value: "+8.500", label: "Personas en nuestros círculos", bg: "#6B2DB5" },
  { value: "+150", label: "Monitores/as formados/as", bg: "#1CBF45" },
  { value: "+120", label: "Círculos activos", bg: "#F5D800", dark: true },
];

export default function ImpactPreview() {
  const latest = MOCK_POSTS.filter((p) => p.published).slice(0, 3);

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div key={s.value} className="rounded-2xl p-5 text-center" style={{ backgroundColor: s.bg }}>
              {s.prefix && <p className={`font-sans text-xs mb-0.5 ${s.dark ? "text-black/50" : "text-white/70"}`}>{s.prefix}</p>}
              <p className={`font-heading text-3xl font-bold mb-1 ${s.dark ? "text-black/80" : "text-white"}`}>{s.value}</p>
              <p className={`text-xs font-sans leading-snug ${s.dark ? "text-black/60" : "text-white/80"}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-terracota mb-2">
              Impacto real
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-verde leading-tight">
              Historias que tu asiento<br />hizo posibles
            </h2>
          </div>
          <Link
            href="/impacto"
            className="hidden sm:flex items-center gap-1.5 text-sm font-sans font-medium text-terracota hover:gap-3 transition-all shrink-0"
          >
            Ver todo el impacto <ArrowRight size={15} />
          </Link>
        </div>

        {/* 3 latest posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((post) => {
            const meta = CATEGORY_META[post.category];
            return (
              <Link
                key={post.id}
                href="/impacto"
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.cover_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span
                    className="text-xs font-sans font-semibold px-3 py-1 rounded-full self-start"
                    style={{ color: meta.color, backgroundColor: meta.bg }}
                  >
                    {meta.label}
                  </span>
                  <h3 className="font-heading text-base text-verde leading-snug group-hover:text-terracota transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-sans text-xs text-verde/50 leading-relaxed line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/impacto"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-terracota"
          >
            Ver todo el impacto <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}
