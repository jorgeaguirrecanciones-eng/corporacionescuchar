import Link from "next/link";
import { Heart } from "lucide-react";

export default function ClosingCTA() {
  return (
    <section className="bg-verde py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Photo */}
          <div className="aspect-[4/3] lg:aspect-auto lg:h-64 rounded-3xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://static.wixstatic.com/media/cf2b8e_0aff98c1e968414787d3f502cd1603e6~mv2.jpeg"
              alt="Monitores certificados de Corporación Escuchar"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Copy + CTAs */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-white leading-tight mb-4">
              Hay conversaciones que pueden cambiar una vida
            </h2>
            <p className="text-white/70 font-sans mb-8 leading-relaxed">
              Ayúdanos a abrir más espacios donde las personas puedan ser escuchadas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dona"
                className="inline-flex items-center justify-center gap-2 bg-terracota hover:bg-terracota-dark text-white font-sans font-medium px-7 py-3.5 rounded-full transition-colors"
              >
                <Heart size={18} fill="currentColor" />
                Abrir mi asiento mensual
              </Link>
              <Link
                href="/dona#unico"
                className="inline-flex items-center justify-center text-white/80 hover:text-white font-sans text-sm underline underline-offset-4 transition-colors"
              >
                o hacer un aporte único
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 text-white/60 text-xs font-sans">
                <span className="text-terracota">✓</span>
                Corporación sin fines de lucro desde 2014
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs font-sans">
                <span className="text-terracota">✓</span>
                Beneficio tributario Ley 21.440
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs font-sans">
                <span className="text-terracota">✓</span>
                Pagos protegidos por Kellü
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
