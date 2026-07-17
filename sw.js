/* Тодо Бичик — service worker (офлайн-кэш). */
const CACHE = 'todo-bichig-v1';

const PRECACHE = [
  './',
  './index.html',
  './writer.html',
  './badmaev-course.html',
  './manifest.webmanifest',
  './css/fonts.css',
  './css/style.css',
  './fonts/ibm-plex-sans/faces.css',
  './fonts/ibm-plex-sans/cyrillic-400-normal.woff2',
  './fonts/ibm-plex-sans/cyrillic-500-normal.woff2',
  './fonts/ibm-plex-sans/cyrillic-600-normal.woff2',
  './fonts/ibm-plex-sans/cyrillic-700-normal.woff2',
  './fonts/ibm-plex-sans/cyrillic-ext-400-normal.woff2',
  './fonts/ibm-plex-sans/cyrillic-ext-500-normal.woff2',
  './fonts/ibm-plex-sans/cyrillic-ext-600-normal.woff2',
  './fonts/ibm-plex-sans/cyrillic-ext-700-normal.woff2',
  './fonts/ibm-plex-sans/latin-400-normal.woff2',
  './fonts/ibm-plex-sans/latin-500-normal.woff2',
  './fonts/ibm-plex-sans/latin-600-normal.woff2',
  './fonts/ibm-plex-sans/latin-700-normal.woff2',
  './fonts/ibm-plex-sans/latin-ext-400-normal.woff2',
  './fonts/ibm-plex-sans/latin-ext-500-normal.woff2',
  './fonts/ibm-plex-sans/latin-ext-600-normal.woff2',
  './fonts/ibm-plex-sans/latin-ext-700-normal.woff2',
  './js/font-data.js',
  './js/barintodo-data.js',
  './js/data.js',
  './js/harmony-data.js',
  './js/reading-data.js',
  './js/utils.js',
  './js/lessons.js',
  './js/ui.js',
  './js/search.js',
  './js/practice.js',
  './js/harmony.js',
  './js/path.js',
  './js/copybook.js',
  './js/writer.js',
  './js/main.js',
  './js/writer-data.js',
  './js/writer-strokes-saved.js',
  './js/badmaev-course.js',
  './js/badmaev-course-data.js',
  './js/vendor/jspdf.umd.min.js',
  './img/icons/icon-192.png',
  './img/icons/icon-512.png',
  './img/icons/icon-512-maskable.png',
  './img/icons/apple-touch-icon.png',
  './img/zaya-pandita.webp',
  './img/zaya-pandita.jpg',
  './img/vowels-strokes.webp',
  './img/vowels-strokes.jpg',
  './img/consonants-strokes-1.webp',
  './img/consonants-strokes-1.jpg',
  './img/consonants-strokes-2.webp',
  './img/consonants-strokes-2.jpg',
  './img/copybook/1.webp',
  './img/copybook/2.webp',
  './img/copybook/3.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll(PRECACHE).catch((err) => {
        console.warn('[sw] precache partial fail', err);
        return Promise.all(
          PRECACHE.map((url) =>
            cache.add(url).catch((e) => console.warn('[sw] skip', url, e))
          )
        );
      })
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML: сеть в приоритете, офлайн — из кэша
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) => cached || caches.match('./index.html'))
        )
    );
    return;
  }

  // Остальное: кэш → сеть (с записью в кэш)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      });
    })
  );
});
