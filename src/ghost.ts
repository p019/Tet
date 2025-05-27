function createGhost(parent:HTMLElement){
    return Array(4).fill(undefined).map(()=>{
        var ghostBlock = document.createElement('div');
            ghostBlock.classList.add('ghostBlock','block','main');
            requestAnimationFrame(()=>{
                parent.appendChild(ghostBlock);
            })
        return ghostBlock;
        })
}

class Ghost{
    ghost:HTMLElement[];
    check:Function;
    getAlive:Function;
    visibility:1|0 = 1;
    init(getAlive:Function,check:Function,parent:HTMLElement){
        this.getAlive = getAlive
        this.check = check;
        this.ghost = createGhost(parent)
        this.setAppearance(this.visibility)
        return this
    }
    update(){
        var alive = this.getAlive()
        var c = 0 ;
        while (this.check(alive, 0, c)) { c++ ; };
        requestAnimationFrame(()=>{
            this.ghost.forEach((ghostBlock:HTMLElement,i:number)=>{
                ghostBlock.style.transform = `translate(${alive[i].x * 100}%,${(alive[i].y + c - 1) * 100}%)`; 
                })
            })
    }
    setAppearance(param:1|0){ 
        if(this.ghost){
            this.ghost.forEach(block=>{  
                block.style.display = param ? 'block' : 'none';
            })
            this.getAlive().length && this.update()
        }
        this.visibility = param;
    }
}

const ghost = new Ghost

export { ghost }