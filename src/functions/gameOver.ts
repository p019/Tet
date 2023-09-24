import { Field } from "../Field";
import { audioEngine } from "../audioEngine";
import { tetrominoPreview } from "../components/infoComponents/tetrominoPreview";
import { timer } from "../components/infoComponents/timer";
import { stepper } from "../stepper";
import { keyboardEventManager } from "../utils/KeyboardEventManager";
import { getFieldControls } from "./getFieldControls";


function setColor(elem:HTMLElement){
    elem.style.background = 'rgb(32,0,0)'
    elem.style.boxShadow = 'none';
}

function paintRed(){
[...document.getElementById('field').children].forEach(setColor)
}


function gameOver(field:Field){
    document.querySelector('body')!.className = 'bodyRed';
    tetrominoPreview.clear()
    queueMicrotask(()=>timer.stop())
    audioEngine.play('end')
    audioEngine.stop('music')
    keyboardEventManager.unRegister(getFieldControls(field));
    stepper.stop()
    paintRed()
}

export { gameOver }