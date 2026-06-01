"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  GitMerge,
  Mail,
  Banknote,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/admin",          label: "Resumen",    icon: LayoutDashboard },
  { href: "/admin/donantes", label: "Donantes",   icon: Users },
  { href: "/admin/inscritos",label: "Inscritos",  icon: UserCheck },
  { href: "/admin/matching",       label: "Matching",       icon: GitMerge },
  { href: "/admin/transferencias", label: "Transferencias", icon: Banknote },
  { href: "/admin/emails",         label: "Emails",         icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#1CBF45] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 14 14" className="w-4 h-4" fill="none">
              <path d={`M ${(-8 * 0.966).toFixed(1)} ${(8 * 0.259).toFixed(1)} A 8 8 0 1 0 ${(8 * 0.966).toFixed(1)} ${(8 * 0.259).toFixed(1)}`}
                stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" transform="translate(7,7)" />
            </svg>
          </div>
          <div>
            <div className="text-white font-sans font-semibold text-sm leading-none">Corporación</div>
            <div className="text-white/50 font-sans text-[10px] leading-none mt-0.5 tracking-widest uppercase">Escuchar</div>
          </div>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 bg-white/8 rounded-full px-2.5 py-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1CBF45]" />
          <span className="text-white/60 text-[10px] font-sans">Panel de administración</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <div className="text-white/30 text-[9px] font-sans font-bold uppercase tracking-widest px-3 mb-2">
          Menú
        </div>
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-sans transition-all duration-150
              ${isActive(href)
                ? "bg-[#6B2DB5] text-white font-semibold"
                : "text-white/50 hover:text-white hover:bg-white/6"
              }
            `}
          >
            <Icon size={16} className="shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 border-t border-white/8 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/70 text-sm font-sans transition-colors"
        >
          <ExternalLink size={15} className="shrink-0" />
          Ver sitio público
        </Link>
        <div className="px-3 mt-3 text-white/20 text-[10px] font-sans">
          v0.1 — modo demo
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 bg-[#18122B] min-h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* Mobile: hamburger + drawer */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 w-9 h-9 rounded-xl bg-[#18122B] text-white flex items-center justify-center shadow-lg"
        >
          <Menu size={18} />
        </button>

        {open && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-56 bg-[#18122B] flex flex-col min-h-screen">
              <div className="flex justify-end p-4">
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              <NavContent />
            </div>
            <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
          </div>
        )}
      </div>
    </>
  );
}
