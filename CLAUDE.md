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
