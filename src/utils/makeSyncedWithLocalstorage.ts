function makeSyncedWithLocalstorage(objToSync:Record<string,any>,id:string){

    const write = (target:typeof objToSync)=>localStorage.setItem(id,JSON.stringify(target)) 
    const saved = (localStorage.getItem(id));
    if(saved){
        const parsed = JSON.parse(saved);
        let prop:string;
        for (prop in parsed){
            objToSync[prop] = parsed[prop]
        };
        for(prop in objToSync){
            (!parsed.hasOwnProperty(prop)) && delete objToSync[prop];
        }
    }else{
        write(objToSync) 
    }
    return new Proxy(objToSync,{
        set(target,prop:keyof typeof objToSync,value){
            target[prop] = value;
            write(target)
            return true
        },
        deleteProperty(target,prop:keyof typeof objToSync){
            delete target[prop];
            write(target)
            return true
        }
    })

}

export { makeSyncedWithLocalstorage }