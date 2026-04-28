const CACHE_NAME = 'tonys-dashboard-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Do NOT cache private dashboard/CRM data or Supabase/API/auth requests
  if (
    url.origin.includes('supabase.co') || 
    url.pathname.startsWith('/rest/') || 
    url.pathname.startsWith('/auth/')
  ) {
    return;
  }

  // Network-first strategy for everything else to ensure dashboard data stays fresh
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Retain push notifications from original file
self.addEventListener('push', (e) => {
  const data = (() => { try { return e.data?.json() || {}; } catch { return {}; } })();
  e.waitUntil(
    self.registration.showNotification(data.title || "Tony's Painting", {
      body: data.body || 'New lead received.',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      vibrate: [200, 100, 200],
      tag: 'new-lead',
      renotify: true,
      data: { url: '/dashboard' },
    })
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || '/dashboard'));
});