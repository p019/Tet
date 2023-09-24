import { Palette, PaletteColor } from "../../paletteManager";
import { hexToRgb } from "../../utils/hexToRgb";
import { hsvToRgb } from "../../utils/hsvToRgb";
import { rgbToHex } from "../../utils/rgbToHex";
import { rgbToHsv } from "../../utils/rgbToHsv";
import { PaletteEditorUI } from "./paletteEditorUI";


class PaletteEditor{

    UI:PaletteEditorUI;
    palette:Palette;
    #selectedColorIndex:number = 0;

    #hue:number;
    #sat:number;
    #val:number;
    
    constructor(palette:Palette,title:string,saveFunction:(palette:Palette)=>any){
        this.saveFunction = saveFunction
        this.palette = palette;
        this.UI = new PaletteEditorUI(
            title,
            this.palette,
            this.save.bind(this),
            this.inputHue.bind(this),
            this.inputSaturation.bind(this),
            this.inputValue.bind(this),
            this.inputHex.bind(this),
            this.selectColor.bind(this),
            this.removeColor.bind(this),
            this.addColor.bind(this));

            this.selectColor(this.palette[0])
    }
    get selectedColor(){
        return this.palette[this.#selectedColorIndex];
    }
    set selectedColor(color:PaletteColor){
        color.forEach((value,index)=>{
            this.palette[this.#selectedColorIndex][index] = value
        })
        
    }
    inputHue(value:string){
        this.#hue = parseInt(value);
        this.selectedColor = hsvToRgb(parseInt(value),this.#sat,this.#val);
        this.UI.displayColor(this.selectedColor);
        this.UI.displayHex(rgbToHex(this.selectedColor))
    }
    inputSaturation(value:string){
        this.#sat = parseInt(value);
        this.selectedColor = hsvToRgb(this.#hue,parseInt(value),this.#val);
        this.UI.displayColor(this.selectedColor);
        this.UI.displayHex(rgbToHex(this.selectedColor))
    }
    inputValue(value:string){
        this.#val = parseInt(value);
        this.selectedColor = hsvToRgb(this.#hue,this.#sat,parseInt(value));
        this.UI.displayColor(this.selectedColor);
        this.UI.displayHex(rgbToHex(this.selectedColor))
    }
    inputHex(value:string){
        this.selectedColor = hexToRgb(value);
        const hsv = rgbToHsv(this.selectedColor)
        this.#hue = hsv[0];
        this.#sat = hsv[1];
        this.#val = hsv[2];
        this.UI.displayColor(this.selectedColor);
        this.UI.displayHue(hsv[0]);
        this.UI.displaySaturation(hsv[1]);
        this.UI.displayValue(hsv[2]);
    }
    saveFunction(palette:Palette){}
    save(){
        this.saveFunction(this.palette);
    }
    selectColor(color:PaletteColor){
        this.#selectedColorIndex = this.palette.indexOf(color)// || 0;
        this.UI.displayHex(rgbToHex(this.selectedColor));

        const hsv = rgbToHsv(this.selectedColor);

        this.#hue = hsv[0];
        this.#sat = hsv[1];
        this.#val = hsv[2];

        this.UI.displayHue(hsv[0]);
        this.UI.displaySaturation(hsv[1]);
        this.UI.displayValue(hsv[2])
        this.UI.selectColor(color);
    }
    removeColor(color:PaletteColor){
        this.palette.splice(this.palette.indexOf(color),1);
        this.UI.removeColor(color);
        if(this.palette.length == 0){this.addColor()}
    }
    addColor(){
        const getValue = ()=>Math.floor(Math.random()*256);
        const color:PaletteColor = [getValue(),getValue(),getValue()]
        this.palette.push(color);
        this.UI.addColor(color)
    }
}

export { PaletteEditor } 