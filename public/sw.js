self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

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
