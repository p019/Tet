import { AudioType, SoundName, audioUrlList } from "./audio/audioList"


interface MyAudioElem extends HTMLAudioElement{
   type:string
}


function loudness(value:number):number{
   const res = Math.max((Math.exp(value*4.0)/55)-0.02,0)
   return res
}

class AudioEngine{
   
   static load(url:string){
      const audio = new Audio;
      audio.src = url
      return audio
   }

   constructor(urlList:Record<SoundName,[AudioType,string]>){
       this.urlList = urlList;
       this.preload()
   };

   urlList:Record<SoundName,[AudioType,string]>;

   isInited:Boolean=false;

   audio = {} as Record<SoundName,MyAudioElem>

   initAudio(){
      if(this.isInited){return}

      const audioContext = new AudioContext;

      const SFXVolumeNode = audioContext.createGain();
      const musicVolumeNode = audioContext.createGain();
      const sumVolumeNode = audioContext.createGain();
      
      SFXVolumeNode.connect(sumVolumeNode)
      musicVolumeNode.connect(sumVolumeNode)

      sumVolumeNode.connect(audioContext.destination)
      
      let name:SoundName
      for(name in this.audio){
         const audioSource = audioContext.createMediaElementSource(this.audio[name]);
         const destination = this.audio[name].type == 'music'? musicVolumeNode : SFXVolumeNode;
         audioSource.connect(destination);
      }

      function createVolumeSetter(node:GainNode){
         return (value:number)=>{node.gain.linearRampToValueAtTime(loudness(value), audioContext!.currentTime + 0.1)}
      }
      
      this.setMusicVolume = createVolumeSetter(musicVolumeNode)
      this.setFXVolume = createVolumeSetter(SFXVolumeNode)
      this.setSumVolume = createVolumeSetter(sumVolumeNode)

      this.isInited = true
   };
   preload(){
      let name:SoundName;
      for(name in this.urlList){
         this.audio[name] = Object.assign(AudioEngine.load(this.urlList[name][1]),{type:this.urlList[name][0]})
      } 
   };
   play(name:SoundName,duration:number|undefined = undefined){
      this.audio[name].currentTime=0;
      this.audio[name].play()
      duration && setTimeout(()=>{this.audio[name].pause()},duration)
   };
   stop(name:SoundName){
      this.audio[name].currentTime=0;
      this.audio[name].pause()
   }
   repeatPlay(name:SoundName){
      const play = this.play.bind(this)
      play(name);
      this.audio[name].addEventListener('ended', ()=>play(name));
   }
   setSpeed(name:SoundName,multiplier:number){
      this.audio[name].playbackRate = multiplier;
   }
   setMusicVolume(value:number){value};
   setFXVolume(value:number){value}
   setSumVolume(value:number){value}
}

const audioEngine = new AudioEngine(audioUrlList)



export { audioEngine }