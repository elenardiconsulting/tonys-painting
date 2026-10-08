self.addEventListener('install', e => self.skipWaiting())

self.addEventListener('activate', e => {
  e.waitUntil(
    clients.claim()
  )
})

// Badge: usar navigator diretamente (sem self).
// O contexto do Service Worker expoe navigator globalmente
async function setAppBadgeNow(count) {
  if (typeof navigator !== 'undefined' && 'setAppBadge' in navigator) {
    try {
      await navigator.setAppBadge(count)
    } catch(e) {
      console.log('setAppBadge error:', e)
    }
  }
}

async function clearBadgeNow() {
  if (typeof navigator !== 'undefined' && ('clearAppBadge' in navigator || 'setAppBadge' in navigator)) {
    try {
      if ('clearAppBadge' in navigator) {
        await navigator.clearAppBadge()
      } else {
        await navigator.setAppBadge(0)
      }
    } catch(e) {}
  }
}

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
      setAppBadgeNow(count)
    ])
  )
})

self.addEventListener('notificationclick', e => {
  e.notification.close()
  e.waitUntil(
    Promise.all([
      clearBadgeNow(),
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
        for (const client of list) {
          if (client.url.includes('/dashboard') && 'focus' in client) {
            return client.focus()
          }
        }
        return clients.openWindow('/dashboard')
      })
    ])
  )
})
