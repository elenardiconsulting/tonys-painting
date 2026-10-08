## Abertas
- Definir qual sitemap.xml vale em produção: o gerado pelo build (27 páginas reais) ou o novo public/sitemap.xml estático (14 URLs, sendo 4 que ainda não existem como página). Hoje o build sobrescreve o estático.

## Concluídas
- Tag do Google Analytics G-MKRCEJ6GKG inserida no index.html antes de </head>
- Schema da home corrigido em Index.tsx: domínio tonyspaintingmv.com, reviewCount 7, serviceArea com 6 cidades
- public/sitemap.xml criado com as 14 URLs pedidas
- public/robots.txt confirmado (já tinha o conteúdo pedido, mais Disallow: /dashboard/*)
- scripts/prerender.mjs: lastmod falso (data do build) removido do sitemap gerado
