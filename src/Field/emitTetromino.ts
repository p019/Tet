import { createTetromino } from "../functions/createTetromino"
import { bag } from "../bag"
import { appendTetromino } from "../functions/appendTetromino"
import { Field } from "../Field"
import { displayPositionUpdate } from "../functions/displayPositionUpdate"

function emitTetromino(){
    this.alive = createTetromino(bag.get()!)
    appendTetromino(this.alive,Field.htmlElem)
    displayPositionUpdate(this.alive)
}

export { emitTetromino }