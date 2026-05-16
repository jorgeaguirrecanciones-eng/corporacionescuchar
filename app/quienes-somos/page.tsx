import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Heart } from "lucide-react";

/* ─── Data ─── */

const board = [
  {
    name: "Verónica Virgilio",
    role: "Presidenta",
    bio: "Ingeniera Industrial U. de Chile · MBA · Coach · Terapeuta Comunitaria",
    photo: "https://static.wixstatic.com/media/cf2b8e_ca7fe6e000b64de3a6a79d65d801463b~mv2.png",
  },
  {
    name: "Jorge Lara",
    role: "Vicepresidente",
    bio: "Ingeniero Civil PUC · MBA · Coach Ontológico",
    photo: "https://static.wixstatic.com/media/cf2b8e_3f6093f55b0d4cbfb488c3baf2733113~mv2.jpg",
  },
  {
    name: "Verónica Baeza",
    role: "Secretaria",
    bio: "Arquitecta · Psicóloga · Terapeuta Gestalt",
    photo: "https://static.wixstatic.com/media/cf2b8e_b82861fb1efd4f7eb5d914a327952f1a~mv2.jpg",
  },
  {
    name: "Richard Aylwin",
    role: "Tesorero",
    bio: "Ingeniero Civil · Especialista en gestión de proyectos",
    photo: "https://static.wixstatic.com/media/cf2b8e_5390540e8ae3419184ea4de6ac3509eb~mv2.jpg",
  },
  {
    name: "Carla Meier",
    role: "Directora",
    bio: "Ingeniero Civil Industrial",
    photo: "https://static.wixstatic.com/media/cf2b8e_73542b15f50643adb72a5cc07c818b62~mv2.png",
  },
];

const executive = {
  name: "Yasna Nanjarí Godoy",
  role: "Directora Ejecutiva",
  bio: "Psicóloga · Terapeuta Comunitaria · Coordinadora de Círculos de Escucha en Chile",
  photo: "https://static.wixstatic.com/media/cf2b8e_795edc9ed4764c208a3007aa293ca25e~mv2.png",
};

const therapists = [
  {
    name: "Jennifer Díaz",
    role: "Monitora",
    photo: "https://static.wixstatic.com/media/cf2b8e_a5dd7ca823d946c4a50756c45b225fb5~mv2.png",
  },
  {
    name: "Nahdy Moreno",
    role: "Monitora",
    photo: "https://static.wixstatic.com/media/cf2b8e_60b6a52522b54716aa4f3f78bae6df78~mv2.png",
  },
  {
    name: "Miryam Leiva",
    role: "Monitora",
    photo: "https://static.wixstatic.com/media/cf2b8e_b565c9a98b614a6496edac41102c608e~mv2.png",
  },
  {
    name: "Jocelyn Ávalos",
    role: "Monitora",
    photo: "https://static.wixstatic.com/media/cf2b8e_799a8cee551f4d9f8688793d1a08f67b~mv2.jpg",
  },
  {
    name: "Lorena Mandiola",
    role: "Monitora",
    photo: "https://static.wixstatic.com/media/cf2b8e_76285f42b7ab43f0833b4ff08e16877d~mv2.png",
  },
  {
    name: "Lissette Almonacid",
    role: "Monitora",
    photo: "https://static.wixstatic.com/media/cf2b8e_7bb61ea4698348a6bdb770c0511201ef~mv2.png",
  },
];

const stats = [
  { value: "2014", label: "Año de fundación", prefix: "Desde" },
  { value: "+8.500", label: "Personas han participado" },
  { value: "+150", label: "Monitores/as formados/as" },
  { value: "+120", label: "Círculos activos" },
];

const values = [
  {
    icon: "◎",
    title: "Horizontalidad",
    desc: "No hay expertos ni pacientes. Todos los roles son iguales dentro del círculo. La voz de cada persona tiene el mismo valor.",
  },
  {
    icon: "♡",
    title: "Escucha sin juicio",
    desc: "Un espacio donde hablar sin recibir consejos, sin ser evaluado, sin tener que demostrar nada. Solo ser escuchado.",
  },
  {
    icon: "◈",
    title: "Comunidad real",
    desc: "Creemos que el bienestar no es individual. Se construye en comunidad, a través de vínculos auténticos y redes de apoyo mutuo.",
  },
];

/* ─── Page ─── */

export default function QuienesSomosPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ══ */}
        <section className="relative h-[85vh] min-h-[560px] flex items-end overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://static.wixstatic.com/media/cf2b8e_9868894826c4477cb8df0dee04c1ba37~mv2.jpg"
            alt="Círculo de Escucha"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-verde via-verde/60 to-transparent" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-16 md:pb-20 w-full">
            <span className="inline-block text-white/60 text-xs font-sans font-semibold uppercase tracking-widest mb-4">
              Quiénes somos
            </span>
            <h1 className="font-heading text-4xl md:text-6xl text-white leading-[1.05] max-w-3xl mb-6">
              Promovemos el diálogo para construir bienestar en comunidad.
            </h1>
            <p className="text-white/70 font-sans text-lg max-w-xl leading-relaxed">
              Somos una corporación sin fines de lucro fundada en Santiago en 2014. Facilitamos Círculos de Escucha — espacios gratuitos donde las personas se escuchan sin juicio.
            </p>
          </div>
        </section>

        {/* ══ ORIGIN STORY ══ */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-sans font-semibold tracking-widest text-terracota uppercase mb-4 block">
                  Nuestra historia
                </span>
                <h2 className="font-heading text-3xl md:text-4xl text-verde leading-tight mb-6">
                  Nacimos de la convicción de que escuchar transforma.
                </h2>
                <div className="space-y-4 text-verde/70 font-sans text-base leading-relaxed">
                  <p>
                    En octubre de 2014, un grupo de profesionales convencidos del poder del diálogo fundó la Corporación Escuchar en Santiago de Chile. La pregunta que los unía era simple y profunda: ¿qué pasaría si las personas tuvieran un espacio para ser escuchadas de verdad?
                  </p>
                  <p>
                    La respuesta llegó a través de los Círculos de Escucha, una tecnología social con más de 40 años de historia comprobada en países de América y Europa. Una práctica de relaciones horizontales donde no hay expertos ni pacientes — solo personas presentes.
                  </p>
                  <p>
                    Hoy, más de 8.500 personas han participado en nuestros círculos. Más de 150 monitores/as han sido formados. Y los círculos siguen creciendo, cada lunes, en comunidades de todo Chile.
                  </p>
                </div>
              </div>

              {/* Pull quote */}
              <div className="flex flex-col gap-6">
                <div className="bg-beige rounded-3xl p-8 md:p-10 relative">
                  <span className="text-terracota font-heading text-7xl leading-none absolute -top-4 left-8 opacity-30">"</span>
                  <blockquote className="font-heading text-2xl md:text-3xl text-verde leading-snug pt-6">
                    Una tecnología social con 40 años de vida, ya probada en países de América y Europa.
                  </blockquote>
                  <p className="text-verde/50 font-sans text-sm mt-4">
                    — Corporación Escuchar
                  </p>
                </div>

                {/* Mini photo */}
                <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://static.wixstatic.com/media/cf2b8e_fe109ead2ca942babb72a4f947d2ea89~mv2.jpeg"
                    alt="Círculo de Escucha en acción"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section className="bg-beige py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-xl mb-14">
              <span className="text-xs font-sans font-semibold tracking-widest text-terracota uppercase mb-3 block">
                Lo que nos mueve
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-verde leading-tight">
                Tres principios que guían todo lo que hacemos
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-3xl p-8">
                  <div className="text-3xl text-terracota mb-5">{v.icon}</div>
                  <h3 className="font-heading text-xl text-verde font-bold mb-3">{v.title}</h3>
                  <p className="text-verde/65 font-sans text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="bg-verde py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-3xl md:text-4xl text-white text-center mb-14 leading-tight">
              Más de una década<br />abriendo espacios de escucha
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((s) => (
                <div key={s.value} className="text-center bg-white/10 rounded-2xl p-6">
                  {s.prefix && (
                    <div className="text-white/50 text-xs font-sans mb-1">{s.prefix}</div>
                  )}
                  <div className="font-heading text-4xl md:text-5xl font-bold text-white leading-none mb-2">
                    {s.value}
                  </div>
                  <div className="text-white/60 text-xs font-sans leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ EXECUTIVE DIRECTOR ══ */}
        <section className="bg-white py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <span className="text-xs font-sans font-semibold tracking-widest text-terracota uppercase mb-3 block text-center">
              Dirección ejecutiva
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-verde text-center mb-14">
              Quien lidera el día a día
            </h2>
            <div className="max-w-sm mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-5 ring-4 ring-beige">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={executive.photo}
                    alt={executive.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="font-heading text-xl text-verde font-bold mb-1">{executive.name}</h3>
                <p className="text-terracota font-sans text-sm font-semibold mb-3">{executive.role}</p>
                <p className="text-verde/60 font-sans text-sm leading-relaxed">{executive.bio}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ BOARD ══ */}
        <section className="bg-beige py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <span className="text-xs font-sans font-semibold tracking-widest text-terracota uppercase mb-3 block text-center">
              Junta directiva
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-verde text-center mb-14">
              Las personas detrás de la misión
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {board.map((p) => (
                <div key={p.name} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-4 ring-2 ring-white shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="font-heading text-sm md:text-base text-verde font-bold leading-tight mb-1">
                    {p.name}
                  </h3>
                  <p className="text-terracota font-sans text-xs font-semibold mb-2">{p.role}</p>
                  <p className="text-verde/55 font-sans text-xs leading-snug">{p.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MONITORS/THERAPISTS ══ */}
        <section className="bg-white py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <span className="text-xs font-sans font-semibold tracking-widest text-terracota uppercase mb-3 block text-center">
              Equipo de monitoras
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-verde text-center mb-4">
              Quienes facilitan los círculos
            </h2>
            <p className="text-verde/60 font-sans text-center max-w-lg mx-auto mb-14 leading-relaxed">
              Monitoras formadas y certificadas que llevan la práctica de los Círculos de Escucha a comunidades de todo Chile.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-5">
              {therapists.map((t) => (
                <div key={t.name} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 ring-2 ring-beige">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="font-heading text-xs sm:text-sm text-verde font-bold leading-tight">
                    {t.name}
                  </h3>
                  <p className="text-verde/50 font-sans text-[10px] mt-0.5">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="bg-beige py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-verde leading-tight mb-4">
              ¿Quieres ser parte<br />de esta comunidad?
            </h2>
            <p className="text-verde/65 font-sans text-lg leading-relaxed mb-10">
              Puedes participar en un círculo, apoyar nuestra misión abriendo un asiento, o simplemente compartir lo que hacemos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dona"
                className="inline-flex items-center justify-center gap-2 bg-terracota hover:bg-terracota-dark text-white font-sans font-semibold px-8 py-4 rounded-full transition-colors shadow-lg shadow-terracota/20"
              >
                <Heart size={18} fill="currentColor" />
                Regala un asiento
              </Link>
              <Link
                href="/circulos"
                className="inline-flex items-center justify-center gap-2 border-2 border-verde/30 hover:border-verde text-verde font-sans font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Participar en un círculo
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
