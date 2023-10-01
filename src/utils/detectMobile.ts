function detectMobile(){
    return (window.screen.height > window.screen.width && navigator.maxTouchPoints > 0)
}

export { detectMobile }