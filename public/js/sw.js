if("serviceWorker" in navigator){
    navigator.serviceWorker.register("../sw-cacher.js")
    .then(()=>console.log("Service worker registered"))
    .catch((err)=>console.log("failed to register service worker: ",err))
}
