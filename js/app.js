console.log('APP JS')
const url = window.location.href
const APIth = 'http://localhost:3000/api'
let swLocation = '/sw.js'

if (navigator.serviceWorker) {
  if (url.includes('localhost') || url.includes('127.0.0.1')) swLocation = '/sw.js'

  window.onload = () => {
    navigator.serviceWorker.register(swLocation).then(reg => {
      // Relleno
    })
  }
}

