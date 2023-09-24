import { flashText } from "../../functions/flashText";
import { level } from "./level";

const scoreElem:HTMLElement = document.querySelector('#score')!

const score = {
    current:0,
    lineCount:0,
    new(){
        this.current = 0;
        this.display()
    },
    add(lineCount:number){
        this.current += Math.round(100 * (lineCount ** 1.4) * (1 + (level.current - 1) / 10));
        this.display()
        lineCount && flashText(scoreElem)

    },
    display(){
        scoreElem.innerText = this.current.toString()
    }
}

export { score }