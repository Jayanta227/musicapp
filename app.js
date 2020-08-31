if('serviceWorker' in navigator){   
    navigator.serviceWorker.register('/musicapp/sw.js')
    .then((reg) => console.log('serviceworker registered', reg))
    .catch((err) => console.log('problems with serviceworker', err))
}