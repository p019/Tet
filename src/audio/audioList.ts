/*const row1 = new URL('./row2_C.mp3', import.meta.url).href
const row2 = new URL('./row2_2.mp3', import.meta.url).href
const row3 = new URL('./row2_3.mp3', import.meta.url).href
const row4 = new URL('./row2_4.mp3', import.meta.url).href
const row5 = new URL('./row3.mp3', import.meta.url).href
const hit = new URL('./hitSound6.mp3', import.meta.url).href
const music = new URL('./Dire_Straits_-_You_And_Your_Friend.mp3', import.meta.url).href
const move = new URL('./move2.mp3', import.meta.url).href
const air = new URL('./air7.mp3', import.meta.url).href



const audioUrlList:Record<string,[AudioType,string]> = {
 row1:['fx',row1],
 row2:['fx',row2],
 row3:['fx',row3],
 row4:['fx',row4],
 row5:['fx',row5],
 hit:['fx',hit],
 music:['music',music],
 move:['fx',move],
 air:['fx',air],
} */
type AudioType = 'fx' | 'music';

type typeAndURL=  [AudioType,string]
interface audioRecord{[name:string]:typeAndURL}
function makeRecord<T extends audioRecord>(input:T){return input}

const audioUrlList = makeRecord({
    row1:['fx',new URL('./row2_C.mp3', import.meta.url).href],
    row2:['fx',new URL('./row2_2.mp3', import.meta.url).href],
    row3:['fx',new URL('./row2_3.mp3', import.meta.url).href],
    row4:['fx',new URL('./row2_4.mp3', import.meta.url).href],
    row5:['fx',new URL('./row3.mp3', import.meta.url).href],
    hit:['fx',new URL('./hitSound6.mp3', import.meta.url).href],
    music:['music',new URL('./korobeiniki2.mp3', import.meta.url).href],
    move:['fx',new URL('./move2.mp3', import.meta.url).href],
    air:['fx',new URL('./air7.mp3', import.meta.url).href],
    end:['fx',new URL('./red.mp3',import.meta.url).href]
   })

type SoundName = keyof typeof audioUrlList;
  
export { audioUrlList }
export type { SoundName, AudioType }