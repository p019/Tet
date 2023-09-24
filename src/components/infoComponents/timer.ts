class Timer{
  elem:HTMLElement=document.querySelector('#time')!
  startTime=0;
  timeOut:any=0;
  stopped:boolean=false;
  start(){
    this.stopped = false;
    this.startTime = Date.now();
    this.update();
  }
  update(){
    if(this.stopped){return};
    let currentTime = Date.now();
    let time = currentTime.valueOf() - this.startTime.valueOf();
    this.elem.innerText = `${Math.floor(time / 60000)}:${Math.floor((time % 60000) / 1000)}`;
    this.timeOut = setTimeout(()=>this.update(), 1000 - (time % 1000));
  }
  stop(){
    this.stopped = true;
    clearTimeout(this.timeOut);
  }
}

const timer = new Timer

export { timer }