import { bag } from "../../bag";
import { appendTetromino } from "../../functions/appendTetromino";
import { createTetromino } from "../../functions/createTetromino";
import { displayNextTetromino, displayPositionUpdate } from "../../functions/displayPositionUpdate";

class TetrominoPreview{
    #htmlElem:HTMLElement = document.querySelector('#next')!;

    show(){
        const tetromino = createTetromino(bag.getNext(),true)
        this.clear()
        appendTetromino(tetromino,this.#htmlElem)
        displayNextTetromino(tetromino)
    }
    clear(){
        this.#htmlElem.innerHTML = '';
    }
}

const tetrominoPreview = new TetrominoPreview

export { tetrominoPreview }