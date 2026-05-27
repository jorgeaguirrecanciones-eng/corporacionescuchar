"use client";

import { useState } from "react";
import { Search, Monitor, MapPin } from "lucide-react";
import { PARTICIPANTS, Participant, formatDate } from "@/lib/mock-data";

type PeriodFilter = "2026-05" | "2026-04";

const PERIOD_LABELS: Record<string, string> = {
  "2026-05": "Mayo 2026",
  "2026-04": "Abril 2026",
};

const CIRCLE_COLORS: Record<string, string> = {
  "Círculo Online — Lunes 19:30":         "bg-[#6B2DB5]/10 text-[#6B2DB5]",
  "Círculo Presencial — Santiago Centro":  "bg-[#1CBF45]/15 text-[#0e7a2b]",
  "Círculo Presencial — Ñuñoa":            "bg-[#C8197A]/10 text-[#C8197A]",
};

export default function InscritosPage() {
  const [period, setPeriod] = useState<PeriodFilter>("2026-05");
  const [search, setSearch] = useState("");
  const [circleFilter, setCircleFilter] = useState("todos");

  const participants = PARTICIPANTS.filter(p => p.period === period);

  const circles = Array.from(new Set(participants.map(p => p.circle)));

  const filtered = participants
    .filter(p => circleFilter === "todos" || p.circle === circleFilter)
    .filter(p =>
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    );

  const onlineCount = participants.filter(p => p.circleType === "online").length;
  const presencialCount = participants.filter(p => p.circleType === "presencial").length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl text-[#1A1A1A] mb-1">Inscritos</h1>
          <p className="text-[#666] font-sans text-sm">
            Personas que participaron en círculos este mes
          </p>
        </div>
      </div>

      {/* Period selector + mini stats */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm">
          {(Object.keys(PERIOD_LABELS) as PeriodFilter[]).map(p => (
            <button
              key={p}
              onClick={() => { setPeriod(p); setCircleFilter("todos"); setSearch(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all ${
                period === p ? "bg-[#18122B] text-white shadow-sm" : "text-[#666] hover:text-[#1A1A1A]"
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm">
            <Monitor size={14} className="text-[#6B2DB5]" />
            <span className="text-sm font-sans font-semibold text-[#1A1A1A]">{onlineCount}</span>
            <span className="text-xs text-[#999] font-sans">online</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm">
            <MapPin size={14} className="text-[#1CBF45]" />
            <span className="text-sm font-sans font-semibold text-[#1A1A1A]">{presencialCount}</span>
            <span className="text-xs text-[#999] font-sans">presencial</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1CBF45]/10 rounded-xl px-4 py-2">
            <span className="text-sm font-sans font-bold text-[#0e7a2b]">{participants.length}</span>
            <span className="text-xs text-[#0e7a2b]/70 font-sans">total</span>
          </div>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#AAA]" />
          <input
            type="text"
            placeholder="Buscar inscrito..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8E4E0] rounded-xl text-sm font-sans focus:outline-none focus:border-[#6B2DB5] shadow-sm"
          />
        </div>
        <select
          value={circleFilter}
          onChange={e => setCircleFilter(e.target.value)}
          className="bg-white border border-[#E8E4E0] rounded-xl px-4 py-2.5 text-sm font-sans text-[#666] focus:outline-none focus:border-[#6B2DB5] shadow-sm"
        >
          <option value="todos">Todos los círculos</option>
          {circles.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Cards by circle */}
      {circleFilter === "todos" ? (
        <div className="space-y-5">
          {circles.map(circle => {
            const inCircle = filtered.filter(p => p.circle === circle);
            if (inCircle.length === 0) return null;
            return (
              <div key={circle} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F0EDEA]">
                  {circle.includes("Online") ? (
                    <Monitor size={15} className="text-[#6B2DB5]" />
                  ) : (
                    <MapPin size={15} className="text-[#1CBF45]" />
                  )}
                  <h3 className="font-sans font-semibold text-sm text-[#1A1A1A]">{circle}</h3>
                  <span className={`ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full ${CIRCLE_COLORS[circle] || "bg-gray-100 text-gray-600"}`}>
                    {inCircle.length} {inCircle.length === 1 ? "persona" : "personas"}
                  </span>
                </div>
                <div className="divide-y divide-[#F7F6F3]">
                  {inCircle.map(p => (
                    <ParticipantRow key={p.id} p={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-[#F7F6F3]">
            {filtered.map(p => (
              <ParticipantRow key={p.id} p={p} />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#999] font-sans">
          No hay resultados para esta búsqueda
        </div>
      )}
    </div>
  );
}

function ParticipantRow({ p }: { p: Participant }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 hover:bg-[#FAFAF8] transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#F5EFE6] flex items-center justify-center font-heading font-bold text-sm text-[#C8197A] shrink-0">
          {p.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-sans font-medium text-[#1A1A1A]">{p.name}</div>
          <div className="text-[11px] text-[#999] font-sans">{p.email}</div>
        </div>
      </div>
      <div className="text-right hidden sm:block">
        <div className="text-[11px] text-[#999] font-sans">Inscrito el</div>
        <div className="text-xs font-sans font-medium text-[#555]">{formatDate(p.registeredAt)}</div>
      </div>
    </div>
  );
}
