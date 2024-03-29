import { audioEngine } from "../audioEngine";
import { config } from "../config";

function setVolumeBalance(){
    const musicVolume = 1 + Math.min(config.volumeBalance - 0.5,0) * 2;
    const fxVolume = 1 - Math.max(config.volumeBalance - 0.5,0) * 2;

    audioEngine.setMusicVolume(musicVolume);
    audioEngine.setFXVolume(fxVolume);
}
function setMasterVolume(){
    if(!config.isNotMuted){
        audioEngine.stop('music');
    }else{
        audioEngine.resume('music');
    }
    audioEngine.setSumVolume(config.volume * config.isNotMuted)
}

function setVolume(){
    setMasterVolume()
    setVolumeBalance()
}

export { setVolume, setMasterVolume, setVolumeBalance}
