import { config } from "./config";
import { paletteManager } from "./paletteManager";
import { TetrominoConfig } from "./types";

class Bag{
    #bag:TetrominoConfig[] = [];
    create(){
        this.#fill()
        return this
    }
    get(){
        return this.#bag.shift()
    }
    getNext(){
        if(this.#bag.length==0){this.#fill()}
        return this.#bag[0];
    }
    #fill(){
        let arr:TetrominoConfig[] = []
        let numbers = [0, 1, 2, 3, 4, 5, 6];
        for (let i = 0; i < 7; i++) {
          const random = Math.floor(Math.random() * numbers.length);
          const color = Math.floor(Math.random() * paletteManager.get(config.currentPalette).length);
          arr.push({ n: numbers[random], color:color });
          numbers.splice(random, 1);
        }
        this.#bag = arr;
    }
}

const bag = new Bag

export { bag }