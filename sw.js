const CACHE_NAME = 'qr-scanner-v1';
const urlsToCache = [
'./index.html',
'https://cdn.tailwindcss.com',
'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js',
'https://placehold.co/192x192/3b82f6/FFFFFF?text=QR',
'https://placehold.co/512x512/3b82f6/FFFFFF?text=QR'
];

// This event is fired when the service worker is first installed.
self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME)
.then((cache) => {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});

// This event is fired every time the app requests a resource.
self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request)
.then((response) => {
// If the resource is in the cache, return it.
if (response) {
return response;
}
// If not, fetch it from the network.
return fetch(event.request);
})
);
});

// This event is fired when the service worker is updated.
self.addEventListener('activate', (event) => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then((cacheNames) => {
return Promise.all(
cacheNames.map((cacheName) => {
if (cacheWhitelist.indexOf(cacheName) === -1) {
return caches.delete(cacheName);
}
})
);
})
);
});