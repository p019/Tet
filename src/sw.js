const cacheName = 'TetCache_V1.0';

self.isStandalone = false;

addEventListener("message", (event) => {
    self.isStandalone = ('isStandalone' in event.data) && (event.data.isStandalone)
  });

self.addEventListener('fetch',(event)=>{
    
    event.respondWith(cacheFirst(event.request));

})

async function cacheFirst(request){
    const cached = await caches.match(request);

    if(cached){ 
        writeCache(request,undefined) 
        return cached
    }else{
        try{
            let response = await fetch(request.url)
            writeCache(request,response.clone())
            return response
        }catch(err){
            console.log(err)
        }
        
    }

}

async function writeCache(request,response){

    if((!response && request.destination === 'audio' ) || (!self.isStandalone && request.destination === 'audio' )){return}

    try{
        if(!response){
           response = await fetch(request.url)
        }

        if(response && response.ok){
            (await caches.open(cacheName)).put(request,response)
        }


    }catch(err){
        console.log(err)
    }
}

self.addEventListener("activate", async(event) => {
    const keys = await caches.keys();
    await Promise.all(
        keys.filter(key=>key!=cacheName)
            .map(key=>caches.delete(key))
    )

});