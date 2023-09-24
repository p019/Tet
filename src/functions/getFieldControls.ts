import { Field } from "../Field"
import { createMoveController } from "../createMoveController"
import { KeyHandler } from "../utils/KeyboardEventManager"

function getFieldControls(field:Field):KeyHandler[]{
    const controller = createMoveController(field)
    return [
      ['down','ArrowDown',()=>field.hardDrop()],
      ['down','KeyS',()=>field.hardDrop()],
      ['down','ArrowUp',()=>field.rotateTetromino()],
      ['down','KeyW',()=>field.rotateTetromino()],
      ['down','ArrowLeft',()=>controller.aDown()],
      ['down','KeyA',()=>controller.aDown()],
      ['down','ArrowRight',()=>controller.dDown()],
      ['down','KeyD',()=>controller.dDown()],
      ['up','ArrowLeft',()=>controller.aUp()],
      ['up','KeyA',()=>controller.aUp()],
      ['up','ArrowRight',()=>controller.dUp()],
      ['up','KeyD',()=>controller.dUp()],
    ]
}

export { getFieldControls }