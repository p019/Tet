  type KeyboardEventType = 'down'|'up'
  type KeyEventList = Record<KeyboardEvent['code'],{enabled:boolean,callback:Function}>
  type KeyHandler = [
    KeyboardEventType,
    KeyboardEvent['code'],
    Function
  ]

  class KeyboardEventManager{
    keyboardEvents:{up:KeyEventList,down:KeyEventList} = {
      up:{},
      down:{},
    }
    init(){
      const downHandler = this.#createHandler('down')
      const upHandler = this.#createHandler('up')
      document.addEventListener('keydown',downHandler)
      document.addEventListener('keyup',upHandler)
    }
    register(keyHandlerList:KeyHandler[]){
      keyHandlerList.forEach(keyHandler=>{
        this.keyboardEvents[keyHandler[0]][keyHandler[1]] = {
          enabled:true,
          callback:keyHandler[2]
        }
      })
    }
    unRegister(keyHandlerList:KeyHandler[]){
      keyHandlerList.forEach(keyHandler=>{
        delete this.keyboardEvents[keyHandler[0]][keyHandler[1]]
      })
    }
    setEnability(keyCodes:string[],value:boolean){
      keyCodes.forEach(code=>{
        this.keyboardEvents.down[code] && (this.keyboardEvents.down[code].enabled = value)
        this.keyboardEvents.up[code] && (this.keyboardEvents.up[code].enabled = value)
      })
    }
    #createHandler(type:KeyboardEventType){
      const targetList = this.keyboardEvents
        return function(event:KeyboardEvent){
          targetList[type][event.code] && 
          targetList[type][event.code].enabled && 
          (targetList[type][event.code].callback(),event.preventDefault());
        }
    }

  }

  const keyboardEventManager = new KeyboardEventManager()

  export { keyboardEventManager }
  export type { KeyHandler }