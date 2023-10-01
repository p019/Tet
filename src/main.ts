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
import { touchController } from './touchController'
import { detectMobile } from './utils/detectMobile'

keyboardEventManager.init()
keyboardEventManager.register([['down','Enter',()=>start()]])


touchController.init(Field.htmlElem)

highestScore.read()
highestScore.setValue()

document.getElementById('start').addEventListener('click',start)
document.getElementById('restart').addEventListener('click',start)

initSettingsUI()


