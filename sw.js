const STATIC = 'staticv1'
const STATIC_LIMIT = 15
const INMUTABLE = 'inmutablev1'
const DYNAMIC = 'dynamicv1'
const DYNAMIC_LIMIT = 30

const APP_SHELL = [
  '/',
  '/index.html',
  '/css/style.css',
  '/img/koala.jpg',
  '/js/app.js',
]

const APP_SHELL_INMUTABLE = [
  '/css/bootstrap.min.css',
  '/js/bootstrap.bundle.min.js',
]

addEventListener('install', (e) => {
  // e.skipWaiting()
  const staticChache = caches.open(STATIC).then((c) => c.addAll(APP_SHELL))
  const inmutableChache = caches
    .open(INMUTABLE)
    .then((c) => c.addAll(APP_SHELL_INMUTABLE))
  e.waitUntil(Promise.all([staticChache, inmutableChache]))
  console.log('INSTALADO')
})

addEventListener('activate', () => {
  console.log('ACTIVADO')
})

addEventListener('fetch', e => {
  // cache only
  // e.respondWith(caches.match(e.request))


  // network with cache fallback
  // const source = fetch(e.request).then((res) => {
  //   if (!res) throw Error('Not found')
  //   caches.open(DYNAMIC).then((cache) => {
  //     cache.put(e.request, res)
  //   })
  //   return res.clone()
  // }).catch(() => {
  //   return caches.match(e.request)
  // })


  // cache with network fallback
  // const source = caches.match(e.request).then((res) => {
  //   if (res) return res
  //   return fetch(e.request).then((res) => {
  //     caches.open(DYNAMIC).then((cache) => {
  //       cache.put(e.request, res)
  //     })
  //     return res.clone
  //   })
  // })


  // cache with network update
  if (e.request.url.includes('bootstrap'))
    return e.respondWith(caches.match(e.request))
  const source = caches.open(STATIC).then(cache => {
    fetch(e.request).then(res => {
      cache.put(e.request, res)
    })
    return cache.match(e.request)
  })



  e.respondWith(source)
})

// addEventListener('push', (X) => {
//   console.log('PUSHEADO', X)
// })

// addEventListener('sync', () => {
//   console.log('SYNC EVENT UwU')
// })
