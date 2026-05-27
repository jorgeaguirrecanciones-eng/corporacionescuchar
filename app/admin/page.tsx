"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Users, UserCheck, Layers } from "lucide-react";
import {
  DONORS, PARTICIPANTS, PAYMENTS, EMAIL_LOG,
  MRR, ACTIVE_DONORS, TOTAL_SPACES_ACTIVE,
  formatCLP, formatPeriod, formatDate,
} from "@/lib/mock-data";

const STATS = [
  {
    label: "Ingresos mensuales",
    value: formatCLP(MRR),
    sub: "donantes activos · recurrente",
    bg: "#6B2DB5",
    light: false,
    icon: TrendingUp,
    href: "/admin/donantes",
  },
  {
    label: "Donantes activos",
    value: String(ACTIVE_DONORS.length),
    sub: `${DONORS.filter(d => d.status === "pausado").length} pausados · ${DONORS.filter(d => d.status === "cancelado").length} cancelados`,
    bg: "#1CBF45",
    light: false,
    icon: Users,
    href: "/admin/donantes",
  },
  {
    label: "Inscritos este mes",
    value: String(PARTICIPANTS.filter(p => p.period === "2026-05").length),
    sub: "Círculos de Escucha · Mayo 2026",
    bg: "#C8197A",
    light: false,
    icon: UserCheck,
    href: "/admin/inscritos",
  },
  {
    label: "Espacios disponibles",
    value: `${TOTAL_SPACES_ACTIVE}`,
    sub: "espacios financiados por donantes",
    bg: "#F5D800",
    light: true,
    icon: Layers,
    href: "/admin/matching",
  },
];

const recentDonors = DONORS
  .filter(d => d.status === "activo")
  .sort((a, b) => new Date(b.since).getTime() - new Date(a.since).getTime())
  .slice(0, 5);

const recentPayments = PAYMENTS
  .filter(p => p.status === "aprobado")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

const STATUS_COLORS: Record<string, string> = {
  activo:    "bg-green-100 text-green-800",
  pausado:   "bg-amber-100 text-amber-700",
  cancelado: "bg-red-100 text-red-700",
};

export default function AdminOverview() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl text-[#1A1A1A] mb-1">
          Resumen general
        </h1>
        <p className="text-[#666] font-sans text-sm">
          Mayo 2026 · {new Date().toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="rounded-2xl p-5 flex flex-col justify-between min-h-[130px] hover:opacity-90 transition-opacity group"
              style={{ backgroundColor: s.bg }}
            >
              <div className="flex items-start justify-between">
                <Icon size={18} className={s.light ? "text-black/40" : "text-white/60"} />
                <ArrowRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${s.light ? "text-black/50" : "text-white/60"}`} />
              </div>
              <div>
                <div className={`font-heading text-[1.85rem] font-bold leading-none mb-1 ${s.light ? "text-black/80" : "text-white"}`}>
                  {s.value}
                </div>
                <div className={`text-[11px] font-sans leading-snug ${s.light ? "text-black/50" : "text-white/70"}`}>
                  {s.label}
                </div>
                <div className={`text-[10px] font-sans mt-1 ${s.light ? "text-black/35" : "text-white/45"}`}>
                  {s.sub}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Donantes recientes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-base text-[#1A1A1A]">Donantes activos</h2>
            <Link href="/admin/donantes" className="text-[#6B2DB5] text-xs font-sans hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="space-y-3">
            {recentDonors.map((d) => (
              <div key={d.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5EFE6] flex items-center justify-center text-sm font-heading font-semibold text-[#6B2DB5] shrink-0">
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-sans font-medium text-[#1A1A1A] leading-none">{d.name}</div>
                    <div className="text-[11px] text-[#999] font-sans mt-0.5">{d.spaces} {d.spaces === 1 ? "espacio" : "espacios"}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-sans font-semibold text-[#1A1A1A]">{formatCLP(d.amount)}</div>
                  <div className="text-[10px] text-[#999] font-sans">/mes</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Matching + emails */}
        <div className="flex flex-col gap-4">
          {/* Matching pendiente */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#C8197A]">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#C8197A] mb-1">
                  Pendiente
                </div>
                <h2 className="font-heading text-base text-[#1A1A1A]">
                  Matching Mayo 2026
                </h2>
              </div>
              <span className="bg-[#C8197A]/10 text-[#C8197A] text-[11px] font-sans font-semibold px-2.5 py-1 rounded-full">
                No enviado
              </span>
            </div>
            <p className="text-[#666] text-sm font-sans mb-4 leading-relaxed">
              {PARTICIPANTS.filter(p => p.period === "2026-05").length} inscritos · {TOTAL_SPACES_ACTIVE} espacios disponibles · 8 emails por enviar
            </p>
            <Link
              href="/admin/matching"
              className="inline-flex items-center gap-1.5 bg-[#C8197A] text-white text-sm font-sans font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Ir a matching
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Últimos pagos */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-base text-[#1A1A1A]">Últimos pagos</h2>
              <span className="text-[11px] text-[#999] font-sans">Mayo 2026</span>
            </div>
            <div className="space-y-2.5">
              {recentPayments.slice(0, 5).map((pay) => {
                const donor = DONORS.find(d => d.id === pay.donorId);
                return (
                  <div key={pay.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1CBF45] shrink-0" />
                      <span className="text-sm font-sans text-[#333]">{donor?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-sans font-semibold text-[#1A1A1A]">{formatCLP(pay.amount)}</span>
                      <span className="text-[10px] bg-green-100 text-green-700 font-sans px-2 py-0.5 rounded-full">aprobado</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Monthly summary strip */}
      <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-heading text-base text-[#1A1A1A] mb-5">Historial mensual</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {["2025-12","2026-01","2026-02","2026-03","2026-04","2026-05"].map((period) => {
            const participants = PARTICIPANTS.filter(p => p.period === period).length;
            const emailsSent = EMAIL_LOG.filter(e => e.period === period).length;
            const isCurrent = period === "2026-05";
            return (
              <div key={period} className={`rounded-xl p-3 text-center ${isCurrent ? "bg-[#6B2DB5]/8 border border-[#6B2DB5]/20" : "bg-[#F7F6F3]"}`}>
                <div className={`text-[11px] font-sans font-semibold mb-1 ${isCurrent ? "text-[#6B2DB5]" : "text-[#999]"}`}>
                  {formatPeriod(period)}
                </div>
                <div className="font-heading font-bold text-lg text-[#1A1A1A]">
                  {participants > 0 ? participants : "—"}
                </div>
                <div className="text-[10px] text-[#999] font-sans">inscritos</div>
                {emailsSent > 0 && (
                  <div className="mt-1 text-[10px] text-[#1CBF45] font-sans">✓ {emailsSent} emails</div>
                )}
                {isCurrent && (
                  <div className="mt-1 text-[10px] text-[#C8197A] font-sans">pendiente</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
