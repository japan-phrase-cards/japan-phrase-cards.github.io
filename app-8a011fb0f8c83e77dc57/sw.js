// Saves the app and all sounds on the phone, so it works offline.
const CACHE = "nut-allergy-v1";
const FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-180.png", "../nut-allergy/main-01.mp3", "../nut-allergy/main-02.mp3", "../nut-allergy/main-03.mp3", "../nut-allergy/main-04.mp3", "../nut-allergy/main-05.mp3", "../nut-allergy/ask-01.mp3", "../nut-allergy/ask-02.mp3", "../nut-allergy/ask-03.mp3", "../nut-allergy/ask-04.mp3", "../nut-allergy/ask-05.mp3", "../nut-allergy/ask-06.mp3", "../nut-allergy/ask-07.mp3", "../nut-allergy/ask-08.mp3", "../nut-allergy/order-01.mp3", "../nut-allergy/order-02.mp3", "../nut-allergy/order-03.mp3", "../nut-allergy/order-04.mp3", "../nut-allergy/shop-01.mp3", "../nut-allergy/shop-02.mp3", "../nut-allergy/sos-01.mp3", "../nut-allergy/sos-02.mp3"];
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
