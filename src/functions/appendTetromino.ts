import { config } from "../config";
import { paletteManager } from "../paletteManager";
import { Tetromino } from "../types";

function appendTetromino(tetromino:Tetromino, parent:HTMLElement) {
  requestAnimationFrame(()=>{
    tetromino.forEach(block => {
      const color = paletteManager.get(config.currentPalette)[block.color];
      block.elem.style.background = `radial-gradient(rgb(${color[0] + 30},${color[1] + 30},${color[2] + 30}),rgb(${color[0]},${color[1]},${color[2]}))`;
      block.elem.style.boxShadow = `0 0 8px rgb(${color[0]},${color[1]},${color[2]})`;
      parent.appendChild(block.elem);
    })
  })
  }

  export { appendTetromino }