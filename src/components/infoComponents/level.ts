import { flashText } from "../../functions/flashText";

class Level{
    #htmlElem:HTMLElement|null
    current:number;
    constructor(){
        this.#htmlElem = document.querySelector('#level')
    }
    newCount(){
        this.current = 1;
        this.#display()
    }
    increment(){
        this.current++
        this.#display()
        flashText(this.#htmlElem)
    }
    #display(){
        this.#htmlElem!.innerText = this.current.toString();
    }

}

const level = new Level()

export { level }