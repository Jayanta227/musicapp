const cacheName = 'static-sites'
const assets = [
    '/',
    '/index.html', '/index.js', '/index.css', '/index_small.css',
    '/chords.html', '/chords.js', '/chords.css',
    '/intervals.html', '/intervals.js', '/intervals.css',
    '/notes.html', '/notes.js', '/notes.css',
    '/ham.png'
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('adding cache');
            cache.addAll(assets)
        })
    );
});

self.addEventListener('activate', evt => {
    console.log('install event occurs');
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});
