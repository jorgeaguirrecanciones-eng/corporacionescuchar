"use client";

import { useState } from "react";
import { Shuffle, Send, CheckCircle2, ChevronRight, Eye, X } from "lucide-react";
import {
  DONORS, PARTICIPANTS, MATCHES,
  Donor, Participant, MonthlyMatch,
  getDonorById, getParticipantById,
  formatCLP, formatPeriod,
} from "@/lib/mock-data";

type MatchMap = Record<string, string[]>; // donorId -> participantIds

function autoAssign(donors: Donor[], participants: Participant[]): MatchMap {
  const result: MatchMap = {};
  let idx = 0;
  for (const donor of donors) {
    result[donor.id] = [];
    for (let i = 0; i < donor.spaces && idx < participants.length; i++, idx++) {
      result[donor.id].push(participants[idx].id);
    }
  }
  return result;
}

const PERIODS = ["2026-05", "2026-04", "2026-03"];

export default function MatchingPage() {
  const [period, setPeriod] = useState("2026-05");
  const [matchMap, setMatchMap] = useState<MatchMap | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [preview, setPreview] = useState<{ donor: Donor; participants: Participant[] } | null>(null);

  const donors = DONORS.filter(d => d.status === "activo");
  const participants = PARTICIPANTS.filter(p => p.period === period);
  const existingMatches = MATCHES.filter(m => m.period === period);
  const alreadySent = existingMatches.length > 0 && existingMatches.every(m => m.emailSent);

  const handleAutoAssign = () => {
    setMatchMap(autoAssign(donors, participants));
    setSent(false);
  };

  const handleSend = async () => {
    setSending(true);
    await new Promise(r => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
  };

  const totalMatched = matchMap
    ? Object.values(matchMap).reduce((s, arr) => s + arr.length, 0)
    : 0;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl md:text-3xl text-[#1A1A1A] mb-1">Matching mensual</h1>
        <p className="text-[#666] font-sans text-sm">
          Asigna participantes a donantes y envía el email de cierre de mes
        </p>
      </div>

      {/* Period selector */}
      <div className="flex gap-2 flex-wrap mb-6">
        {PERIODS.map(p => {
          const done = MATCHES.filter(m => m.period === p && m.emailSent).length > 0;
          const isCurrent = p === "2026-05";
          return (
            <button
              key={p}
              onClick={() => { setPeriod(p); setMatchMap(null); setSent(false); }}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-sans font-medium transition-all shadow-sm
                ${period === p ? "bg-[#18122B] text-white" : "bg-white text-[#666] hover:text-[#1A1A1A]"}
              `}
            >
              {formatPeriod(p)}
              {isCurrent && period !== p && (
                <span className="text-[10px] bg-[#C8197A]/20 text-[#C8197A] px-1.5 py-0.5 rounded-full font-sans">pendiente</span>
              )}
              {done && (
                <CheckCircle2 size={13} className="text-[#1CBF45]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Status bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="font-heading font-bold text-2xl text-[#6B2DB5]">{donors.length}</div>
          <div className="text-xs text-[#999] font-sans">donantes activos</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="font-heading font-bold text-2xl text-[#C8197A]">{participants.length}</div>
          <div className="text-xs text-[#999] font-sans">inscritos {formatPeriod(period)}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="font-heading font-bold text-2xl text-[#1CBF45]">
            {donors.reduce((s, d) => s + d.spaces, 0)}
          </div>
          <div className="text-xs text-[#999] font-sans">espacios disponibles</div>
        </div>
      </div>

      {/* Already sent state */}
      {alreadySent && !matchMap && (
        <div className="bg-[#1CBF45]/10 border border-[#1CBF45]/30 rounded-2xl p-5 mb-5 flex items-start gap-4">
          <CheckCircle2 size={22} className="text-[#1CBF45] shrink-0 mt-0.5" />
          <div>
            <div className="font-sans font-semibold text-[#0e7a2b] mb-1">
              Emails enviados para {formatPeriod(period)}
            </div>
            <div className="text-sm text-[#0e7a2b]/70 font-sans">
              {existingMatches.length} donantes contactados el{" "}
              {existingMatches[0]?.emailSentAt
                ? new Date(existingMatches[0].emailSentAt).toLocaleDateString("es-CL", { day: "numeric", month: "long" })
                : ""}
            </div>
          </div>
        </div>
      )}

      {/* Action */}
      {!sent && (
        <div className="mb-5">
          <button
            onClick={handleAutoAssign}
            className="flex items-center gap-2 bg-[#18122B] text-white text-sm font-sans font-semibold px-6 py-3 rounded-full hover:bg-[#2A1F45] transition-colors shadow-sm"
          >
            <Shuffle size={16} />
            {matchMap ? "Re-asignar automáticamente" : "Auto-asignar participantes"}
          </button>
          {!matchMap && (
            <p className="text-[#999] text-xs font-sans mt-2">
              Distribuye los {participants.length} inscritos entre los {donors.length} donantes según sus espacios
            </p>
          )}
        </div>
      )}

      {/* Assignment result */}
      {matchMap && !sent && (
        <>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
            <div className="px-5 py-4 border-b border-[#F0EDEA] flex items-center justify-between">
              <h2 className="font-sans font-semibold text-sm text-[#1A1A1A]">
                Asignación para {formatPeriod(period)}
              </h2>
              <span className="text-[11px] text-[#999] font-sans">
                {totalMatched}/{participants.length} inscritos asignados
              </span>
            </div>
            <div className="divide-y divide-[#F7F6F3]">
              {donors.map(donor => {
                const assignedIds = matchMap[donor.id] || [];
                const assignedParticipants = assignedIds
                  .map(id => PARTICIPANTS.find(p => p.id === id))
                  .filter(Boolean) as Participant[];
                return (
                  <div key={donor.id} className="px-5 py-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#6B2DB5]/15 flex items-center justify-center font-heading font-bold text-[#6B2DB5] shrink-0">
                        {donor.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-sans font-medium text-sm text-[#1A1A1A]">{donor.name}</div>
                        <div className="text-[11px] text-[#999] font-sans">
                          {formatCLP(donor.amount)}/mes · {donor.spaces} {donor.spaces === 1 ? "espacio" : "espacios"}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      {assignedParticipants.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {assignedParticipants.map(p => (
                            <span key={p.id} className="text-[11px] bg-[#F5EFE6] text-[#555] font-sans px-2.5 py-1 rounded-full">
                              {p.name.split(" ")[0]}, {p.age} años
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#CCC] font-sans italic">Sin asignar</span>
                      )}
                    </div>

                    <button
                      onClick={() => setPreview({ donor, participants: assignedParticipants })}
                      className="flex items-center gap-1.5 text-[#6B2DB5] text-xs font-sans hover:underline shrink-0"
                    >
                      <Eye size={13} />
                      Preview email
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Send button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSend}
              disabled={sending}
              className={`
                flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-sans font-semibold text-sm transition-all
                ${sending ? "bg-[#C8197A]/60 cursor-not-allowed" : "bg-[#C8197A] hover:opacity-90 shadow-md"}
              `}
            >
              {sending ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Enviando {donors.length} emails…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Enviar todos los emails ({donors.length})
                </>
              )}
            </button>
            <p className="text-xs text-[#999] font-sans">
              Cada donante recibirá los nombres de las personas que escuchó este mes
            </p>
          </div>
        </>
      )}

      {/* Sent success */}
      {sent && (
        <div className="bg-[#1CBF45]/10 border border-[#1CBF45]/40 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-[#1CBF45]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-[#1CBF45]" />
          </div>
          <h2 className="font-heading text-xl text-[#0e7a2b] mb-2">
            {donors.length} emails enviados con éxito
          </h2>
          <p className="text-[#0e7a2b]/70 font-sans text-sm">
            Cada donante sabe ahora a quién escuchó durante {formatPeriod(period)}
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {donors.map(d => (
              <span key={d.id} className="flex items-center gap-1.5 text-[11px] bg-white rounded-full px-3 py-1.5 text-[#1CBF45] font-sans shadow-sm">
                <CheckCircle2 size={11} />
                {d.name.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Email preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Email header */}
            <div className="bg-[#F7F6F3] px-6 py-4 border-b border-[#E8E4E0] flex items-start justify-between">
              <div>
                <div className="text-[11px] text-[#999] font-sans mb-0.5">Para: {preview.donor.email}</div>
                <div className="font-sans font-semibold text-sm text-[#1A1A1A]">
                  {preview.donor.name.split(" ")[0]}, este mes escuchaste a{" "}
                  {preview.participants.length}{" "}
                  {preview.participants.length === 1 ? "persona" : "personas"}
                </div>
              </div>
              <button onClick={() => setPreview(null)} className="text-[#999] hover:text-[#333] ml-4">
                <X size={18} />
              </button>
            </div>

            {/* Email body */}
            <div className="p-6 font-sans">
              <div className="text-sm text-[#333] leading-relaxed space-y-4">
                <p>Hola <strong>{preview.donor.name.split(" ")[0]}</strong>,</p>

                <p>
                  Gracias a tu aporte de <strong>{formatCLP(preview.donor.amount)}</strong> este mes,{" "}
                  {preview.participants.length}{" "}
                  {preview.participants.length === 1 ? "persona encontró" : "personas encontraron"}{" "}
                  un espacio donde ser {preview.participants.length === 1 ? "escuchada" : "escuchadas"} de verdad.
                </p>

                {preview.participants.length > 0 && (
                  <div>
                    <p className="text-[#999] text-xs uppercase tracking-widest mb-3">
                      {preview.participants.length === 1 ? "Esta mes escuchaste a:" : "Este mes escuchaste a:"}
                    </p>
                    <div className="space-y-2">
                      {preview.participants.map(p => (
                        <div key={p.id} className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#6B2DB5]/15 flex items-center justify-center font-heading font-bold text-[#6B2DB5] text-xs shrink-0">
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-[#1A1A1A] text-sm">
                              {p.name.split(" ")[0]}, {p.age} años
                            </div>
                            <div className="text-[11px] text-[#999]">{p.circle}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-[#666]">
                  Escucharnos es urgente. Gracias a ti, esta semana alguien no tuvo que cargar solo con lo suyo.
                </p>

                <p className="text-[#999] text-xs border-t border-[#F0EDEA] pt-4">
                  Corporación Escuchar · corporacionescuchar.cl
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
