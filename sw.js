const cacheName = 'static-sites'
const assets = [
    '/musicapp',
    '/musicapp/index.html', '/musicapp/index.js', '/musicapp/index.css', '/musicapp/index_small.css',
    '/musicapp/chords.html', '/musicapp/chords.js', '/musicapp/chords.css',
    '/musicapp/intervals.html', '/musicapp/intervals.js', '/musicapp/intervals.css',
    '/musicapp/notes.html', '/musicapp/notes.js', '/musicapp/notes.css',
    '/musicapp/ham.png'
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
