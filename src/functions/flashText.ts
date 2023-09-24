function flashText(elem:HTMLElement){
    elem.style.transition = 'color ease 0.15s'
    elem.style.color = 'white';
    setTimeout(()=>elem.style.color = '',150)
}

export {flashText}