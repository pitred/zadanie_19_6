class Stopwatch {
   constructor(display) {
      this.running = false;
      this.display = display;
      this.reset();
      this.print(this.times);
   }
   reset() {
      this.times = {
         minutes: 0,
         seconds: 0,
         milliseconds: 0
      };
      this.print();
      this.running = false;
   }
   print() {
      this.display.innerText = this.format(this.times);
   }
   format(times) {
      return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.milliseconds))}`;
   }
   start() {
      if (!this.running) {
         this.running = true;
         this.watch = setInterval(() => this.step(), 10);
      }
   }
   step() {
      if (!this.running) return;
      this.calculate();
      this.print();
   }
   calculate() {
      this.times.milliseconds += 1;
      if (this.times.milliseconds >= 100) {
         this.times.seconds += 1;
         this.times.milliseconds = 0;
      }
      if (this.times.seconds >= 60) {
         this.times.minutes += 1;
         this.times.seconds = 0;
      }
   }
   stop() {
      this.running = false;
      clearInterval(this.watch);
   }
   save() {
      let results = document.querySelector('.results');
      let itemLi = document.createElement('li');
      itemLi.innerText = this.format(this.times);
      results.appendChild(itemLi);
   }
   erase() {
      document.querySelector('.results').innerText = '';
   }
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.save());

let eraseButton = document.getElementById('erase');
eraseButton.addEventListener('click', () => stopwatch.erase());

function pad0(value) {
   let result = value.toString();
   if (result.length < 2) {
      result = '0' + result;
   }
   return result;
}
