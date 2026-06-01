"use client";

import { useState } from "react";
import { MOCK_TRANSFERS, TransferDonation, TransferStatus } from "@/lib/mock-data";
import { CheckCircle, XCircle, Clock, Copy, Check } from "lucide-react";

const STATUS_LABELS: Record<TransferStatus, string> = {
  pendiente: "Pendiente",
  validada: "Validada",
  rechazada: "Rechazada",
};

const STATUS_STYLES: Record<TransferStatus, string> = {
  pendiente: "bg-amber-50 text-amber-700 border-amber-200",
  validada:  "bg-green-50 text-green-700 border-green-200",
  rechazada: "bg-red-50 text-red-700 border-red-200",
};

function fmt(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

type FilterTab = "todas" | TransferStatus;

export default function TransferenciasPage() {
  const [transfers, setTransfers] = useState<TransferDonation[]>(MOCK_TRANSFERS);
  const [filter, setFilter] = useState<FilterTab>("todas");
  const [noteInput, setNoteInput] = useState<Record<string, string>>({});

  const filtered = filter === "todas" ? transfers : transfers.filter(t => t.status === filter);

  const pendingCount = transfers.filter(t => t.status === "pendiente").length;

  const updateStatus = (id: string, status: TransferStatus) => {
    setTransfers(prev =>
      prev.map(t => t.id === id ? { ...t, status, note: noteInput[id] || t.note } : t)
    );
  };

  const tabs: { key: FilterTab; label: string; count?: number }[] = [
    { key: "todas",     label: "Todas",      count: transfers.length },
    { key: "pendiente", label: "Pendientes", count: pendingCount },
    { key: "validada",  label: "Validadas" },
    { key: "rechazada", label: "Rechazadas" },
  ];

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl text-[#3D3D3D] font-bold">Donaciones vía transferencia</h1>
        <p className="text-[#3D3D3D]/50 font-sans text-sm mt-1">
          Donantes que avisaron su transferencia — valida o rechaza cada una
        </p>
      </div>

      {/* Alert pendientes */}
      {pendingCount > 0 && (
        <div className="mb-5 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <Clock size={16} className="text-amber-600 shrink-0" />
          <span className="text-amber-700 font-sans text-sm font-medium">
            {pendingCount} transferencia{pendingCount !== 1 ? "s" : ""} pendiente{pendingCount !== 1 ? "s" : ""} de validar
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-white border border-[#3D3D3D]/10 rounded-xl p-1 w-fit">
        {tabs.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-sans font-medium transition-all ${
              filter === key
                ? "bg-[#6B2DB5] text-white"
                : "text-[#3D3D3D]/50 hover:text-[#3D3D3D]"
            }`}
          >
            {label}
            {count !== undefined && (
              <span className={`ml-1.5 text-xs ${filter === key ? "opacity-70" : "opacity-50"}`}>
                ({count})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#3D3D3D]/30 font-sans text-sm">
            No hay transferencias en esta categoría
          </div>
        )}

        {filtered.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-[#3D3D3D]/8 p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              {/* Info donante */}
              <div>
                <div className="font-sans font-semibold text-[#3D3D3D]">{t.name}</div>
                <div className="text-[#3D3D3D]/50 text-sm font-sans">{t.email}</div>
                <div className="text-[#3D3D3D]/40 text-xs font-sans mt-0.5">{formatDate(t.notifiedAt)}</div>
              </div>

              {/* Monto + badge */}
              <div className="text-right shrink-0">
                <div className="font-heading font-bold text-xl text-[#C8197A]">{fmt(t.amount)}</div>
                <div className="text-[#3D3D3D]/40 text-xs font-sans">
                  {t.seats} espacio{t.seats !== 1 ? "s" : ""} · {t.frequency === "monthly" ? "mensual" : "única vez"}
                </div>
                <span className={`inline-block mt-1 text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLES[t.status]}`}>
                  {STATUS_LABELS[t.status]}
                </span>
              </div>
            </div>

            {/* Nota (si existe) */}
            {t.note && (
              <div className="mb-3 text-xs text-[#3D3D3D]/50 font-sans bg-[#F7F6F3] rounded-lg px-3 py-2">
                Nota: {t.note}
              </div>
            )}

            {/* Acciones solo si está pendiente */}
            {t.status === "pendiente" && (
              <div className="flex flex-col gap-2 pt-3 border-t border-[#3D3D3D]/8">
                <input
                  type="text"
                  placeholder="Nota opcional (ej: monto no coincide)"
                  value={noteInput[t.id] || ""}
                  onChange={(e) => setNoteInput(prev => ({ ...prev, [t.id]: e.target.value }))}
                  className="w-full border border-[#3D3D3D]/15 rounded-lg px-3 py-2 text-sm font-sans text-[#3D3D3D] placeholder:text-[#3D3D3D]/30 focus:outline-none focus:border-[#6B2DB5] bg-[#F7F6F3]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(t.id, "validada")}
                    className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white font-sans font-medium text-sm px-4 py-2 rounded-xl transition-colors"
                  >
                    <CheckCircle size={14} /> Validar
                  </button>
                  <button
                    onClick={() => updateStatus(t.id, "rechazada")}
                    className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-sans font-medium text-sm px-4 py-2 rounded-xl transition-colors"
                  >
                    <XCircle size={14} /> Rechazar
                  </button>
                </div>
              </div>
            )}

            {/* Acciones para revertir si está validada o rechazada */}
            {t.status !== "pendiente" && (
              <div className="pt-3 border-t border-[#3D3D3D]/8">
                <button
                  onClick={() => updateStatus(t.id, "pendiente")}
                  className="text-xs text-[#3D3D3D]/40 hover:text-[#3D3D3D]/70 font-sans underline transition-colors"
                >
                  Volver a pendiente
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
