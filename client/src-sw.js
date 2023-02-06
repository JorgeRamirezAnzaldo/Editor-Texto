//Import necessary methods
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { StaleWhileRevalidate } = require('workbox-strategies');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');


//Define precaching so InjectManifest can replace self.__WB_MANIFEST with the precache manifest
precacheAndRoute(self.__WB_MANIFEST);

//Define page cache options
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

//Load provided URLs into cache during the service worker´s install phase, caching them with the options of the provided strategy
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

//Implement active assets storage in cache
registerRoute(
  //Define return funtion from a function that will filter the requests that need to be stored in cache (JS and CSS files)
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    //Define cache storage name
    cacheName: 'asset-cache',
    plugins: [
      //Use plugin to store the responses in cache up to a maxAge of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);
