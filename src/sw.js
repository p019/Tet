const cacheName = 'TetCache_V1.0';

self.isStandalone = false;

addEventListener("message", (event) => {
    self.isStandalone = ((isStandalone in event.data) && (event.data.isStandalone))
  });

self.addEventListener('fetch',(event)=>{
    event.respondWith(cacheFirst(event.request));
})

async function cacheFirst(request){
    const cached = await caches.match(request);

    var response;
   
    if(!(cached && request.destination === 'audio')){
        
        try{
            response = await fetch(request.url)
            if(response.ok && self.isStandalone){
               (await caches.open(cacheName)).put(request,response)
            }
        }catch(err){
            console.log(err)
        }
        
    }

    return cached || response
}

self.addEventListener("activate", async(event) => {
    const keys = await caches.keys();
    await Promise.all(
        keys.filter(key=>key!=cacheName)
            .map(key=>caches.delete(key))
    )

});