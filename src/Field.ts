import { changePosition } from "./Field/changePosition";
import { isValidPosition } from "./Field/isValidPosition";
import { emitTetromino } from "./Field/emitTetromino";
import { hardDrop } from "./Field/hardDrop";
import { placeTetromino } from "./Field/placeTetromino";
import { rotateTetromino } from "./Field/rotateTetromino";
import { Block, Tetromino } from "./types";
import { handleLines } from "./Field/handleLines";
import { displayPositionUpdate } from "./functions/displayPositionUpdate";
import { config } from "./config";
import { ghost } from "./ghost";

class Field{

    static htmlElem:HTMLElement  = document.querySelector('#field')!;

    field:(Block|undefined)[][] = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    
    alive:Tetromino  = []
    isOverflowed = false

    doStepDown = ()=>this.#move(0,1)
    rotateTetromino = ()=>{rotateTetromino.bind(this)();this.updateGhost()}
    emitTetromino = ()=>{emitTetromino.bind(this)();this.updateGhost()}
    placeTetromino = placeTetromino.bind(this)
    hardDrop = hardDrop.bind(this)
    handleLines = handleLines.bind(this)
    canStep = ()=>this.isValidPosition(this.changePosition(this.alive,0,1))
    doStepLeft = ()=>this.#move(-1,0)
    doStepRight = ()=>this.#move(1,0)
    clear(){Field.htmlElem.innerHTML = ''}
    #move = (x:number,y:number)=>{
        const moved = this.changePosition(this.alive,x,y);
        if(this.isValidPosition(moved)){
            this.alive = moved;
            displayPositionUpdate(this.alive);
            (x!==0) && this.updateGhost();
        }
    }
    changePosition = changePosition.bind(this)
    isValidPosition = isValidPosition.bind(this)

    #ghost = ghost.init(()=>this.alive,this.isValidPosition,Field.htmlElem);
    updateGhost(){
        config.ghostEnabled && (this.#ghost.update())
    }
}

export { Field }