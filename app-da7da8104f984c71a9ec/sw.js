// Saves the app and all sounds on the phone, so it works offline.
const CACHE = "gluten-free-v1";
const FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-180.png", "../gluten-free/main-01.mp3", "../gluten-free/main-02.mp3", "../gluten-free/main-03.mp3", "../gluten-free/main-04.mp3", "../gluten-free/ask-01.mp3", "../gluten-free/ask-02.mp3", "../gluten-free/ask-03.mp3", "../gluten-free/ask-04.mp3", "../gluten-free/ask-05.mp3", "../gluten-free/ask-06.mp3", "../gluten-free/ask-07.mp3", "../gluten-free/ask-08.mp3", "../gluten-free/ask-09.mp3", "../gluten-free/ask-10.mp3", "../gluten-free/ask-11.mp3", "../gluten-free/order-01.mp3", "../gluten-free/order-02.mp3", "../gluten-free/order-03.mp3", "../gluten-free/order-04.mp3", "../gluten-free/order-05.mp3", "../gluten-free/order-06.mp3", "../gluten-free/shop-01.mp3", "../gluten-free/shop-02.mp3"];
self.addEventListener("install", e => {
  // "reload" = always download fresh, never reuse the phone's older saved copy
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, {cache: "reload"}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const key = url.origin + url.pathname;  // ignore ?query and #hash
  e.respondWith(caches.match(key).then(hit => hit || fetch(e.request)));
});
