type Gesture = 'swipeup' | 'swipedown' | 'swipeleft' | 'swiperight' | 'touchend';

const touchController = {
    callbacks:{
        swipeup:[] as Function[],
        swipedown:[] as Function[],
        swipeleft:[] as Function[],
        swiperight:[] as Function[],
        touchend:[] as Function[],
    },
    init(elem:HTMLElement){
        elem.addEventListener('touchstart',(e)=>this.handleStart(e))
        elem.addEventListener('touchmove',(e)=>this.handleMove(e))
        elem.addEventListener('touchend',(e)=>this.handleEnd(e))
    },
    handleStart(e:TouchEvent){
        this.detectSwipe.startPoint = {x:e.touches[0].screenX,y:e.touches[0].screenY,time:e.timeStamp}
    },
    handleMove(e:TouchEvent){
        this.detectSwipe(e.touches[0].screenX,e.touches[0].screenY,e.timeStamp);
    },
    handleEnd(e:TouchEvent){
        this.callbacks['touchend'].forEach((fn:Function)=>fn());
    },
    detectSwipe(x:number,y:number,time:number){

        const threshold = 5;

        const sp = this.detectSwipe.startPoint;
        const abs = Math.abs

        var getDistance = (x1:number,y1:number,x2:number,y2:number)=>Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
        var distanceToPercent = (distancePX:number)=>distancePX/(window.screen.width/100)
        //var getSpeed = (distance:number,time:number)=>distance/time;

        var difX = x - sp.x;
        var difY = y - sp.y;

        var type = (abs(difX) > abs(difY)) && (difX > 0 && 'swiperight' || 'swipeleft') ||
                                              (difY > 0 && 'swipedown' || 'swipeup');

        var percent = distanceToPercent(getDistance(sp.x,sp.y,x,y))
        var isSwipe = percent > threshold;
        
        isSwipe && this.callbacks[type].forEach((fn:Function)=>fn());

        return isSwipe

    },
    register(type:Gesture,callback:Function){
        this.callbacks[type].push(callback);
    },
    unregister(type:Gesture,callback:Function){
        this.callbacks[type].splice(this.callbacks[type].indexOf(callback),1);
    }

}

export { touchController }
export type { Gesture }