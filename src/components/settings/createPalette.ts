import { Palette, paletteManager } from "../../paletteManager";
import { PaletteEditor } from "./paletteEditor";
import { renderPaletteList } from "./paletteListUI";

function createPalette(){
    const templatePalette:Palette = [[150,50,50],[50,150,50],[50,50,150]];
  
    new PaletteEditor(templatePalette,'create palette',(palette:Palette)=>{
      paletteManager.add(palette);
      renderPaletteList();
    })
  }

function editPalette(id:string){
    new PaletteEditor(paletteManager.get(id),'edit palette',(palette:Palette)=>{
      paletteManager.replace(id,palette);
      renderPaletteList();
    })
  } 
  
export { createPalette, editPalette }