import { makeInfinite } from "./utils/makeInfinite";
import { makeSyncedWithLocalstorage } from "./utils/makeSyncedWithLocalstorage";

type PaletteColor = [number,number,number];
type Palette = PaletteColor[]

const builtInPalettes:Record<string,Palette>= {
    default:([[255,89,176],[54,56,227],[172,224,52],[69,247,203],[252,187,81]]),
    classic:([[0,255,255],[255,255,0],[128,0,128],[0,255,0],[255,0,0],[0,0,255],[255,127,0],[127,127,127]]),
    standart:([[0,255,255],[0,0,255],[240,163,8],[240,240,8],[8,240,8],[163,8,240],[240,8,8]]),
    pastel:([[201,203,163],[255,225,168],[226,109,92],[114,61,70],[71,45,48]]),
    darkBlue:([[50,50,60],[30,30,40],[20,20,30],[10,10,20],[5,5,10]])
}

class PaletteManager{

    palettes = makeSyncedWithLocalstorage(builtInPalettes,'paletteList');

    constructor(){
        for(let id in this.palettes){
            this.palettes[id] = makeInfinite(this.palettes[id])
        }
    }
       
    add(palette:Palette){
        this.palettes[crypto.randomUUID()] = makeInfinite(palette)
    }
    remove(id:string){
        delete this.palettes[id]
    }
    get(id:string):Palette{
        return this.palettes[id] || builtInPalettes['default']
    }
    replace(id:string,palette:Palette){
        this.palettes[id] = makeInfinite(palette);
    }
}

const paletteManager = new PaletteManager



export { paletteManager, Palette, PaletteColor }