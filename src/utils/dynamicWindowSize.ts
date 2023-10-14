//@ts-nocheck

function handleResize(event?:Event){
    document.activeElement.style.setProperty('--dvh',`${window.innerHeight / 100}px`)
    document.activeElement.style.setProperty('--dvw',`${window.innerWidth / 100}px`)
}

export { handleResize }