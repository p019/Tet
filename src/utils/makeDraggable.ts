function createMakeDraggable(){

   var lastDraggable:HTMLElement

   return function makeDraggable(elem:HTMLElement,dragStartingAreaElem:HTMLElement) {

      let startX = 0;
      let startY = 0;
      let lastX = 0;
      let lastY = 0;
   
      let mouseDown = false
   
      function move(e:MouseEvent){
   
         function translate(){
             if(mouseDown){
               elem.style.transform  = `translate(${e.clientX-startX+lastX}px,${e.clientY-startY+lastY}px)`
             }
         }
   
         if(mouseDown){
            window.requestAnimationFrame(translate)
         }
      }
   
      function startDrag(e:MouseEvent){
         
         lastDraggable && (lastDraggable.style.zIndex = '1',elem.style.zIndex ='2');
         lastDraggable = elem

         if(e.target !== dragStartingAreaElem){return} 
  
         mouseDown = true
         startX = e.clientX
         startY = e.clientY
         
         document.body.addEventListener('mousemove',move)
         document.body.addEventListener('mouseup',endDrag)
      }
   
      function endDrag(e:MouseEvent){
         mouseDown = false
         lastX = e.clientX-startX+lastX
         lastY = e.clientY-startY+lastY
   
         document.body.removeEventListener('mousemove',move)
         document.body.removeEventListener('mouseup',endDrag)
      }
    
      dragStartingAreaElem.addEventListener('mousedown',e=>{startDrag(e)})
   
      return elem;
   
   }

}


const makeDraggable = createMakeDraggable();

 export { makeDraggable }