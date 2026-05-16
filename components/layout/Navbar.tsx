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
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-full bg-terracota flex items-center justify-center">
            <span className="text-white text-xs font-heading font-bold leading-none">CE</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-bold text-verde text-base">Corporación</span>
            <span className="font-heading font-bold text-verde text-base -mt-0.5">Escuchar</span>
          </div>
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
          Abrir un asiento
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
            Abrir un asiento
          </Link>
        </div>
      )}
    </header>
  );
}
