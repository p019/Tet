function hexToRgb(hex:string):[number,number,number]{
    const len = hex.length;
    const r = parseInt(hex.charAt(len-6).concat(hex.charAt(len-5)),16) || 0;
    const g = parseInt(hex.charAt(len-4).concat(hex.charAt(len-3)),16) || 0;
    const b = parseInt(hex.charAt(len-2).concat(hex.charAt(len-1)),16) || 0;

    return [r,g,b];
}

export { hexToRgb }