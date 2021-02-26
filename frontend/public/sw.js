let CACHE_NAME = 'appv1'
const urlToCache = [
  'images/logo.png',
  'static/js/main.chunk.js',
  'static/js/0.chunk.js',
  'static/js/bundle.js',
  'index.html',
  'offline.html',
  '/',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://db.onlinewebfonts.com/c/157c6cc36dd65b1b2adc9e7f3329c761?family=Amazon+Ember',
  'https://code.jquery.com/jquery-3.5.1.slim.min.js',
  'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js',
]
//const self = this;

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened Cache...')
      return cache.addAll(urlToCache)
    })
  )
})

this.addEventListener('fetch', (event) => {
  // event.respondWith(
  //   caches.match(event.request).then(() => {
  //     return fetch(event.request).catch(() => caches.match('offline.html'))
  //   })
  // )

  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((res) => {
        if (res) {
          return res
        }
        let requestUrl = event.request.clone()
        fetch(requestUrl)
      })
    )
  }
})

// this.addEventListener('activate', (event) => {
//   const cacheWhitelist = []
//   cacheWhitelist.push(CACHE_NAME)
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName)
//           }
//         })
//       )
//     )
//   )
// })
