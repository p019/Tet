import { touchController } from "../touchController";

type Direction = 'down'|'up'|'left'|'right';

var unMapSwipeToKey:Function


function mapSwipeToKey(){

    var dispatch = (e:KeyboardEvent)=>document.dispatchEvent(e)
    
    var getEvent = (type:'down'|'up')=>{
        return {
            down:new KeyboardEvent(`key${type}`,{code:'ArrowDown'}),
            up:new KeyboardEvent(`key${type}`,{code:'ArrowUp'}),
            left:new KeyboardEvent(`key${type}`,{code:'ArrowLeft'}),
            right:new KeyboardEvent(`key${type}`,{code:'ArrowRight'}),
        };
    };

    var lastSwipe:Direction;

    var handleDown = ()=>{handle('down')}
    var handleUp = ()=>{handle('up')}
    var handleLeft = ()=>{handle('left')}
    var handleRight = ()=>{handle('right')}
    var handleEnd = ()=>{handle('end')}

    touchController.register('swipedown',handleDown)
    touchController.register('swipeup',handleUp)
    touchController.register('swipeleft',handleLeft)
    touchController.register('swiperight',handleRight)
    touchController.register('touchend',handleEnd)



    function handle(gesture:'down'|'up'|'left'|'right'|'end'){

        var isShort = (!lastSwipe && gesture == 'end')

        isShort && dispatch(getEvent('down')['up']);

        if ((lastSwipe && gesture!== 'end') || isShort) return;
     
    
        gesture == 'end' ? (dispatch(getEvent('up')[lastSwipe]), lastSwipe = undefined)
                         : (dispatch(getEvent('down')[gesture]), lastSwipe = gesture);

    }

    unMapSwipeToKey = ()=>{
        touchController.unregister('swipedown',handleDown)
        touchController.unregister('swipeup',handleUp)
        touchController.unregister('swipeleft',handleLeft)
        touchController.unregister('swiperight',handleRight)
        touchController.unregister('touchend',handleEnd)

        lastSwipe = undefined;
    }

}

export { mapSwipeToKey, unMapSwipeToKey }