import { Field } from "../Field";
import { convertTemplateToXY } from "../functions/convertTemplateToXY";
import { displayPositionUpdate } from "../functions/displayPositionUpdate";
import { tetrominoTemplates } from "../tetrominoTemplates";
import { Tetromino } from "../types";

const rotationTable:{'16':number[],'9':number[]} =
{
  "16": [3, 7, 11, 15,
    2, 6, 10, 14,
    1, 5, 9, 13,
    0, 4, 8, 12],
  "9": [2, 5, 8,
    1, 4, 7,
    0, 3, 6]
}

function copy(tetromino:Tetromino) {
    return tetromino.map(block => {
      return Object.assign({}, block);
    })
  }

  function rotateTetromino() {

    let testFigure = copy(this.alive);
    let done = false;

    function getIndex(n:number):'9'|'16'{
        if(n == 9){return '9'}else{
            return '16'
        }
    }
  
    while (!done) {
      testFigure.forEach(block => {
        const index:'9'|'16' = getIndex(tetrominoTemplates[block.n.n].length)
        let newI = rotationTable[index][block.i];
        let [newX, newY] = convertTemplateToXY(newI, tetrominoTemplates[block.n.n].length,);
        let [oldX, oldY] = convertTemplateToXY(block.i, tetrominoTemplates[block.n.n].length);
        block.x = newX + (block.x - oldX);
        block.y = newY + (block.y - oldY);
        block.i = newI;
      })
      for (let i = 0; i < 2; i++) {
        if (this.isValidPosition(testFigure, i, 0)) {
          set(this,this.changePosition(testFigure, i, 0));
          break;
        } else if (i > 0 && this.isValidPosition(testFigure, -i, 0)) {
          set(this,this.changePosition(testFigure, -i, 0));
          break;
        }
      }
    }
    function set(field:Field,tetromino:Tetromino) {
      done = true;
      field.alive = tetromino;
      displayPositionUpdate(field.alive);
    }
  
  }

export { rotateTetromino }