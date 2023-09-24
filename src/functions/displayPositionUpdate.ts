import { config } from "../config";
import { paletteManager } from "../paletteManager";
import { tetrominoTemplates } from "../tetrominoTemplates";
import { Tetromino } from "../types";


function displayNextTetromino(tetromino:Tetromino){
  
  requestAnimationFrame(()=>{
    const shiftX = (tetrominoTemplates[tetromino[0].n.n].length === 9) ? 12.5 : 0;
    const shiftY = (tetromino[0].n.n == 0) ? -25 : 0;
    tetromino.forEach(block => {
      block.elem.style.left=(block.x)*25+shiftX+'%';
      block.elem.style.top=(block.y)*50-50+shiftY+'%';
    })
  })

}

function displayPositionUpdate(tetromino:Tetromino){
  requestAnimationFrame(()=>{
    tetromino.forEach(block => {
        block.elem.style.left=(block.x)*10+'%';
        block.elem.style.top=(block.y)*5+'%';
    })
  })
   
}

export { displayPositionUpdate, displayNextTetromino }