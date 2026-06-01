/**
 * Cloudflare Pages _worker.js
 * Maneja /api/pagar con el Access Token de Mercado Pago (server-side).
 * Para todo lo demás, sirve los archivos estáticos del sitio.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // API de pago
    if (url.pathname === "/api/pagar" && request.method === "POST") {
      return handlePayment(request, env);
    }

    // Todo lo demás → archivos estáticos del sitio
    return env.ASSETS.fetch(request);
  },
};

async function handlePayment(request, env) {
  try {
    const body = await request.json();
    const { token, payment_method_id, installments, issuer_id, amount, email, name } = body;

    if (!token || !amount || !email) {
      return json({ error: "Faltan datos requeridos" }, 400);
    }

    const paymentData = {
      transaction_amount: Number(amount),
      token,
      description: "Donación Corporación Escuchar",
      installments: Number(installments) || 1,
      payment_method_id,
      issuer_id,
      payer: {
        email,
        first_name: name ? name.split(" ")[0] : "",
        last_name: name ? name.split(" ").slice(1).join(" ") : "",
      },
    };

    const mpRes = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.MP_ACCESS_TOKEN}`,
        "X-Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify(paymentData),
    });

    const result = await mpRes.json();

    if (!mpRes.ok) {
      return json({ error: result.message || "Pago rechazado", cause: result.cause }, mpRes.status);
    }

    return json({ status: result.status, status_detail: result.status_detail, id: result.id });
  } catch {
    return json({ error: "Error interno del servidor" }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
