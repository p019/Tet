import { config } from "../../config";
import { paletteManager, Palette } from "../../paletteManager";
import { createPalette, editPalette } from "./createPalette";

let selectedPalette:HTMLElement;
let defaultPalette:HTMLElement;



function createPalletElement(palette:Palette,id:string){
    const mainElement= document.createElement('div');
    mainElement.classList.add('palette');

    const colorBlockWrapper= document.createElement('div');
    colorBlockWrapper.classList.add('paletteColorWrapper');

    const optionsContainer= document.createElement('span');
    optionsContainer.classList.add('paletteOptions');



    palette.forEach(color=>{
        const colorBlock = document.createElement('div');
        colorBlock.classList.add('paletteColor')
        colorBlock.style.background = `rgb(${color[0]},${color[1]},${color[2]})`;
        colorBlockWrapper.appendChild(colorBlock)
    })

    if(id !== 'default'){
        const editButton= document.createElement('span');
        const removeButton= document.createElement('span');

        editButton.innerText = 'edit ';
        removeButton.innerText = 'remove';

        editButton.addEventListener('click',()=>{openPaletteEditor(id)})
        removeButton.addEventListener('click',()=>{
            mainElement.remove()
            paletteManager.remove(id);

            if(id == config.currentPalette){
                config.currentPalette = 'default';
                (()=>defaultPalette)().classList.add('paletteSelected')
                selectedPalette = (()=>defaultPalette)()
            }
        })

        optionsContainer.appendChild(editButton)
        optionsContainer.appendChild(removeButton)
    }else{
        defaultPalette = mainElement;
    }
    if(id === config.currentPalette){
        
        mainElement.classList.add('paletteSelected');
        selectedPalette = mainElement;
    }

    colorBlockWrapper.addEventListener('click',(e)=>{
        config.currentPalette = id;
        mainElement.classList.add('paletteSelected');
        selectedPalette.classList.remove('paletteSelected');
        selectedPalette = mainElement;
    })

    mainElement.appendChild(colorBlockWrapper)
    mainElement.appendChild(optionsContainer)

    return mainElement
}

function renderPaletteList(){
    const parentElem = document.getElementById('paletteList');
    parentElem.innerHTML = '';

    let paletteId
    for(paletteId in paletteManager.palettes){
       parentElem.appendChild(createPalletElement(paletteManager.palettes[paletteId],paletteId))
    }  
}


function handleAddPalette(){
    createPalette()
}

function openPaletteEditor(id:string){
    editPalette(id);
}

export { renderPaletteList, handleAddPalette }