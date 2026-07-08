import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @deno-types="npm:@types/web-push"
import webpush from "npm:web-push";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const TAG_TYPE_LABELS: Record<string, string> = {
  showroom_gift: "showroom",
  post_project_gift: "post-project",
  referral_keychain: "referral",
  vip_client: "VIP",
  support_keychain: "support",
  general_business_card: "business card",
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  kitchen_remodeling: "Kitchen Remodeling",
  bathroom_remodeling: "Bathroom Remodeling",
  painting: "Painting",
  siding: "Siding",
  flooring: "Flooring",
  carpentry: "Carpentry",
  deck_and_exterior: "Deck & Exterior",
  full_home_remodel: "Full Home Remodel",
  other: "Other",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const {
      title,
      body,
      source,
      source_type,
      project_type,
      photo_count,
      city,
      state,
      name,
    } = payload ?? {};

    // Branch on source. Website path is UNCHANGED.
    let notifTitle: string = title || "New Lead Received";
    let notifBody: string = body || "New lead received.";
    let notifLine2: string | undefined;

    if (source === "NFC Keychain") {
      const firstName = (name || "Someone").toString().split(" ")[0];
      const tagLabel = TAG_TYPE_LABELS[source_type as string] || "keychain";
      const projectLabel =
        PROJECT_TYPE_LABELS[project_type as string] || (project_type ?? "project");
      const photos = Number(photo_count ?? 0);
      const loc = [city, state].filter(Boolean).join(", ");

      notifTitle = "New NFC Project Lead";
      notifBody = `${firstName} uploaded ${photos} project photo${photos === 1 ? "" : "s"} from a ${tagLabel} keychain.`;
      notifLine2 = `Project: ${projectLabel}${loc ? ` · ${loc}` : ""}`;
    }

    webpush.setVapidDetails(
      Deno.env.get("VAPID_SUBJECT")!,
      Deno.env.get("VAPID_PUBLIC_KEY")!,
      Deno.env.get("VAPID_PRIVATE_KEY")!,
    );

    const { data: subscriptions } = await supabaseAdmin
      .from("push_subscriptions")
      .select("*");

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({ sent: 0, message: "No subscriptions found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { count } = await supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new')

    const pushPayload: Record<string, unknown> = {
      title: notifTitle,
      body: notifBody,
      count: count || 1,
    };
    if (notifLine2) pushPayload.line2 = notifLine2;

    const results = await Promise.allSettled(
      subscriptions.map(async (sub: { endpoint: string; p256dh: string; auth: string }) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            JSON.stringify(pushPayload),
          );
        } catch (err: unknown) {
          const e = err as { statusCode?: number };
          if (e.statusCode === 410 || e.statusCode === 404) {
            await supabaseAdmin
              .from("push_subscriptions")
              .delete()
              .eq("endpoint", sub.endpoint);
          }
          throw err;
        }
      }),
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;

    return new Response(JSON.stringify({ sent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
