import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { captureEarlyInput, replayEarlyInput } from "./lib/replayEarlyInput";
import "./index.css";

// Register Service Worker for PWA (dashboard only; public pages must not register it)
if ('serviceWorker' in navigator && window.location.pathname.startsWith('/dashboard')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const container = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Página pré-renderizada: o React "assume" o HTML que já está na tela (sem redesenhar),
// para não apagar o que o visitante já começou a digitar. Páginas sem pré-renderização (dashboard/login) usam createRoot.
if (container.hasChildNodes()) {
  const typed = captureEarlyInput(container);
  hydrateRoot(container, app);
  replayEarlyInput(typed);
} else {
  createRoot(container).render(app);
}
