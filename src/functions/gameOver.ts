import { Field } from "../Field";
import { audioEngine } from "../audioEngine";
import { tetrominoPreview } from "../components/infoComponents/tetrominoPreview";
import { timer } from "../components/infoComponents/timer";
import { start } from "../start";
import { stepper } from "../stepper";
import { keyboardEventManager } from "../utils/KeyboardEventManager";
import { getFieldControls } from "./getFieldControls";
import { unMapSwipeToKey } from "./mapSwipesToKeys";
import { pause, resume } from "./pause";


function setColor(elem:HTMLElement){
    elem.style.background = 'rgb(32,0,0)'
    elem.style.boxShadow = 'none';
}

function paintRed(){
[...document.getElementById('field').children].forEach(setColor)
}


function gameOver(field:Field){
    stepper.stop()
    timer.stop()

    window.removeEventListener('blur',pause)
    window.removeEventListener('focus',resume)

    document.querySelector('body')!.className = 'bodyRed';
    document.querySelector('#info').classList.remove('smallInfo');
    document.querySelector('#info').classList.add('hideNext');
    document.querySelector('#restart').classList.remove('hide');
    document.querySelector('#field')!.addEventListener('click',start);

    tetrominoPreview.clear()
    
    audioEngine.play('end')
    audioEngine.stop('music')

    keyboardEventManager.unRegister(getFieldControls(field));
    unMapSwipeToKey()
    
    paintRed()
}

export { gameOver }