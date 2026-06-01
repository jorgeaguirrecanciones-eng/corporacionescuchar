"use client";

import { useEffect, useState } from "react";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import { AlertCircle } from "lucide-react";

const MP_PUBLIC_KEY = "TEST-4369a527-cb76-41aa-9450-110f03b83319";

interface Props {
  amount: number;
  email: string;
  name: string;
  onSuccess: () => void;
  onPayError: (msg: string) => void;
}

export default function MPCardBrick({ amount, email, name, onSuccess, onPayError }: Props) {
  const [initialized, setInitialized] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago(MP_PUBLIC_KEY, { locale: "es-CL" });
    setInitialized(true);
  }, []);

  if (!initialized) {
    return (
      <div className="w-full bg-white rounded-xl border border-verde/10 px-5 py-8 flex flex-col items-center gap-3">
        <svg className="animate-spin w-6 h-6 text-[#009EE3]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <span className="text-verde/50 text-sm font-sans">Cargando formulario de pago…</span>
      </div>
    );
  }

  return (
    <div className="w-full">
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
        onReady={() => {}}
        onError={() => {
          setError("Error en el formulario de pago. Recarga la página.");
        }}
      />
    </div>
  );
}
