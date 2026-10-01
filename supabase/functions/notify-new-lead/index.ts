// v6 - push + e-mail para cada lead novo
// Chamada automaticamente pelo banco quando um lead entra na tabela "leads"
// (qualquer formulário do site: contato, hero e landing pages).
// 1) Notificação push (send-push), como antes.
// 2) E-mail com os dados do lead via Resend (precisa do secret RESEND_API_KEY).
//    Uma falha no e-mail nunca impede o push, e vice-versa.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LEAD_EMAIL_TO = (Deno.env.get("LEAD_EMAIL_TO") ?? "tonyspainting11@gmail.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);
const LEAD_EMAIL_FROM = Deno.env.get("LEAD_EMAIL_FROM") ?? "Tony's Website <leads@tonyspaintingmv.com>";
const DASHBOARD_URL = "https://tonyspaintingmv.com/dashboard";

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendPush(lead: Record<string, unknown>, supabaseUrl: string, serviceKey: string) {
  const body = (lead.name || "Someone") + " is interested in " + (lead.service_type || "your services") + ".";
  const response = await fetch(supabaseUrl + "/functions/v1/send-push", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + serviceKey },
    body: JSON.stringify({ title: "New Lead Received", body, source: lead.source ?? null, name: lead.name ?? null }),
  });
  return await response.json();
}

async function sendEmail(lead: Record<string, unknown>) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return { skipped: "RESEND_API_KEY não configurada" };

  const rows: [string, unknown][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Service", lead.service_type ?? lead.project_type],
    ["City", [lead.city, lead.state].filter(Boolean).join(", ")],
    ["Timeline", lead.timeline],
    ["Budget", lead.budget_range],
    ["Prefers phone call", lead.prefer_phone === true ? "Yes" : lead.prefer_phone === false ? "No" : ""],
    ["Source", lead.source],
    ["Campaign", lead.campaign_name],
  ];
  const table = rows
    .filter(([, v]) => v !== null && v !== undefined && String(v).trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;color:#111"><b>${esc(v)}</b></td></tr>`,
    )
    .join("");
  const message = lead.message
    ? `<p style="margin:16px 0 4px;color:#666">Message</p><p style="margin:0;white-space:pre-wrap;color:#111">${esc(lead.message)}</p>`
    : "";
  const phoneLink = lead.phone
    ? `<a href="tel:${esc(String(lead.phone).replace(/[^\d+]/g, ""))}" style="display:inline-block;margin-right:8px;padding:10px 16px;background:#C4291C;color:#fff;text-decoration:none;border-radius:6px">Call ${esc(lead.name || "lead")}</a>`
    : "";

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px">
  <h2 style="margin:0 0 4px;color:#111">New lead from the website</h2>
  <p style="margin:0 0 16px;color:#666">${esc(lead.name || "Someone")} is interested in ${esc(lead.service_type || "your services")}.</p>
  <table style="border-collapse:collapse;font-size:15px">${table}</table>
  ${message}
  <p style="margin:24px 0 0">${phoneLink}<a href="${DASHBOARD_URL}" style="display:inline-block;padding:10px 16px;background:#111;color:#fff;text-decoration:none;border-radius:6px">Open in dashboard</a></p>
</div>`;

  const text = rows
    .filter(([, v]) => v !== null && v !== undefined && String(v).trim() !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n") + (lead.message ? `\n\nMessage:\n${lead.message}` : "") + `\n\nDashboard: ${DASHBOARD_URL}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
    body: JSON.stringify({
      from: LEAD_EMAIL_FROM,
      to: LEAD_EMAIL_TO,
      reply_to: lead.email ? String(lead.email) : undefined,
      subject: `New lead: ${lead.name || "Website"} - ${lead.service_type || "Website form"}`,
      html,
      text,
    }),
  });
  return await res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const lead = payload.record ?? {};

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const [push, email] = await Promise.allSettled([sendPush(lead, supabaseUrl, serviceKey), sendEmail(lead)]);
    const result = {
      push: push.status === "fulfilled" ? push.value : { error: String(push.reason) },
      email: email.status === "fulfilled" ? email.value : { error: String(email.reason) },
    };
    console.log("notify-new-lead", JSON.stringify(result));

    return new Response(JSON.stringify({ ok: true, result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
