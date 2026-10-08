## Abertas
- Update the specified SEO metadata and copy across the 18 requested files, preserving presentation and functionality; verify service headings and page metadata.

## Concluídas
- 5 páginas de cidade criadas (Edgartown, Falmouth, Hyannis, Chilmark, West Tisbury) com componente reutilizável src/pages/city/CityPainting.tsx, rotas no App.tsx e entrada no sitemap gerado (agora 32 páginas)
- Sitemap de produção definido: vale o gerado pelo build, que hoje traz 32 páginas reais, incluindo as 5 de cidade. O public/sitemap.xml estático é sobrescrito no build e ficou redundante
- Tag do Google Analytics G-MKRCEJ6GKG inserida no index.html antes de </head>
- Schema da home corrigido em Index.tsx: domínio tonyspaintingmv.com, reviewCount 7, serviceArea com 6 cidades
- public/sitemap.xml criado com as 14 URLs pedidas
- public/robots.txt confirmado (já tinha o conteúdo pedido, mais Disallow: /dashboard/*)
- scripts/prerender.mjs: lastmod falso (data do build) removido do sitemap gerado
