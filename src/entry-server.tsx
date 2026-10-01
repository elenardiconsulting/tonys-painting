// Pré-renderização: gera o HTML completo de cada página pública na hora do build,
// para Google, Bing, IAs e prévias de link (WhatsApp, Facebook) lerem o conteúdo sem rodar JavaScript.
// Dashboard e login ficam de fora (são privados).
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { AppProviders, AnimatedRoutes } from "./App";
import { SERVICE_SLUGS } from "./pages/ServiceDetail";
import { COLLECTIONS } from "./data/portfolio";

export const siteUrl = "https://tonyspaintingmv.com";

// Páginas que entram no sitemap (as LPs de anúncio são pré-renderizadas, mas ficam fora do sitemap).
export const sitemapRoutes = [
  "/",
  "/services",
  ...SERVICE_SLUGS().map((s) => `/services/${s}`),
  "/portfolio",
  ...COLLECTIONS.map((c) => `/portfolio/${c.slug}`),
  "/about",
  "/reviews",
  "/contact",
];

// Área privada: recebe uma página vazia (sem conteúdo da home) e noindex.
export const privateRoutes = ["/dashboard", "/login"];

export const routes = [...sitemapRoutes, "/lp/interior-painting", "/lp/exterior-painting", "/lp/remodeling"];

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <AppProviders>
        <StaticRouter location={url}>
          <AnimatedRoutes />
        </StaticRouter>
      </AppProviders>
    </HelmetProvider>,
  );
  const h = helmetContext.helmet;
  const head = h
    ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("\n    ")
    : "";
  return { html, head };
}
