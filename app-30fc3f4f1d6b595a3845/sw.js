// Saves the app and all sounds on the phone, so it works offline.
const CACHE = "daily-v1";
const FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-180.png", "../daily/morning-01.mp3", "../daily/morning-02.mp3", "../daily/morning-03.mp3", "../daily/morning-04.mp3", "../daily/morning-05.mp3", "../daily/morning-06.mp3", "../daily/morning-07.mp3", "../daily/morning-08.mp3", "../daily/morning-09.mp3", "../daily/morning-10.mp3", "../daily/morning-11.mp3", "../daily/morning-12.mp3", "../daily/morning-13.mp3", "../daily/morning-14.mp3", "../daily/morning-15.mp3", "../daily/day-01.mp3", "../daily/day-02.mp3", "../daily/day-03.mp3", "../daily/day-04.mp3", "../daily/day-05.mp3", "../daily/day-06.mp3", "../daily/day-07.mp3", "../daily/day-08.mp3", "../daily/day-09.mp3", "../daily/day-10.mp3", "../daily/day-11.mp3", "../daily/day-12.mp3", "../daily/day-13.mp3", "../daily/day-14.mp3", "../daily/day-15.mp3", "../daily/day-16.mp3", "../daily/day-17.mp3", "../daily/day-18.mp3", "../daily/day-19.mp3", "../daily/day-20.mp3", "../daily/day-21.mp3", "../daily/day-22.mp3", "../daily/day-23.mp3", "../daily/shop-01.mp3", "../daily/shop-02.mp3", "../daily/shop-03.mp3", "../daily/shop-04.mp3", "../daily/shop-05.mp3", "../daily/shop-06.mp3", "../daily/shop-07.mp3", "../daily/shop-08.mp3", "../daily/talk-01.mp3", "../daily/talk-02.mp3", "../daily/talk-03.mp3", "../daily/talk-04.mp3", "../daily/talk-05.mp3", "../daily/talk-06.mp3", "../daily/talk-07.mp3", "../daily/talk-08.mp3", "../daily/talk-09.mp3", "../daily/talk-10.mp3", "../daily/talk-11.mp3", "../daily/talk-12.mp3", "../daily/talk-13.mp3", "../daily/talk-14.mp3", "../daily/evening-01.mp3", "../daily/evening-02.mp3", "../daily/evening-03.mp3", "../daily/evening-04.mp3", "../daily/evening-05.mp3", "../daily/evening-06.mp3", "../daily/evening-07.mp3", "../daily/evening-08.mp3", "../daily/evening-09.mp3", "../daily/evening-10.mp3", "../daily/evening-11.mp3", "../daily/evening-12.mp3", "../daily/night-01.mp3", "../daily/night-02.mp3", "../daily/night-03.mp3", "../daily/night-04.mp3", "../daily/night-05.mp3", "../daily/night-06.mp3", "../daily/night-07.mp3", "../daily/night-08.mp3"];
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
