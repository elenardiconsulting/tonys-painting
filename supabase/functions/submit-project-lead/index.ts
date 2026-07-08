import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const VALID_TAG_TYPES = new Set([
  "showroom_gift",
  "post_project_gift",
  "referral_keychain",
  "vip_client",
  "support_keychain",
  "general_business_card",
]);

const VALID_PROJECT_TYPES = new Set([
  "kitchen_remodeling",
  "bathroom_remodeling",
  "painting",
  "siding",
  "flooring",
  "carpentry",
  "deck_and_exterior",
  "full_home_remodel",
  "other",
]);

const MAX_PHOTOS = 10;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024; // 10MB per file
const IMAGE_EXT_RE = /\.(jpe?g|png|webp|heic|heif|gif|bmp|tiff?)$/i;

// Infer a real image/* MIME when the client sends a missing/generic type
// (e.g. application/octet-stream from some browsers/HEIC sources).
const resolveImageMime = (file: File): string | null => {
  const raw = (file.type || "").toLowerCase().trim();
  if (raw && raw.startsWith("image/") && raw !== "image/octet-stream") {
    return raw;
  }
  const name = (file.name || "").toLowerCase();
  const m = name.match(IMAGE_EXT_RE);
  if (!m) return null;
  const ext = m[1];
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "heic") return "image/heic";
  if (ext === "heif") return "image/heif";
  if (ext === "gif") return "image/gif";
  if (ext === "bmp") return "image/bmp";
  if (ext === "tif" || ext === "tiff") return "image/tiff";
  return null;
};

// Naive in-memory rate limit per IP: 5 submissions / 10 min per warm instance.
const rateBucket = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

const rateLimited = (ip: string): boolean => {
  const now = Date.now();
  const arr = (rateBucket.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX) {
    rateBucket.set(ip, arr);
    return true;
  }
  arr.push(now);
  rateBucket.set(ip, arr);
  return false;
};

const clean = (v: unknown, max = 500): string | null => {
  if (typeof v !== "string") return null;
  const s = v.trim().slice(0, max);
  return s.length ? s : null;
};

const extFromMime = (mime: string): string => {
  const m = mime.toLowerCase();
  if (m.includes("jpeg") || m.includes("jpg")) return "jpg";
  if (m.includes("png")) return "png";
  if (m.includes("webp")) return "webp";
  if (m.includes("heic")) return "heic";
  if (m.includes("heif")) return "heif";
  return "bin";
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return json({ error: "Server configuration error" }, 500);
  }

  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  try {
    const form = await req.formData();

    // Honeypot: silently accept and drop.
    const hp = form.get("website");
    if (typeof hp === "string" && hp.trim().length > 0) {
      console.log("Honeypot triggered, dropping submission", { ip });
      return json({ ok: true });
    }

    if (rateLimited(ip)) {
      console.warn("Rate limited", { ip });
      return json({ error: "Too many requests. Please try again later." }, 429);
    }

    const payloadRaw = form.get("payload");
    if (typeof payloadRaw !== "string") {
      return json({ error: "Missing payload" }, 400);
    }
    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(payloadRaw);
    } catch {
      return json({ error: "Invalid payload JSON" }, 400);
    }

    const name = clean(payload.name, 120);
    const phone = clean(payload.phone, 40);
    const email = clean(payload.email, 160);
    const city = clean(payload.city, 120);
    const state = clean(payload.state, 60);
    const message = clean(payload.message, 2000);
    const timeline = clean(payload.timeline, 60);
    const budgetRange = clean(payload.budget_range, 60);
    const projectTypeRaw = clean(payload.project_type, 60);
    const tagTypeRaw = clean(payload.tag_type, 60);
    const tagCode = clean(payload.tag_code, 120);
    const sid = clean(payload.nfc_scan_id, 200);
    const campaignName = clean(payload.campaign_name, 120);

    if (!name) return json({ error: "Name is required" }, 400);
    if (!phone && !email) {
      return json({ error: "Phone or email is required" }, 400);
    }
    if (!projectTypeRaw || !VALID_PROJECT_TYPES.has(projectTypeRaw)) {
      return json({ error: "Invalid project_type" }, 400);
    }
    const tagType =
      tagTypeRaw && VALID_TAG_TYPES.has(tagTypeRaw)
        ? tagTypeRaw
        : "general_business_card";

    // Collect files.
    const files: File[] = [];
    for (const [key, value] of form.entries()) {
      if (key === "photos" && value instanceof File) files.push(value);
    }
    if (files.length > MAX_PHOTOS) {
      return json({ error: `Maximum ${MAX_PHOTOS} photos` }, 400);
    }
    for (const f of files) {
      if (f.size > MAX_PHOTO_BYTES) {
        return json({ error: `File too large: ${f.name}` }, 400);
      }
      if (f.type && !ALLOWED_MIME.test(f.type)) {
        return json({ error: `Unsupported file type: ${f.type}` }, 400);
      }
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    // Insert lead. Trigger notify_new_lead_webhook fires automatically.
    const { data: lead, error: insertErr } = await supabase
      .from("leads")
      .insert({
        name,
        phone,
        email,
        city,
        state,
        message,
        timeline,
        budget_range: budgetRange,
        project_type: projectTypeRaw,
        service_type: projectTypeRaw, // mirror so existing CRM views render
        source: "NFC Keychain",
        source_type: tagType,
        tag_code: tagCode,
        campaign_name: campaignName,
        nfc_scan_id: sid,
        created_from: "nfc",
        status: "new",
        photo_count: files.length,
      })
      .select("id")
      .single();

    if (insertErr || !lead) {
      console.error("Lead insert failed", insertErr);
      return json({ error: "Could not save lead" }, 500);
    }

    const leadId = lead.id as string;

    // Upload files to project-photos/<lead_id>/<uuid>.<ext>
    let uploadedCount = 0;
    for (const f of files) {
      const ext = extFromMime(f.type || "image/jpeg");
      const path = `${leadId}/${crypto.randomUUID()}.${ext}`;
      const buf = new Uint8Array(await f.arrayBuffer());
      const { error: upErr } = await supabase.storage
        .from("project-photos")
        .upload(path, buf, {
          contentType: f.type || "image/jpeg",
          upsert: false,
        });
      if (upErr) {
        console.error("Photo upload failed", { path, error: upErr.message });
        continue;
      }
      const { error: rowErr } = await supabase.from("project_photos").insert({
        lead_id: leadId,
        file_path: path,
        file_name: f.name?.slice(0, 200) || null,
        file_type: f.type || null,
        file_size: f.size,
      });
      if (rowErr) {
        console.error("project_photos row insert failed", rowErr.message);
        continue;
      }
      uploadedCount++;
    }

    if (uploadedCount > 0) {
      await supabase
        .from("leads")
        .update({ photo_count: uploadedCount })
        .eq("id", leadId);
    }

    // Fire-and-forget conversion ping to Elenardi (endpoint not live yet — Prompt 1 Stage 4).
    // Intentionally awaited-less and wrapped so any failure never blocks the lead.
    // try {
    //   const elenardiUrl = Deno.env.get("ELENARDI_CONVERSION_URL");
    //   if (elenardiUrl && sid) {
    //     fetch(elenardiUrl, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ sid, tag_code: tagCode, lead_id: leadId }),
    //     }).catch((e) => console.warn("Elenardi ping failed", e));
    //   }
    // } catch (_) { /* never throw */ }

    return json({ ok: true, lead_id: leadId, photo_count: uploadedCount });
  } catch (err) {
    console.error("submit-project-lead error", err);
    return json({ error: (err as Error).message || "Unexpected error" }, 500);
  }
});
