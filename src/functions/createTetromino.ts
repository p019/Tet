import { Block, SetBlock, Tetromino, TetrominoConfig } from "../types";
import { tetrominoTemplates } from "../tetrominoTemplates";
import { convertTemplateToXY } from "./convertTemplateToXY";

function createBlock(x:number, y:number, color:number, next = false) {
    
    let elem = document.createElement('div');
    let className = next ? 'next' : 'main';
    elem.classList.add('block');
    elem.classList.add(className);

    let block:Block = {
        elem:elem,
        x:x,
        y:y,
        color:color
    };

    return block
}

function createTetromino(config:TetrominoConfig,next = false) {
  const shift = next ? 0 : 3
    let arr:Tetromino = [];
    let size = tetrominoTemplates[config.n].length;
    for (let i = 0; i < size; i++) {
      if (tetrominoTemplates[config.n][i]) {
        let [posX, posY] = convertTemplateToXY(i, size);
        let block:SetBlock = {
          ...createBlock(posX + shift, posY - shift, config.color, next),
          i:i,
          n:config
        }
        arr.push(block);
      }
    }
    return arr;
  }

  export { createTetromino }