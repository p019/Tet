import { audioEngine } from "../audioEngine";
import { displayPositionUpdate } from "../functions/displayPositionUpdate";
import { stepper } from "../stepper";
import { SetBlock } from "../types";
import { keyboardEventManager } from "../utils/KeyboardEventManager";

function hardDrop(){
    let c = 0;
      keyboardEventManager.setEnability(['ArrowDown','KeyS'],false);
      while (this.isValidPosition(this.alive, 0, c)) { c++ }
  
      this.alive.forEach((block:SetBlock) => {
        block.elem.style.transitionDuration = `${0.025 * c}s`
        block.elem.style.transitionTimingFunction = `cubic-bezier(.38,.07,.71,.67)`
      });
      this.alive = this.changePosition(this.alive,0,c-1)

      stepper.forceTimeout(25 * c + 50,()=>{
        keyboardEventManager.setEnability(['ArrowDown','KeyS'],true);
      })
      displayPositionUpdate(this.alive)
  
      audioEngine.play('air',25 * c)//, false, );
}

export { hardDrop }

/*
function hardDrop(round:Round) {
    if (!round.wait) {
      
    }
}

*/