import { makeSyncedWithLocalstorage } from "./utils/makeSyncedWithLocalstorage";

type Config = {
    currentPalette:string,
    volume:number,
    volumeBalance:number,
    isNotMuted:1|0,
    backgroundColor:1|0,
    ghostEnabled:1|0,
}

const defaultConfig:Config = {
    currentPalette:'default',
    volumeBalance:0.5,
    volume:0.5,
    isNotMuted:1,
    backgroundColor:0,
    ghostEnabled:1,
}

const config = makeSyncedWithLocalstorage(defaultConfig,'tetConfig') as Config

export { config }