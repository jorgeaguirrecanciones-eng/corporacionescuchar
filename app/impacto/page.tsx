"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { X, ArrowRight, Heart } from "lucide-react";
import { MOCK_POSTS, CATEGORY_META, type Post, type Category } from "@/lib/posts";

/* ─── Stats ─── */
const stats = [
  { value: "2014", prefix: "Desde", label: "Escuchando y acompañando", bg: "#C8197A" },
  { value: "+8.500", label: "Personas han participado en nuestros círculos", bg: "#6B2DB5" },
  { value: "+150", label: "Monitores/as formados/as", bg: "#1CBF45" },
  { value: "+120", label: "Círculos activos en comunidades", bg: "#F5D800", dark: true },
];

/* ─── Timeline ─── */
const timeline = [
  { year: "2014", text: "Primer Círculo de Escucha en Santiago. Todo comenzó con una silla y alguien dispuesto a escuchar." },
  { year: "2016", text: "Lanzamos el primer programa de formación de monitores voluntarios." },
  { year: "2018", text: "Superamos los 1.000 participantes acumulados. La comunidad crece." },
  { year: "2020", text: "Adaptamos los Círculos a modalidad online durante la pandemia. La escucha no se detuvo." },
  { year: "2022", text: "Expansión a regiones. Los Círculos salen de Santiago por primera vez." },
  { year: "2023", text: "5.000 participantes acumulados. 100 monitores certificados." },
  { year: "2024", text: "150 monitores. Presencia en La Araucanía. Cobertura nacional en medios." },
  { year: "2025", text: "+8.500 participantes. Lanzamos esta plataforma para seguir creciendo." },
];

/* ─── Category badge ─── */
function CategoryBadge({ category }: { category: Category }) {
  const meta = CATEGORY_META[category];
  return (
    <span
      className="inline-block text-xs font-sans font-semibold px-3 py-1 rounded-full"
      style={{ color: meta.color, backgroundColor: meta.bg }}
    >
      {meta.label}
    </span>
  );
}

/* ─── Post card ─── */
function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={post.cover_url}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <CategoryBadge category={post.category} />
          <span className="text-xs font-sans text-verde/40">
            {new Date(post.date).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>
        <h3 className="font-heading text-lg text-verde leading-snug group-hover:text-terracota transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="font-sans text-sm text-verde/60 leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-1 text-terracota text-sm font-sans font-medium mt-auto">
          Leer más <ArrowRight size={14} />
        </div>
      </div>
    </article>
  );
}

/* ─── Featured card ─── */
function FeaturedCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group relative rounded-3xl overflow-hidden cursor-pointer bg-verde"
      style={{ minHeight: 420 }}
    >
      <img
        src={post.cover_url}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-terracota text-white text-xs font-sans font-bold px-3 py-1 rounded-full">
            ★ Destacado
          </span>
          <CategoryBadge category={post.category} />
        </div>
        <h2 className="font-heading text-2xl md:text-4xl text-white leading-tight mb-3 max-w-2xl">
          {post.title}
        </h2>
        <p className="text-white/70 font-sans text-base max-w-xl leading-relaxed mb-5 hidden md:block">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 text-white font-sans font-medium text-sm group-hover:gap-3 transition-all">
          Leer historia completa <ArrowRight size={16} />
        </div>
      </div>
    </article>
  );
}

/* ─── Post modal ─── */
function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const meta = CATEGORY_META[post.category];
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover */}
        <div className="aspect-[16/9] overflow-hidden">
          <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="p-7 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <CategoryBadge category={post.category} />
            <span className="text-xs font-sans text-verde/40">
              {new Date(post.date).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {post.author && (
              <span className="text-xs font-sans text-verde/40">· {post.author}</span>
            )}
          </div>

          <h1 className="font-heading text-2xl md:text-3xl text-verde leading-tight mb-6">
            {post.title}
          </h1>

          {/* Body — render markdown-style */}
          <div className="font-sans text-verde/75 text-base leading-relaxed space-y-4">
            {post.body.split("\n\n").map((para, i) => {
              if (para.startsWith("**") || para.includes("**")) {
                return (
                  <p key={i} dangerouslySetInnerHTML={{
                    __html: para
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em>$1</em>")
                      .replace(/\n/g, "<br/>")
                  }} />
                );
              }
              if (para.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc list-inside space-y-1 text-verde/70">
                    {para.split("\n").filter(l => l.startsWith("- ")).map((l, j) => (
                      <li key={j}>{l.slice(2)}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i}>{para}</p>;
            })}
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-start">
            <Link
              href="/dona"
              className="inline-flex items-center gap-2 bg-terracota text-white font-sans font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
              onClick={onClose}
            >
              <Heart size={14} fill="currentColor" />
              Regalar un asiento
            </Link>
            <button
              onClick={onClose}
              className="text-verde/50 font-sans text-sm hover:text-verde transition-colors py-3"
            >
              Volver a noticias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function ImpactoPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const published = MOCK_POSTS.filter((p) => p.published);
  const featured = published.find((p) => p.featured);
  const filtered = published
    .filter((p) => !p.featured)
    .filter((p) => activeCategory === "all" || p.category === activeCategory);

  const categories: { id: Category | "all"; label: string }[] = [
    { id: "all", label: "Todas" },
    { id: "historia", label: "Historias" },
    { id: "logro", label: "Logros" },
    { id: "prensa", label: "Prensa" },
    { id: "reporte", label: "Reportes" },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">


        {/* ── Featured ── */}
        {featured && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-4">
            <FeaturedCard post={featured} onClick={() => setSelectedPost(featured)} />
          </section>
        )}

        {/* ── Filter + Grid ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          {/* Sticky filter */}
          <div className="sticky top-16 z-10 bg-white/95 backdrop-blur py-4 mb-8 -mx-4 px-4 border-b border-gray-100">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`shrink-0 px-5 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200 ${
                    activeCategory === c.id
                      ? "bg-verde text-white shadow-sm"
                      : "bg-gray-100 text-verde/60 hover:bg-gray-200"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-verde/40 font-sans">
              No hay publicaciones en esta categoría todavía.
            </div>
          )}
        </section>

        {/* ── En los medios ── */}
        <section className="bg-beige py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-terracota mb-3 text-center">
              En los medios
            </p>
            <h2 className="font-heading text-3xl text-verde text-center mb-10">
              Nos han contado
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {["La Tercera", "CNN Chile", "El Mercurio", "Radio ADN", "Biobío Chile", "La Segunda"].map((medio) => (
                <div
                  key={medio}
                  className="text-verde/30 font-heading font-bold text-xl hover:text-verde/60 transition-colors cursor-default"
                >
                  {medio}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-terracota mb-3 text-center">
              Nuestra historia
            </p>
            <h2 className="font-heading text-3xl text-verde text-center mb-12">
              Una línea de tiempo de escucha
            </h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-gray-100 md:-translate-x-px" />

              <div className="flex flex-col gap-0">
                {timeline.map((item, i) => (
                  <div
                    key={item.year}
                    className={`relative flex items-start gap-6 md:gap-0 pb-10 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1">
                      <div className="w-9 h-9 rounded-full bg-white border-2 border-terracota flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-terracota" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`md:w-[45%] ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:ml-auto"}`}>
                      <span className="font-heading font-bold text-terracota text-xl">{item.year}</span>
                      <p className="font-sans text-sm text-verde/70 leading-relaxed mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-beige py-16 text-center">
          <div className="max-w-xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-3xl text-verde mb-3">
              ¿Quieres ser parte de la próxima historia?
            </h2>
            <p className="text-verde/60 font-sans mb-8">
              Cada asiento regalado es una historia que todavía no se ha escrito.
            </p>
            <Link
              href="/dona"
              className="inline-flex items-center gap-2 bg-terracota text-white font-sans font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              <Heart size={16} fill="currentColor" />
              Regalar un asiento
            </Link>
          </div>
        </section>

      </main>

      {/* ── Modal ── */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      <Footer />
    </>
  );
}
