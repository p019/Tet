function rgbToHex(rgb:[number,number,number]){
    return `#${(rgb[0]>>4).toString(16)}`+
            `${(rgb[0]%16).toString(16)}`+
            `${(rgb[1]>>4).toString(16)}`+
            `${(rgb[1]%16).toString(16)}`+
            `${(rgb[2]>>4).toString(16)}`+
            `${(rgb[2]%16).toString(16)}`;
}

export { rgbToHex }