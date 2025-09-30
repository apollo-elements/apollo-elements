// Apollo Elements Service Worker
const CACHE_NAME = 'apollo-elements-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/guides/',
  '/api/',
  '/blog/',
  '/index.json',
  '/assets/css/main.css',
  '/assets/js/main.js'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Apollo Elements: Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS.map(url => new Request(url, { cache: 'reload' })));
      })
      .catch(error => {
        console.warn('Apollo Elements: Cache installation failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('Apollo Elements: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (!request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Serve from cache
          return cachedResponse;
        }

        // Fetch from network
        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cache successful responses for HTML, CSS, JS, JSON
            const responseClone = response.clone();
            const url = new URL(request.url);

            if (url.pathname.endsWith('.html') ||
                url.pathname.endsWith('.css') ||
                url.pathname.endsWith('.js') ||
                url.pathname.endsWith('.json') ||
                url.pathname === '/' ||
                url.pathname.endsWith('/')) {

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(request, responseClone);
                });
            }

            return response;
          })
          .catch(error => {
            console.warn('Apollo Elements: Network request failed:', error);

            // Return offline page for HTML requests
            if (request.headers.get('Accept').includes('text/html')) {
              return caches.match('/offline.html');
            }

            throw error;
          });
      })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any queued operations when back online
      console.log('Apollo Elements: Background sync triggered')
    );
  }
});

// Push notifications (if needed in the future)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      data: data.url
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});