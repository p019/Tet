import { Field } from "./Field";
import { gameOver } from "./functions/gameOver";
import { tetrominoPreview } from "./components/infoComponents/tetrominoPreview";


function createStepFunction(field:Field){
    return function(){
        if (!field.canStep()){
            field.placeTetromino();
            field.handleLines();
            if (!field.isOverflowed) {
              field.emitTetromino();
              tetrominoPreview.show();
            } else {
              gameOver(field)
            }
          } else {
            field.doStepDown()
          }
    }
}

export { createStepFunction }