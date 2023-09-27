console.log('asdx')

addEventListener('install', () => {
  console.log('INSTALADO')
})

addEventListener('activate', () => {
  console.log('ACTIVADO')
})

addEventListener('fetch', e => {
  if (e.request.url === 'http://127.0.0.1:5500/img/koala.jpg') e.respondWith(fetch('http://127.0.0.1:5500/img/dice.jpg'))
  else e.respondWith(fetch(e.request))
})

addEventListener('push', (X) => {
  console.log('PUSHEADO', X)
})


addEventListener('sync', () => {
  console.log('SYNC EVENT UwU')
})
