const CACHE_NAME = 'tonys-crm-v1'

self.addEventListener('install', e => self.skipWaiting())

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim())
})

// Limpar badge sempre que o app e focado/aberto
self.addEventListener('activate', () => {
  clearBadgeNow()
})

self.clients.matchAll({ includeUncontrolled: true, type: 'window' })

// Listener para quando cliente (app) ganha foco
self.addEventListener('message', async e => {
  if (e.data?.type === 'CLEAR_BADGE' || e.data?.type === 'APP_FOCUSED') {
    await clearBadgeNow()
  }
})

async function clearBadgeNow() {
  try {
    if ('clearAppBadge' in self.navigator) {
      await self.navigator.clearAppBadge()
    }
    if ('setAppBadge' in self.navigator) {
      await self.navigator.setAppBadge(0)
    }
  } catch(e) {}
}

self.addEventListener('push', async e => {
  const data = e.data?.json() || {}
  const title = data.title || "Tony's Painting"
  const body = data.body || 'New lead received.'
  const count = data.count || 1

  e.waitUntil(
    Promise.all([
      self.registration.showNotification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        vibrate: [200, 100, 200],
        tag: 'new-lead',
        renotify: true,
        data: { url: '/dashboard', count }
      }),
      setAppBadgeNow(count)
    ])
  )
})

async function setAppBadgeNow(count) {
  try {
    if ('setAppBadge' in self.navigator) {
      await self.navigator.setAppBadge(count)
    }
  } catch(e) {}
}

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

// Detectar quando janela ganha foco e limpar badge
self.addEventListener('focus', () => clearBadgeNow())