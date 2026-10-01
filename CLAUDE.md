# Tony's Painting and Remodeling — Website + CRM

## Cliente
- Empresa: Tony's Painting and Remodeling (New England / Martha's Vineyard, desde 2004)
- Telefone: 508 982 9675
- Situação: site e CRM construídos pela Elenardi; em processo de entrega para outro dev.

## Onde o projeto vive
- Site no ar: https://tonyspaintingmv.com
- GitHub: https://github.com/elenardiconsulting/tonys-painting
- Lovable: https://lovable.dev/projects/e499e566-dc4d-44c4-acd8-2c3362003e94 (nome no Lovable: "Heartfelt Connections")
- Banco: Supabase via Lovable (leads, CRM, agenda, reviews). Edge functions em `supabase/functions`.
- Hospedagem: Lovable. Fluxo: Claude edita aqui, push no GitHub, publica no Lovable.

## Stack
- Vite + React 18 + TypeScript + Tailwind + shadcn/ui + React Router + framer-motion
- SEO por página: `src/components/SEO.tsx` (react-helmet-async), com canonical para tonyspaintingmv.com
- Área privada: `/login` e `/dashboard` (CRM). Bloqueados no robots.txt e fora da pré-renderização.
- Landing pages de anúncio: `/lp/interior-painting`, `/lp/exterior-painting`, `/lp/remodeling` (pré-renderizadas, fora do sitemap)
- Meta Pixel 1004158805431458 no `index.html`; Clarity nas LPs.

## Leads: dashboard + push + e-mail
- Todos os formulários gravam na tabela `leads` (Supabase). Um gatilho no banco chama a função `supabase/functions/notify-new-lead`.
- `notify-new-lead` manda a notificação push (`send-push`) e o e-mail do lead via Resend. Um não depende do outro.
- E-mail: destinatário `tonyspainting11@gmail.com` (secret opcional `LEAD_EMAIL_TO`, separado por vírgula). Remetente `leads@tonyspaintingmv.com` (secret opcional `LEAD_EMAIL_FROM`).
- Precisa do secret `RESEND_API_KEY` no Lovable. Sem ele, o e-mail é pulado e o push continua normal.
- Domínio no GoDaddy (DNS) e e-mail do domínio no Google Workspace. Os registros do Resend ficam no subdomínio `send`, sem mexer no e-mail atual.

## Pré-renderização (SEO)
- `npm run build` gera HTML completo para cada página pública e o `dist/sitemap.xml` (27 páginas).
- Arquivos: `src/entry-server.tsx` (lista de rotas) e `scripts/prerender.mjs`.
- Serviço novo: adicionar em `SERVICES` (`src/pages/ServiceDetail.tsx`). Portfólio novo: `COLLECTIONS` (`src/data/portfolio.ts`). Entram sozinhos no sitemap.
- Página nova: adicionar a rota em `src/App.tsx` e em `sitemapRoutes` (`src/entry-server.tsx`).
- Código que roda na renderização não pode usar `window`/`document` direto (use dentro de `useEffect` ou com `typeof window !== "undefined"`).
- `npm run build:spa` gera a versão antiga, sem pré-renderização (plano B).

## Regras de trabalho
1. Antes de editar: `git pull` (o Lovable pode ter feito commits).
2. Toda alteração passa por `npm run build` sem erro antes do push.
3. Não editar no Lovable e aqui ao mesmo tempo.
4. Nunca commitar chaves privadas. O `.env` atual só tem chaves públicas do Supabase.

## Histórico
- 2026-10-01 — Pré-renderização de 30 páginas + sitemap gerado automaticamente. Corrigido o robots.txt (apontava o sitemap para "tonyspaintingcmv.com"). Removidos lockfiles do bun (build com npm).
- 2026-10-01 — /dashboard e /login recebem HTML vazio com noindex (antes mostravam a home por um instante).
- 2026-10-01 — notify-new-lead v6: além do push, manda e-mail de cada lead novo via Resend (aguardando RESEND_API_KEY).
