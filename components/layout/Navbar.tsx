"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/que-hacemos", label: "Qué hacemos" },
  { href: "/impacto", label: "Impacto" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img
            src="https://static.wixstatic.com/media/cf2b8e_31cb61a6fd534bf7b6aae14b650b98ff~mv2.png/v1/crop/x_134,y_0,w_1916,h_919/fill/w_357,h_172,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Captura%20de%20Pantalla%202023-10-04%20a%20la(s)%2023_39_20.png"
            alt="Corporación Escuchar"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-sans text-verde/80 hover:text-verde transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/hazte-socio"
          className="hidden md:inline-flex items-center gap-2 bg-terracota hover:bg-terracota-dark text-white text-sm font-sans font-medium px-5 py-2.5 rounded-full transition-colors"
        >
          Regalar un asiento
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-verde"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-sans text-verde/80 hover:text-verde border-b border-border/50 last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/hazte-socio"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center bg-terracota text-white text-sm font-sans font-medium py-3 rounded-full"
          >
            Regalar un asiento
          </Link>
        </div>
      )}
    </header>
  );
}
