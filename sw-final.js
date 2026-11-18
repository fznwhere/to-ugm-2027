const CACHE_NAME = 'to-ugm-2027-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/img/background.jpg',
  './assets/img/target_bg.png',
  './assets/img/btn_settings.png',
  './assets/img/logo_ugm.png',
  './assets/img/icon_input.png',
  './assets/img/icon_tren.png',
  './assets/img/icon_rata.png',
  './assets/img/icon_history.png',
  './assets/img/icon_analysis.png',
  './assets/img/footer_scene.jpg',
  './assets/img/pochita_sleep.png',
  './assets/img/score_bad.png',
  './assets/img/score_mid.png',
  './assets/img/score_good.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
