import { Tetromino } from "../types";

function isValidPosition(tetromino:Tetromino, x = 0, y = 0) {
    let res = true;
    tetromino.forEach((block) => {
  
      if (block.x + x >= 10 || block.x + x < 0 || block.y + y >= 20) { res = false }
      else if (block.y + y >= 0 && this.field[block.y + y][block.x + x]) { res = false }
      
    })
    return res;
  }

  export { isValidPosition }
