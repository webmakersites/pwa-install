self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '',
      'index.html',
      'index.js',
      'style.css',
      'https://webmakersites.github.io/pwa-examples/a2hs/icon/fox-icon.png',

    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
