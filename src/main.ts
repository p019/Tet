import './styles/styles.css'
import './styles/inputRange.css'
import './styles/icons.css'
import './styles/paletteSelector.css'
import './styles/scroll.css'
import './styles/paletteEditor.css'
import './styles/mobile.css'


import { start } from "./start";
import { keyboardEventManager } from "./utils/KeyboardEventManager";
import { highestScore } from './components/infoComponents/highestScore';
import { initSettingsUI } from './components/settings/settingsUI';
import { Field } from './Field'
import { touchController } from './utils/touchController'
import { handleResize } from './utils/dynamicWindowSize'


handleResize()
window.addEventListener('resize',handleResize)

const workerScript = document.createElement('script');
workerScript.src = new URL('./sw.js', import.meta.url).href;
workerScript.setAttribute('type','text/javascript');

navigator.serviceWorker.register(new URL('./sw.js', import.meta.url).href)//
navigator.serviceWorker.ready.then((registration) => {
    registration.active.postMessage(
        {isStandalone:(window.matchMedia('(display-mode: standalone)').matches)}
    );
  });

keyboardEventManager.init()
keyboardEventManager.register([['down','Enter',()=>start()]])


touchController.init(Field.htmlElem)

highestScore.read()
highestScore.setValue()

document.getElementById('start').addEventListener('click',start)
document.getElementById('restart').addEventListener('click',start)

initSettingsUI()


