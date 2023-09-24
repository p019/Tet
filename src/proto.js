/*

// placed // color

// alive  // color 

//keyboard events

// step timer 

// ROUND_Obj : timer , placed, alive

function STEP(){
	if check(field,alive){
	   alive.position.y ++ 
	}else{
	   kill(alive,field),
	   checkRow(field),
	   if(out){gameover()}
	}
}

stepper.STEP = STEP
const stepper = new Stepper(roundState,updater.stop)
const updater = new Updater()
updater.callback = stepper.STEP
updater.tick = getTime(round.level)
updater.wait = function(ms){}
updater.start = function(){}
updater.stop = function(){}

const display = new Display()

display.emit = function(config){}
display.update(x,y)
display.place()

///
 
updatePosition(state){
	   alive = applyPositionChanges(alive)
	   display.update(alive)
}

keyboardInput.subscribe(updatePosition)
updater.callback = step()
function step(){
	check(alive)
	updatePosition(alive)
}

function applyPositionChange(state){
	
}

function loop(){
	updater.callback = ()=>{ addPositionChange(0,1); check(state) }

}

//

function hardDrop(alive,placed)

function startGame(){
	
    
     import updater
     import check // check(alive,placed)



	// clear html

	var alive = bag.get()
	var placed = [];
    display.next(bag.getNext())

	function step(){
	   alive = stepDown(alive)

	}
	updater.setCallback(step)
	updater.start()



	const keyboardMap = [
	['down','w',()=>position.change(rotate)],
	['down','s',()=>controller.aDown(()=>{
	     { alive, placed } = hardDrop(alive,placed)
	     display.update(alive)
	     display.place(alive)
	}]
	]
	keyboard.register(keybordMap)
}

objects : BAG,STEPPER,KEYBOARD,LEVEL,DISPLAY,SCORETABLE,TIMER,AUDIOENGINE

//

function createUpdateFunction(state){
	return function update(){
	    state = position.apply(state)
	    display.update(state)
	    check(state)
	    return state
	}
}

updater.callback = position.change(oneDown)

//

function hardDrop() {
  if (!round.wait) {
    let c = 0;
    //clearTimeout(round.timeOut)
    while (!checkFigure(round.alive, 0, c)) { c++ }

    round.alive.forEach(block => block.elem.style.transitionDuration = `${0.025 * c}s`);
    changeCoords(round.alive, 0, c - 1);
    round.wait = true;
    //setTimeout(() => { round.wait = false; update() }, 25 * c + 50)

    updater.wait(25*c+50)

    placeFigure(round.alive);

    playAudio('air', false, 25 * c);
  }
}

//

class Field{
	alive:[],
	placed:[],
	emitTetromino(){
	
	}
	placeTetromino(){
	
	}
	hardDrop(){
	
	}
	moveTetromino(x,y){
	
	}
	checkPosition(tetromino,shiftX,shiftY){
	
	}
	checkRow(){
	
	}
	deleteRow(n){
	
	}
	rotateTetromino(){
	
	}
}