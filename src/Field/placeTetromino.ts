import { audioEngine } from "../audioEngine";
import { config } from "../config";
import { paletteManager } from "../paletteManager";
import { SetBlock } from "../types";

function placeTetromino(){
    audioEngine.play('hit')
  
    this.alive.forEach((block:SetBlock) => {
      if (block.y >= 0) {
        let color = paletteManager.get(config.currentPalette)[block.color];
        block.elem.style.background = `rgb(${color[0]},${color[1]},${color[2]})`;
        block.elem.style.boxShadow = 'none';
        this.field[block.y][block.x] = block;
      } else {
        this.isOverflowed = true
      }
    })
    
}

export { placeTetromino }