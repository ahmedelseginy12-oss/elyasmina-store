var CACHE_NAME = 'elyasmina-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/Logo Elyasmina.png'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});