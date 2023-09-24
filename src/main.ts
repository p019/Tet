import './styles/styles.css'
import './styles/inputRange.css'
import './styles/icons.css'
import './styles/paletteSelector.css'
import './styles/scroll.css'
import './styles/paletteEditor.css'


import { start } from "./start";
import { keyboardEventManager } from "./utils/KeyboardEventManager";
import { highestScore } from './components/infoComponents/highestScore';
import { initSettingsUI } from './components/settings/settingsUI';

keyboardEventManager.init()
keyboardEventManager.register([['down','Enter',()=>start()]])

highestScore.read()
highestScore.setValue()

document.getElementById('start').addEventListener('click',start)

initSettingsUI()

