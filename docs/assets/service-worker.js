import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';
import { ExpirationPlugin } from 'workbox-expiration';

addEventListener('install', () => {
  // eslint-disable-next-line no-undef
  skipWaiting();
});

// addEventListener('activate', () => {
//   console.log('activate');
// });

const cacheFirst = new CacheFirst({
  cacheName: 'assets',
  plugins: [
    new ExpirationPlugin({
      maxEntries: 100,
    }),
  ],
});
const staleWhileRevalidate = new StaleWhileRevalidate({
  cacheName: 'pages',
  plugins: [new BroadcastUpdatePlugin()],
});

registerRoute(/(\/|\.html)$/, staleWhileRevalidate);
registerRoute(/\.(css|m?js|svg|woff2|png|jpg|gif|json|xml)$/, cacheFirst);
