//https://gist.github.com/mjackson/5311256

var round = Math.round

function rgbToHsv(rgb:[number,number,number]){
    var [r,g,b] = rgb
    var h, s, v
    var max = Math.max(r, g, b)
    var min = Math.min(r, g, b)
    var delta = max - min
  
    if (delta === 0) {
      h = 0
    } else if (r === max) {
      h = ((g-b) / delta) % 6
    } else if (g === max) {
      h = (b-r) / delta + 2
    } else if (b === max) {
      h = (r-g) / delta + 4
    }
  
    h = round(h*60)
    if (h < 0) h += 360
  
    s = round((max === 0 ? 0 : (delta / max)) * 100)
  
    v = round(max/255*100)
  
    return [h, s, v]
}

export { rgbToHsv }