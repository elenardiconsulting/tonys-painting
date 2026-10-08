## Abertas
- Remaining responsive images: wire eligible site/page callers; verify services image selection and resolver tests. No deploy.

## Concluídas
- Responsive image follow-up: exact-ratio filter removed; all generated widths used with original fallbacks. Five tests pass; automatic build OK. Six Chromium comparisons show unchanged body heights and max raw delta 0.90625px (rounded boxes produce 1.0px). In-scope local gallery/cover/logo images select WebP; untouched ServicesPreview images and externally blocked covers remain exceptions. Originals byte-identical to HEAD; no deploy. Manual builds/typechecks not run per environment restrictions.
- Responsive images: generated WebP variants and static manifest/map idempotently; updated requested components and removed only dead Hero import; original fallback URLs and existing styles/copy/videos/tracking preserved. Five resolver tests pass; automatic build log reports OK. Ten Chromium screenshot pairs and paired same-session photo-only comparisons captured; all measured image/heading/section/footer bounds unchanged; lightbox open/next/close works desktop/mobile. No deploy. Manual build/typecheck prohibited by environment instructions; no exit codes claimed.
- Portfolio content expansion: exact supplied details added to nine collections and index; existing classes/images/animations/data preserved; service links confirmed including deck-stairs; zero New England matches; paragraph word counts reported; all nine pages and filter/lightbox/service-link flow verified in Firefox, mobile overflow check passed, automatic build OK. No deploy. Manual typecheck not run under environment restrictions.
- Pre-deploy fixes: homepage aggregateRating removed; Hero form heading changed h3 to h2; 38 ServiceDetail regional references and two paragraph dashes corrected; exact public/llms.txt added. Public-file handling verified and tsgo exited 0. No deploy. Browser heading verification could not complete.
- Requested SEO copy updated in 18 source files. Syntax, exact service values and unchanged styles/classes/URLs/images verified; existing test passed and build logs show success. Browser verification was attempted but Chromium crashed.
- 5 páginas de cidade criadas (Edgartown, Falmouth, Hyannis, Chilmark, West Tisbury) com componente reutilizável src/pages/city/CityPainting.tsx, rotas no App.tsx e entrada no sitemap gerado (agora 32 páginas)
- Sitemap de produção definido: vale o gerado pelo build, que hoje traz 32 páginas reais, incluindo as 5 de cidade. O public/sitemap.xml estático é sobrescrito no build e ficou redundante
- Tag do Google Analytics G-MKRCEJ6GKG inserida no index.html antes de </head>
- Schema da home corrigido em Index.tsx: domínio tonyspaintingmv.com, reviewCount 7, serviceArea com 6 cidades
- public/sitemap.xml criado com as 14 URLs pedidas
- public/robots.txt confirmado (já tinha o conteúdo pedido, mais Disallow: /dashboard/*)
- scripts/prerender.mjs: lastmod falso (data do build) removido do sitemap gerado
