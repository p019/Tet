import { audioEngine } from "../audioEngine";
import { timer } from "../components/infoComponents/timer";
import { stepper } from "../stepper";

function pause(){
    audioEngine.pause('music')
    stepper.stop()
    timer.pause()
}

function resume(){
    audioEngine.resume('music')
    stepper.start()
    timer.resume()
}

export { pause, resume }