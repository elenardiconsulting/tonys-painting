// Roda depois do "vite build": cria um index.html completo para cada página em dist/
// e gera o sitemap.xml. Se algo falhar aqui, o site continua funcionando como antes (só sem pré-renderização).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");

const entry = fs.readdirSync(serverDir).find((f) => /^entry-server\.(m?js)$/.test(f));
const { render, routes, sitemapRoutes, siteUrl, privateRoutes = [] } = await import(pathToFileURL(path.join(serverDir, entry)).href);

// Tags que cada página define sozinha (via SEOHead). Tiramos a versão genérica do template para não duplicar.
const perPage = [
  /<title>[\s\S]*?<\/title>/i,
  /<meta\s+name="description"[^>]*>/i,
  /<link\s+rel="canonical"[^>]*>/i,
  /<meta\s+property="og:(title|description|url|type)"[^>]*>/gi,
  /<meta\s+name="twitter:(card|title|description|image)"[^>]*>/gi,
  /<meta\s+property="og:image"[^>]*>/gi,
];

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

for (const url of routes) {
  const { html, head } = render(url);
  let page = template;
  if (head) {
    for (const re of perPage) page = page.replace(re, "");
    page = page.replace("</head>", `    ${head}\n  </head>`);
  }
  page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const out = url === "/" ? path.join(dist, "index.html") : path.join(dist, url, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page.replace(/\n\s*\n/g, "\n"));
  console.log("pré-renderizado:", url);
}

// Rotas privadas: HTML sem conteúdo, com título próprio e noindex.
for (const url of privateRoutes) {
  let page = template;
  for (const re of perPage) page = page.replace(re, "");
  page = page.replace("</head>", `    <title>Tony's Dashboard</title>\n    <meta name="robots" content="noindex, nofollow" />\n  </head>`);
  page = page.replace(/<meta\s+name="robots" content="index[^>]*>/i, "");
  const out = path.join(dist, url, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page.replace(/\n\s*\n/g, "\n"));
  console.log("página privada (vazia):", url);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map((u) => `  <url><loc>${siteUrl}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.rmSync(serverDir, { recursive: true, force: true });
console.log(`sitemap.xml com ${sitemapRoutes.length} páginas`);
