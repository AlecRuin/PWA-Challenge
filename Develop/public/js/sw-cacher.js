const files_to_cache=[
    "../index.html"
]
const app_prefix= "PWA_Challenge-"
const version = "v1"
const Cache_Name=app_prefix+version
self.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(Cache_Name)
        .then((cache)=>{
            console.log("installing cache");
            return cache.addAll(files_to_cache)
        })
    )
})
self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
        let cacheKeeplist = keyList.filter(function(key) {
          return key.indexOf(app_prefix);
        });
        cacheKeeplist.push(Cache_Name);
        return Promise.all(
          keyList.map(function(key, i) {
            if (cacheKeeplist.indexOf(key) === -1) {
              console.log('deleting cache : ' + keyList[i]);
              return caches.delete(keyList[i]);
            }
          })
        );
      })
    );
  });
self.addEventListener("fetch",(event)=>{
    console.log("fetch request: ",event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then((request)=>{
            if (request){
                console.log("responding with cache: ",event.request.url);
                return request
            }else{
                console.log("file is not cached, fetching : ",event.request.url);
                return fetch(event.request)
            }
        })
    )
})