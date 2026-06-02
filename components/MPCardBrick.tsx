"use client";

import { useEffect, useState } from "react";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import { AlertCircle, Lock } from "lucide-react";

const MP_PUBLIC_KEY = "TEST-4369a527-cb76-41aa-9450-110f03b83319";

interface Props {
  amount: number;
  email: string;
  name: string;
  onSuccess: () => void;
  onPayError: (msg: string) => void;
}

/* ─── Skeleton que imita el formulario de MP ─── */
function MPSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-[#009EE3]/20 bg-white overflow-hidden animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#009EE3]/10 bg-[#F5FAFF]">
        <div className="flex items-center gap-2.5">
          <div className="h-3.5 w-28 bg-[#009EE3]/20 rounded-full" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-5 rounded bg-[#1A1F71]/20" />
          <div className="w-8 h-5 rounded bg-[#EB001B]/20" />
          <div className="w-8 h-5 rounded bg-[#009EE3]/20" />
        </div>
      </div>

      {/* Fields */}
      <div className="px-5 py-5 space-y-4">
        {/* Card number */}
        <div>
          <div className="h-3 w-28 bg-gray-200 rounded-full mb-2" />
          <div className="h-11 w-full bg-gray-100 rounded-lg" />
        </div>
        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="h-3 w-20 bg-gray-200 rounded-full mb-2" />
            <div className="h-11 w-full bg-gray-100 rounded-lg" />
          </div>
          <div>
            <div className="h-3 w-20 bg-gray-200 rounded-full mb-2" />
            <div className="h-11 w-full bg-gray-100 rounded-lg" />
          </div>
        </div>
        {/* Name */}
        <div>
          <div className="h-3 w-36 bg-gray-200 rounded-full mb-2" />
          <div className="h-11 w-full bg-gray-100 rounded-lg" />
        </div>
        {/* Document */}
        <div>
          <div className="h-3 w-24 bg-gray-200 rounded-full mb-2" />
          <div className="h-11 w-full bg-gray-100 rounded-lg" />
        </div>
        {/* Button */}
        <div className="h-11 w-full bg-[#009EE3]/30 rounded-xl" />
      </div>

      {/* Loading label */}
      <div className="px-5 pb-4 flex items-center justify-center gap-2">
        <svg className="w-3.5 h-3.5 text-[#009EE3] animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <span className="text-[#009EE3]/70 text-xs font-sans">Cargando Mercado Pago…</span>
        <Lock size={11} className="text-[#009EE3]/40" />
      </div>
    </div>
  );
}

export default function MPCardBrick({ amount, email, name, onSuccess, onPayError }: Props) {
  const [initialized, setInitialized] = useState(false);
  const [brickReady, setBrickReady] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago(MP_PUBLIC_KEY, { locale: "es-CL" });
    setInitialized(true);
  }, []);

  if (!initialized) return <MPSkeleton />;

  return (
    <div className="w-full">
      {/* Skeleton visible hasta que el brick esté listo */}
      {!brickReady && <MPSkeleton />}

      {paying && (
        <div className="mb-3 flex items-center gap-2 bg-[#009EE3]/10 border border-[#009EE3]/20 text-[#007BBF] rounded-xl px-4 py-3 text-sm font-sans">
          <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Procesando tu pago…
        </div>
      )}

      {error && (
        <div className="mb-3 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-sans">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {/* El brick se renderiza siempre pero se oculta hasta estar listo */}
      <div className={brickReady ? "block" : "hidden"}>
        <CardPayment
          initialization={{ amount, payer: { email } }}
          customization={{
            visual: { style: { theme: "default" } },
          }}
          onSubmit={async (data) => {
            if (!name.trim() || !email.trim()) {
              setError("Por favor completa tu nombre y correo antes de pagar.");
              return;
            }
            setPaying(true);
            setError(null);
            try {
              const res = await fetch("/api/pagar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, amount, email, name }),
              });
              const result = await res.json();
              if (result.status === "approved") {
                onSuccess();
              } else {
                setError("Pago rechazado. Verifica los datos de tu tarjeta e intenta de nuevo.");
              }
            } catch {
              setError("Error al procesar el pago. Intenta de nuevo.");
            } finally {
              setPaying(false);
            }
          }}
          onReady={() => setBrickReady(true)}
          onError={() => {
            setBrickReady(true); // muestra el brick aunque sea con error
            setError("Error en el formulario de pago. Recarga la página.");
          }}
        />
      </div>
    </div>
  );
}
