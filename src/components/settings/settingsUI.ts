import { audioEngine } from "../../audioEngine";
import { config } from "../../config";
import { setMasterVolume, setVolume, setVolumeBalance } from "../../functions/setVolume";
import { ghost } from "../../ghost";
import { paletteManager } from "../../paletteManager";
import { handleAddPalette, renderPaletteList } from "./paletteListUI";

const settingsBlock = document.querySelector('#settings');

const settingsUI = {

    icon:document.querySelector('#settingsIcon'),
    inner:document.querySelector('#settingsInner'),
    opened: false,
    toggle() {
      this.opened ? this.close() : this.open()    
      this.opened = !this.opened;
    },
    open() {
      settingsBlock.className = 'settingsOpen';
      soundButton.opacity(1);

      this.icon.className = 'settingsCloseIconSvg'
      this.inner.style.display = 'block'
    },
    close() {
      settingsBlock.className = 'settingsClose';
      soundButton.opacity(0);

      this.icon.className = 'settingsIconSvg';
      this.inner.style.display = 'none'
    }
  }

const soundButton = {
    icon:document.querySelector('#soundIcon'),
    muted: false,
    toggle() {
      this.muted = !this.muted;
      this.setIcon()
      const flag = this.muted ? 0 : 1;
      config.isNotMuted = flag;
      if (audioEngine.isInited) {
        setVolume();
      }
  
    },
    opacity(p:Boolean|1|0) {
      this.icon.style.opacity = p ? '0' : '100'
    },
    setState(){
      this.muted = !config.isNotMuted;
      this.setIcon()
    },
    setIcon(){
      this.icon.className = this.muted ? 'volumeMuteIconSvg' : 'volumeIconSvg';
    }
  }

const volumeBlock ={
    mainVolumeElem:document.getElementById('inputMainVolume'),
    volumeBalanceElem:document.getElementById('inputVolumeBalance'),
    init(){
      this.mainVolumeElem.value = config.volume;
      this.volumeBalanceElem.value = config.volumeBalance;

        this.mainVolumeElem.addEventListener('input',()=>{
            config.volume = this.mainVolumeElem.value;
            setMasterVolume()
        })
        this.volumeBalanceElem.addEventListener('input',()=>{
            config.volumeBalance = this.volumeBalanceElem.value;
            setVolumeBalance()
        })
    }
}

const backgroundToggler = {
    inputElem:document.getElementById('inputBackgroundTheme'),
    styleElem:document.createElement('style'),
    themes:[
    "--bg-color:rgb(60,60,60);--brdr-color:rgba(150,150,150,0.5);",
    "--bg-color:rgb(60,60,90);--brdr-color:rgba(150,150,200,0.5);"
    ],
    init(){
      this.inputElem.value = config.backgroundColor
      document.body.append(this.styleElem);
      this.inputElem.addEventListener('input',()=>this.set())
      this.set()
    },
    set(){
      const inputValue = this.inputElem.value == 0 ? 0 : 1;
      this.styleElem.innerHTML = ':root{' + this.themes[inputValue] + '}'
      config.backgroundColor = inputValue;
    }
}

const addPaletteButton = {
    elem:document.getElementById('addButton'),
    init(){this.elem.addEventListener('click',()=>{
      handleAddPalette()
    })}
}

const toggleGhost = {
  elem:document.getElementById('inputGhost'),
  init(){
    this.elem.addEventListener('change',()=>this.set());
    const value = config.ghostEnabled ? 1 : 0;
    this.elem.value = value
    ghost.setAppearance(value)
  },
  set(){
    const value = this.elem.value == 0 ? 0 : 1;
    config.ghostEnabled = value
    ghost.setAppearance(value)
  }
}

  function initSettingsUI(){
    settingsUI.icon.addEventListener('click', settingsUI.toggle.bind(settingsUI));
    soundButton.icon.addEventListener('click', soundButton.toggle.bind(soundButton));
    volumeBlock.init()
    backgroundToggler.init()
    soundButton.setState()
    renderPaletteList()
    addPaletteButton.init()
    toggleGhost.init()
  }
  
export { initSettingsUI }