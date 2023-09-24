//@ts-nocheck

function makeInfinite(array:any[]){
    return new Proxy(array,{
        get(target,prop){
            const len = target.length;
            return prop >= len ? target[prop%len] : target[prop]
        }
    })
}

export { makeInfinite }