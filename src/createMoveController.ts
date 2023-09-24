import { Field } from "./Field";

type SideMoveController = {
    aPressed:boolean,
    dPressed:boolean,
    timeOut:number | undefined,
    aDown:Function,
    dDown:Function,
    aUp:Function,
    dUp:Function,
    checkIfPressed:Function,
}

function createMoveController(field:Field):SideMoveController{
  return {
    aPressed: false,
    dPressed: false,
    timeOut: undefined,
    aDown() {
      if (!this.aPressed) { this.aPressed = true; field.doStepLeft(); this.timeOut = setTimeout(()=>this.checkIfPressed(), 250) ;}
    },
    dDown() {
      if (!this.dPressed) { this.dPressed = true; field.doStepRight(); this.timeOut = setTimeout(()=>this.checkIfPressed(), 250); }
    },
    aUp(){
      this.aPressed = false; clearTimeout(this.timeOut)
    },
    dUp(){
      this.dPressed = false; clearTimeout(this.timeOut)
    },
    checkIfPressed() {
      if (this.aPressed || this.dPressed) {this.timeOut = setTimeout(()=>this.checkIfPressed(), 50) }
      if (this.aPressed) { field.doStepLeft(); };
      if (this.dPressed) { field.doStepRight() };
    }
  }

}

export { createMoveController }