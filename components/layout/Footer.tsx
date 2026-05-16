import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-verde text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-full bg-terracota flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-heading font-bold">CE</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-white text-base">Corporación</span>
              <span className="font-heading font-bold text-white text-base -mt-0.5">Escuchar</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            Círculos de Escucha para el bienestar emocional y la comunidad. Organización sin fines de lucro desde 2014.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Contáctanos</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-terracota shrink-0" />
              <a href="mailto:contacto@corporacionescuchar.cl" className="hover:text-white transition-colors">
                hola@corporacionescuchar.cl
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-terracota shrink-0" />
              <a href="https://wa.me/56998218311" className="hover:text-white transition-colors">
                +56 9 9821 8311
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="text-terracota shrink-0 mt-0.5" />
              <span>Santiago de Chile</span>
            </li>
          </ul>
        </div>

        {/* Social + Kellu badge */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Síguenos</h4>
          <div className="flex gap-3 mb-6">
            {[
              {
                href: "https://www.instagram.com/corporacionescuchar/",
                label: "Instagram",
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-white">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
              {
                href: "https://www.facebook.com/circulos.de.escucha",
                label: "Facebook",
                svg: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
              {
                href: "https://youtube.com",
                label: "YouTube",
                svg: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label={social.label}
              >
                {social.svg}
              </a>
            ))}
          </div>

          {/* Kellü badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2">
            <div className="w-6 h-6 rounded-md bg-terracota flex items-center justify-center">
              <span className="text-white text-[9px] font-bold font-heading">K</span>
            </div>
            <div className="text-xs leading-tight">
              <div className="text-white font-medium">KELLÜ</div>
              <div className="text-white/60">Transparencia y confianza</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/40">
          <span>© 2025 Corporación Escuchar. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <Link href="/transparencia" className="hover:text-white/70 transition-colors">Transparencia</Link>
            <Link href="/transparencia" className="hover:text-white/70 transition-colors">FECU Social 2024</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
