class Timer{
  elem:HTMLElement=document.querySelector('#time')!
  startTime=0;
  pauseTime=0;
  timeOut:any=0;
  stopped:boolean=false;
  start(){
    this.stopped = false;
    this.startTime = Date.now().valueOf();
    this.update();
  }
  update(){
    if(this.stopped){return};
    let currentTime = Date.now().valueOf();
    let time = currentTime - this.startTime;
    this.elem.innerText = `${Math.floor(time / 60000)}:${Math.floor((time % 60000) / 1000)}`;
    this.timeOut = setTimeout(()=>this.update(), 1000 - (time % 1000));
  }
  stop(){
    this.stopped = true;
    clearTimeout(this.timeOut);
  }
  pause(){
    this.stopped = true;
    this.pauseTime = Date.now().valueOf();
    clearTimeout(this.timeOut);
  }
  resume(){
    this.startTime += (Date.now().valueOf() - this.pauseTime);
    this.stopped = false;
    this.update()
  }
}

const timer = new Timer

export { timer }