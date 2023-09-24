import { Field } from "./Field";
import { audioEngine } from "./audioEngine";
import { bag } from "./bag";
import { createStepFunction } from "./createStepFunction";
import { getFieldControls } from "./functions/getFieldControls";
import { getTickTime } from "./functions/getTickTime";
import { level } from "./components/infoComponents/level";
import { score } from "./components/infoComponents/score";
import { stepper } from "./stepper";
import { tetrominoPreview } from "./components/infoComponents/tetrominoPreview";
import { timer } from "./components/infoComponents/timer";
import { keyboardEventManager } from "./utils/KeyboardEventManager";
import { setVolume } from "./functions/setVolume";

function start(){
    document.querySelector('body').className = 'bodyBlue';
    bag.create()

    const field = new Field()
    field.clear();
    field.emitTetromino()
    
    keyboardEventManager.register(getFieldControls(field))

    const doStep = createStepFunction(field)

    level.newCount()

    score.new()

    tetrominoPreview.show()

    stepper.setCallback(doStep)
    stepper.setTickGettingFunction(getTickTime)
    stepper.start()

    timer.start()
    
    audioEngine.initAudio()
    setVolume()
    audioEngine.stop('end')
    audioEngine.repeatPlay('music')
}

export { start }