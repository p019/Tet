import { SetBlock, Tetromino } from "../types";

function changePosition(tetromino:Tetromino, x:number = 0, y:number = 0) {
    return tetromino.map(block => {
      const movedBlock:SetBlock = Object.assign({},block);
      movedBlock.x += x;
      movedBlock.y += y
      return movedBlock
    })
  }
export { changePosition }