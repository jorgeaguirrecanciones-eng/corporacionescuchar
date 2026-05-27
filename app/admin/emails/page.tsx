"use client";

import { useState } from "react";
import { Search, CheckCircle2, Mail, AlertCircle, MailOpen } from "lucide-react";
import { EMAIL_LOG, EmailLog, formatDate, formatPeriod } from "@/lib/mock-data";

type StatusFilter = "todos" | "enviado" | "abierto" | "rebotado";

const STATUS_ICONS = {
  enviado:  <Mail size={13} className="text-[#6B2DB5]" />,
  abierto:  <MailOpen size={13} className="text-[#1CBF45]" />,
  rebotado: <AlertCircle size={13} className="text-red-500" />,
};

const STATUS_BADGE: Record<EmailLog["status"], string> = {
  enviado:  "bg-[#6B2DB5]/10 text-[#6B2DB5]",
  abierto:  "bg-[#1CBF45]/15 text-[#0e7a2b]",
  rebotado: "bg-red-100 text-red-700",
};

const STATUS_LABEL = {
  enviado:  "Enviado",
  abierto:  "Abierto",
  rebotado: "Rebotado",
};

export default function EmailsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [search, setSearch] = useState("");
  const [periodFilter, setPeriodFilter] = useState("todos");

  const periods = Array.from(new Set(EMAIL_LOG.map(e => e.period))).sort((a, b) => b.localeCompare(a));

  const filtered = EMAIL_LOG
    .filter(e => statusFilter === "todos" || e.status === statusFilter)
    .filter(e => periodFilter === "todos" || e.period === periodFilter)
    .filter(e =>
      search === "" ||
      e.donorName.toLowerCase().includes(search.toLowerCase()) ||
      e.donorEmail.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());

  const counts = {
    todos:    EMAIL_LOG.length,
    enviado:  EMAIL_LOG.filter(e => e.status === "enviado").length,
    abierto:  EMAIL_LOG.filter(e => e.status === "abierto").length,
    rebotado: EMAIL_LOG.filter(e => e.status === "rebotado").length,
  };

  const openRate = Math.round((counts.abierto / EMAIL_LOG.length) * 100);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl text-[#1A1A1A] mb-1">Emails</h1>
          <p className="text-[#666] font-sans text-sm">Registro de todos los envíos del matching mensual</p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="font-heading font-bold text-2xl text-[#1A1A1A]">{EMAIL_LOG.length}</div>
          <div className="text-xs text-[#999] font-sans">total enviados</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="font-heading font-bold text-2xl text-[#1CBF45]">{counts.abierto}</div>
          <div className="text-xs text-[#999] font-sans">abiertos</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="font-heading font-bold text-2xl text-[#6B2DB5]">{openRate}%</div>
          <div className="text-xs text-[#999] font-sans">tasa apertura</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="font-heading font-bold text-2xl text-red-500">{counts.rebotado}</div>
          <div className="text-xs text-[#999] font-sans">rebotados</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Status tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm">
          {(["todos","enviado","abierto","rebotado"] as StatusFilter[]).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-sans font-medium transition-all
                ${statusFilter === s ? "bg-[#18122B] text-white" : "text-[#666] hover:text-[#1A1A1A]"}
              `}
            >
              {s !== "todos" && STATUS_ICONS[s as Exclude<StatusFilter, "todos">]}
              {s.charAt(0).toUpperCase() + s.slice(1)}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusFilter === s ? "bg-white/20 text-white/80" : "bg-[#F0EDEA] text-[#888]"}`}>
                {counts[s]}
              </span>
            </button>
          ))}
        </div>

        {/* Period selector */}
        <select
          value={periodFilter}
          onChange={e => setPeriodFilter(e.target.value)}
          className="bg-white border border-[#E8E4E0] rounded-xl px-4 py-2 text-sm font-sans text-[#666] focus:outline-none focus:border-[#6B2DB5] shadow-sm"
        >
          <option value="todos">Todos los períodos</option>
          {periods.map(p => (
            <option key={p} value={p}>{formatPeriod(p)}</option>
          ))}
        </select>

        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#AAA]" />
          <input
            type="text"
            placeholder="Buscar donante..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E8E4E0] rounded-xl text-sm font-sans focus:outline-none focus:border-[#6B2DB5] shadow-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-[#F0EDEA]">
                <th className="text-left px-5 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest">Donante</th>
                <th className="text-left px-4 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest hidden md:table-cell">Asunto</th>
                <th className="text-left px-4 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest">Período</th>
                <th className="text-left px-4 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest">Estado</th>
                <th className="text-left px-4 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest hidden lg:table-cell">Enviado</th>
                <th className="text-left px-4 py-3.5 text-[#999] font-medium text-[11px] uppercase tracking-widest hidden lg:table-cell">Abierto</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#999] font-sans">No hay emails para este filtro</td>
                </tr>
              )}
              {filtered.map((email, i) => (
                <tr key={email.id} className={`border-b border-[#F7F6F3] hover:bg-[#FAFAF8] transition-colors ${i % 2 === 0 ? "" : "bg-[#FDFDFC]"}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F5EFE6] flex items-center justify-center font-heading font-bold text-sm text-[#6B2DB5] shrink-0">
                        {email.donorName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-[#1A1A1A]">{email.donorName}</div>
                        <div className="text-[11px] text-[#999]">{email.donorEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#555] hidden md:table-cell max-w-[200px] truncate">
                    {email.subject}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[11px] bg-[#F7F6F3] text-[#666] font-sans px-2.5 py-1 rounded-full">
                      {formatPeriod(email.period)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`flex items-center gap-1.5 w-fit text-[11px] font-medium px-2.5 py-1 rounded-full ${STATUS_BADGE[email.status]}`}>
                      {STATUS_ICONS[email.status]}
                      {STATUS_LABEL[email.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[#777] text-xs hidden lg:table-cell">
                    {formatDate(email.sentAt)}
                  </td>
                  <td className="px-4 py-3.5 text-[#777] text-xs hidden lg:table-cell">
                    {email.openedAt ? formatDate(email.openedAt) : <span className="text-[#CCC]">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
