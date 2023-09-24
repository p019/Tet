import { Palette, PaletteColor } from "../../paletteManager";
import { makeDraggable } from "../../utils/makeDraggable";

class PaletteEditorUI {
  static container:HTMLElement = document.getElementById('editorContainer');
  static template = `
<div class="closeIcon settingsCloseIconSvg"></div>
<span class="paletteEditorTitle"></span>
<div class="edpalette"></div>
<div class='addColorButton'><button>add color</button></div>
<div>
  <span class="inputLabel">H</span>
  <a title="hue"><input class='inputHue' min=0 max=359 type='range'></a>
</div>
<div>
  <span class="inputLabel">S</span>
  <a title="saturation"><input class='inputSat' min=0 max=100 step=0.5 type='range'></a>
</div>
<div>
  <span class="inputLabel">V</span>
  <a title="value"><input class='inputVal' min=0 max=100 step=0.5 type='range'></a>
</div>
<div>
  <span class="hexInputLabel">hex</span>
  <input type="text" class="hexInput" value="#29b369">
</div>
<div class='savePaletteButton'><button>save</button></div>
`;

colorlist:Map<PaletteColor,HTMLElement> = new Map();

selectedColorElem:HTMLElement;

displayHue:Function;
displaySaturation:Function;
displayValue:Function;
displayHex:Function;

displayColor:(color:PaletteColor)=>void;

selectColor:(color:PaletteColor)=>void;
removeColor:(color:PaletteColor)=>void
addColor:(color:PaletteColor)=>void


constructor(title:string,
            palette:Palette,
            saveHandler:Function,
            hueHandler:Function,
            satHandler:Function,
            valHandler:Function,
            hexHandler:Function,
            selectColor:Function,
            removeColor:Function,
            addColor:Function,)
{
    const mainElem = this.#create(saveHandler,hueHandler,satHandler,valHandler,hexHandler,selectColor,removeColor,addColor,palette,title)
    PaletteEditorUI.container.appendChild(makeDraggable(mainElem,mainElem)); 
}

#create(
  saveHandler:Function,
  hueHandler:Function,
  satHandler:Function,
  valHandler:Function,
  hexHandler:Function,
  selectColor:Function,
  removeColor:Function,
  addColor:Function,
  palette:Palette,
  title:string,
){
    const paletteEditorElem = document.createElement('div');
    paletteEditorElem.classList.add('paletteEditor')
    paletteEditorElem.innerHTML = PaletteEditorUI.template;

    paletteEditorElem.querySelector('.edpalette').appendChild(this.#createPalette(palette,selectColor,removeColor));

    const titleElem:HTMLElement =  paletteEditorElem.querySelector('.paletteEditorTitle')
    titleElem.innerText = title;

    const hueInputElem:HTMLInputElement = paletteEditorElem.querySelector('.inputHue');
    const saturationInputElem:HTMLInputElement = paletteEditorElem.querySelector('.inputSat');
    const valueInputElem:HTMLInputElement = paletteEditorElem.querySelector('.inputVal');
    const hexInputElem:HTMLInputElement = paletteEditorElem.querySelector('.hexInput');

    this.displayHue = (value:number)=>hueInputElem.value = value.toString();
    this.displaySaturation = (value:number)=>saturationInputElem.value = value.toString();
    this.displayValue = (value:number)=>valueInputElem.value = value.toString();
    this.displayHex = (value:string)=>hexInputElem.value = value;

    hexInputElem.addEventListener('input',()=>hexHandler(hexInputElem.value));
    saturationInputElem.addEventListener('input',()=>satHandler(saturationInputElem.value))
    valueInputElem.addEventListener('input',()=>valHandler(valueInputElem.value))
    hueInputElem.addEventListener('input',()=>hueHandler(hueInputElem.value))

    paletteEditorElem.querySelector('.savePaletteButton').addEventListener('click',()=>saveHandler());
    paletteEditorElem.querySelector('.closeIcon').addEventListener('click',()=>paletteEditorElem.remove());
    paletteEditorElem.querySelector('.addColorButton').addEventListener('click',()=>addColor());

    return paletteEditorElem;
}

#createPalette(palette:Palette,selectColor:Function,removeColor:Function){

  const colorWrapper = document.createElement('div');
  colorWrapper.classList.add('edpaletteColorWrapper');

  function createColor(color:PaletteColor,colorlist:PaletteEditorUI['colorlist']){
    const colorElem = document.createElement('div');
    colorElem.classList.add('edpaletteColor');

    const removeButton = document.createElement('div');
    removeButton.innerText = 'remove'
    removeButton.classList.add('colorRemoveButton');

    colorElem.style.background = `rgb(${color[0]},${color[1]},${color[2]})`

    colorElem.addEventListener('click',()=>selectColor(color))
    removeButton.addEventListener('click',(e)=>{e.stopPropagation();removeColor(color)})

    colorElem.appendChild(removeButton)
    colorWrapper.appendChild(colorElem);
    
    colorlist.set(color,colorElem);
  }

  palette.forEach((color:PaletteColor)=>createColor(color,this.colorlist))

  this.addColor = (color:PaletteColor)=>{createColor(color,this.colorlist)}
  
  this.removeColor = (color:PaletteColor)=>{
    this.colorlist.get(color).remove()
    this.colorlist.delete(color);
  }
  this.selectColor = (color:PaletteColor)=>{
    this.selectedColorElem && this.selectedColorElem.classList.remove('edcolorSelected');
    this.colorlist.get(color).classList.add('edcolorSelected');
    this.selectedColorElem = this.colorlist.get(color);
  }
  this.displayColor = (color:PaletteColor)=>{
    this.selectedColorElem.style.background = `rgb(${color[0]},${color[1]},${color[2]})`;
  }
  
  return colorWrapper
}

}

export { PaletteEditorUI }
