-- Lead novo: o gatilho passa a chamar a função notify-new-lead (push + e-mail via Resend),
-- em vez de chamar send-push direto. Já aplicado no banco em 2026-10-01; este arquivo é o registro.
CREATE OR REPLACE FUNCTION public.notify_new_lead_webhook()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
begin
  perform net.http_post(
    url := 'https://ghznuutonacttnmqtiil.supabase.co/functions/v1/notify-new-lead',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdoem51dXRvbmFjdHRubXF0aWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTgwMzAsImV4cCI6MjA5Mjg5NDAzMH0.0CU9lBk2_elvHq71-j-qE2E5T8n_3-3uDIiPYmc9l4g'
    ),
    body := jsonb_build_object('type', 'INSERT', 'table', 'leads', 'record', to_jsonb(new))
  );
  return new;
exception when others then
  return new;
end;
$function$;
