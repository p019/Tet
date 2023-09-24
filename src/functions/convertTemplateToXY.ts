function convertTemplateToXY(n:number, size:number):[number,number] {
    let side = Math.sqrt(size);
    return [n % side, Math.floor(n / side)]
  }

  export { convertTemplateToXY }