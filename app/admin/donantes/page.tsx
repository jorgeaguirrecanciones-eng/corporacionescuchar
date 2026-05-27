"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, Mail, Pause, XCircle, Users } from "lucide-react";
import { DONORS, Donor, DonorStatus, formatCLP, formatDate } from "@/lib/mock-data";

type Tab = "todos" | "activo" | "pausado" | "cancelado";

const STATUS_LABEL: Record<DonorStatus, string> = {
  activo:    "Activo",
  pausado:   "Pausado",
  cancelado: "Cancelado",
};

const STATUS_STYLE: Record<DonorStatus, string> = {
  activo:    "bg-green-100 text-green-800",
  pausado:   "bg-amber-100 text-amber-800",
  cancelado: "bg-red-100 text-red-700",
};

const TYPE_STYLE: Record<string, string> = {
  mensual: "bg-[#6B2DB5]/10 text-[#6B2DB5]",
  unico:   "bg-gray-100 text-gray-600",
};

export default function DonantesPage() {
  const [tab, setTab] = useState<Tab>("todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Donor | null>(null);

  const filtered = DONORS
    .filter(d => tab === "todos" || d.status === tab)
    .filter(d =>
      search === "" ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase())
    );

  const counts = {
    todos:    DONORS.length,
    activo:   DONORS.filter(d => d.status === "activo").length,
    pausado:  DONORS.filter(d => d.status === "pausado").length,
    cancelado:DONORS.filter(d => d.status === "cancelado").length,
  };

  const mrr = DONORS
    .filter(d => d.status === "activo")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl text-[#1A1A1A] mb-1">Donantes</h1>
          <p className="text-[#666] font-sans text-sm">
            {formatCLP(mrr)}/mes recurrente · {counts.activo} activos
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="bg-[#6B2DB5]/10 rounded-xl px-4 py-2.5 text-center">
            <div className="font-heading text-lg font-bold text-[#6B2DB5]">{formatCLP(mrr)}</div>
            <div className="text-[10px] text-[#6B2DB5]/70 font-sans uppercase tracking-widest">MRR</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-5 w-fit">
        {(["todos","activo","pausado","cancelado"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`
              px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all duration-150 flex items-center gap-1.5
              ${tab === t ? "bg-[#18122B] text-white shadow-sm" : "text-[#666] hover:text-[#1A1A1A]"}
            `}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-sans
              ${tab === t ? "bg-white/20 text-white/80" : "bg-[#F0EDEA] text-[#888]"}
            `}>
              {counts[t]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#AAA]" />
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8E4E0] rounded-xl text-sm font-sans text-[#1A1A1A] placeholder:text-[#BBB] focus:outline-none focus:border-[#6B2DB5] shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-[#F0EDEA]">
                <th className="text-left px-5 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest">Donante</th>
                <th className="text-left px-4 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest">Tipo</th>
                <th className="text-left px-4 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest">Estado</th>
                <th className="text-right px-4 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest">Monto</th>
                <th className="text-center px-4 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest">Espacios</th>
                <th className="text-left px-4 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest hidden md:table-cell">Desde</th>
                <th className="text-left px-4 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest hidden lg:table-cell">Último pago</th>
                <th className="px-4 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-[#999] font-sans">
                    No hay resultados
                  </td>
                </tr>
              )}
              {filtered.map((donor, i) => (
                <tr
                  key={donor.id}
                  className={`border-b border-[#F7F6F3] hover:bg-[#FAFAF8] cursor-pointer transition-colors ${i % 2 === 0 ? "" : "bg-[#FDFDFC]"}`}
                  onClick={() => setSelected(donor)}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F5EFE6] flex items-center justify-center font-heading font-bold text-sm text-[#6B2DB5] shrink-0">
                        {donor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-[#1A1A1A]">{donor.name}</div>
                        <div className="text-[11px] text-[#999]">{donor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${TYPE_STYLE[donor.type]}`}>
                      {donor.type}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${STATUS_STYLE[donor.status]}`}>
                      {STATUS_LABEL[donor.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-semibold text-[#1A1A1A]">
                    {formatCLP(donor.amount)}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#6B2DB5]/10 text-[#6B2DB5] font-bold text-sm">
                      {donor.spaces}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[#777] hidden md:table-cell">
                    {formatDate(donor.since)}
                  </td>
                  <td className="px-4 py-3.5 text-[#777] hidden lg:table-cell">
                    {donor.lastPayment ? formatDate(donor.lastPayment) : "—"}
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={e => { e.stopPropagation(); setSelected(donor); }}
                      className="text-[#6B2DB5] hover:underline text-xs font-medium"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Donor detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#18122B] p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#6B2DB5] flex items-center justify-center font-heading font-bold text-xl text-white">
                  {selected.name.charAt(0)}
                </div>
                <button onClick={() => setSelected(null)} className="text-white/50 hover:text-white text-xl leading-none">✕</button>
              </div>
              <h2 className="font-heading text-xl text-white mb-0.5">{selected.name}</h2>
              <p className="text-white/50 text-sm font-sans">{selected.email}</p>
              {selected.phone && <p className="text-white/40 text-xs font-sans mt-0.5">{selected.phone}</p>}
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#F7F6F3] rounded-xl p-3 text-center">
                  <div className="font-heading font-bold text-lg text-[#1A1A1A]">{formatCLP(selected.amount)}</div>
                  <div className="text-[10px] text-[#999] font-sans">por mes</div>
                </div>
                <div className="bg-[#6B2DB5]/10 rounded-xl p-3 text-center">
                  <div className="font-heading font-bold text-lg text-[#6B2DB5]">{selected.spaces}</div>
                  <div className="text-[10px] text-[#6B2DB5]/70 font-sans">{selected.spaces === 1 ? "espacio" : "espacios"}</div>
                </div>
                <div className="bg-[#F7F6F3] rounded-xl p-3 text-center">
                  <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ${STATUS_STYLE[selected.status]}`}>
                    {STATUS_LABEL[selected.status]}
                  </span>
                </div>
              </div>

              <div className="text-sm text-[#666] font-sans space-y-1.5">
                <div className="flex justify-between">
                  <span>Donante desde</span>
                  <span className="font-medium text-[#1A1A1A]">{formatDate(selected.since)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Último pago</span>
                  <span className="font-medium text-[#1A1A1A]">{selected.lastPayment ? formatDate(selected.lastPayment) : "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>ID suscripción MP</span>
                  <span className="font-mono text-xs text-[#999]">{selected.mpSubscriptionId || "—"}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#6B2DB5] text-white text-sm font-sans font-medium py-2.5 rounded-full hover:opacity-90 transition-opacity">
                  <Mail size={14} />
                  Enviar email
                </button>
                {selected.status === "activo" && (
                  <button className="flex items-center justify-center gap-2 border border-[#E8E4E0] text-[#666] text-sm font-sans px-4 py-2.5 rounded-full hover:border-amber-400 hover:text-amber-700 transition-colors">
                    <Pause size={14} />
                    Pausar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
