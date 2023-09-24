
class Stepper{

    #timeout:any
    #getTick:Function
    #callback:Function
    #step(){
        this.#timeout = setTimeout(this.#step.bind(this),this.#getTick())
        this.#callback();
    }
    start(){
        if(this.#timeout){this.stop()}
        this.#timeout = setTimeout(this.#step.bind(this),this.#getTick())
    }
    stop(){
        clearTimeout(this.#timeout)
        this.#timeout = 0;
    } 
    forceTimeout(ms:number,callback:Function|undefined = undefined){
        this.stop()
        this.#timeout = setTimeout(()=>{
            this.#step();
            callback && callback()
        },ms)
    }
    setTickGettingFunction(func:Function){
        this.#getTick = func
    }
    setCallback(func:Function){
        this.#callback = func
    }
}   

const stepper = new Stepper

export { stepper } 