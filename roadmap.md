## Abertas
- Portfolio content expansion: add exact supplied details to nine collections and index; verify service links, preserved original presentation, regional text and word counts. No deploy.

## Concluídas
- Pre-deploy fixes: homepage aggregateRating removed; Hero form heading changed h3 to h2; 38 ServiceDetail regional references and two paragraph dashes corrected; exact public/llms.txt added. Public-file handling verified and tsgo exited 0. No deploy. Browser heading verification could not complete.
- Requested SEO copy updated in 18 source files. Syntax, exact service values and unchanged styles/classes/URLs/images verified; existing test passed and build logs show success. Browser verification was attempted but Chromium crashed.
- 5 páginas de cidade criadas (Edgartown, Falmouth, Hyannis, Chilmark, West Tisbury) com componente reutilizável src/pages/city/CityPainting.tsx, rotas no App.tsx e entrada no sitemap gerado (agora 32 páginas)
- Sitemap de produção definido: vale o gerado pelo build, que hoje traz 32 páginas reais, incluindo as 5 de cidade. O public/sitemap.xml estático é sobrescrito no build e ficou redundante
- Tag do Google Analytics G-MKRCEJ6GKG inserida no index.html antes de </head>
- Schema da home corrigido em Index.tsx: domínio tonyspaintingmv.com, reviewCount 7, serviceArea com 6 cidades
- public/sitemap.xml criado com as 14 URLs pedidas
- public/robots.txt confirmado (já tinha o conteúdo pedido, mais Disallow: /dashboard/*)
- scripts/prerender.mjs: lastmod falso (data do build) removido do sitemap gerado
