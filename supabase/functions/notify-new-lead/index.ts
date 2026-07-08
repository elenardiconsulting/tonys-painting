import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const lead = payload.record ?? {};

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Website (default) message — UNCHANGED.
    const defaultBody =
      (lead.name || "Someone") +
      " is interested in " +
      (lead.service_type || "your services") +
      ".";

    await fetch(supabaseUrl + "/functions/v1/send-push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + serviceKey,
      },
      body: JSON.stringify({
        title: "New Lead Received",
        body: defaultBody,
        // Extra context so send-push can branch on source for NFC.
        source: lead.source ?? null,
        source_type: lead.source_type ?? null,
        project_type: lead.project_type ?? null,
        photo_count: lead.photo_count ?? 0,
        city: lead.city ?? null,
        state: lead.state ?? null,
        name: lead.name ?? null,
      }),
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
