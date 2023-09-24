import { flashText } from "../../functions/flashText";

const highestScoreElem:HTMLElement = document.querySelector('#record')!

const highestScore = {
    record: 0,
    read() {
      this.record = parseInt(window.localStorage.getItem('record') || '0') ;
    },
    write(n:number) {
      if (n > this.record) {
        this.record = n;
        window.localStorage.setItem('record', this.record.toString()),
        this.setValue();
        flashText(highestScoreElem)
      }
    },
    setValue() {
      highestScoreElem.innerText = this.record.toString()
    }
  }

  export { highestScore }