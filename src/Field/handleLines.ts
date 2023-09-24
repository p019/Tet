import { Field } from "../Field";
import { audioEngine } from "../audioEngine";
import { highestScore } from "../components/infoComponents/highestScore";
import { level } from "../components/infoComponents/level";
import { score } from "../components/infoComponents/score";

function addScore(n:number,) {
    score.add(n)
    highestScore.write(score.current);
  }

function flashLine(n:number) {
    let line = document.createElement('div');
    line.className = 'rowLine';
    line.style.top = `${n * 5 + 1}%`;
    Field.htmlElem.appendChild(line);
    setTimeout(() => {
      line.className = 'rowLine rowLineEnd';
      setTimeout(() => line.remove(), 150)
    }, 30)
  }

function placeDead(field:Field['field']) {
    field.forEach((row,i)=>{row.forEach(block=>{block!.elem.style.top=i*5+'%'})})
  }

function setTransition(n:number,field:Field['field']) {
    field.forEach(
        (line)=>{
            line.forEach(
                (block,m)=>{
                    block!.elem.style.transition=`top ${2*n/10}s ease-in ${(block!.x+m)/50}s`
                })}
        ) 
}

function deleteRow(n:number, m:number, field:Field["field"]) {
    field[n].forEach(block => {
      block!.elem.remove();
    });
    field.splice(n, 1);
    field.unshift(new Array(10));
    setTransition(m,field);
    placeDead(field);
  }

function handleLines(){
    let n = 0;
    for (let i = 0; i < 20; i++) {
      let count = 0
      for (let j = 0; j < 10; j++) {
        if (this.field[i][j]) { count++ }
      }
      if (count == 10) { n++; deleteRow(i, n, this.field); flashLine(i); }
    }
    addScore(n);
    if (n) { audioEngine.play('row5') }
    //playAudio(`row${n}`);
    score.lineCount += n;
    if (score.lineCount > level.current * 10) { level.increment();}  

}

export { handleLines }