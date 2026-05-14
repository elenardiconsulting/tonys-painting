self.addEventListener('install', e => self.skipWaiting())
self.addEventListener('activate', e => e.waitUntil(clients.claim()))

self.addEventListener('push', async e => {
  const data = e.data?.json() || {}
  const title = data.title || "Tony's Painting"
  const body = data.body || 'New lead received.'
  const count = data.count || 1

  e.waitUntil(
    Promise.all([
      // Mostrar notificacao
      self.registration.showNotification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        vibrate: [200, 100, 200],
        tag: 'new-lead',
        renotify: true,
        data: { url: '/dashboard', count }
      }),

      // Atualizar badge no icone do app
      navigator.setAppBadge
        ? navigator.setAppBadge(count)
        : Promise.resolve()
    ])
  )
})

self.addEventListener('notificationclick', e => {
  e.notification.close()
  // Limpar badge ao abrir o app
  if (navigator.clearAppBadge) {
    navigator.clearAppBadge()
  }
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('/dashboard') && 'focus' in client) {
          return client.focus()
        }
      }
      return clients.openWindow('/dashboard')
    })
  )
})
