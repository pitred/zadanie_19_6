class Stopwatch extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         running: false,
         times: {
            minutes: 0,
            seconds: 0,
            milliseconds: 0
         }
      };
   }
   reset() {
      this.setState({
         times: {
            minutes: 0,
            seconds: 0,
            milliseconds: 0
         }
      });
      this.state.running = false;
   }

   format(times) {
      return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.milliseconds))}`;
   }

   start() {
      if (!this.state.running) {
         this.setState({
            running: true,
            watch: setInterval(() => this.step(), 10)
         });
      }
   }

   step() {
      if (!this.state.running) return;
      this.calculate();
   }

   calculate() {
      this.state.times.milliseconds += 1;
      if (this.state.times.milliseconds >= 100) {
         this.state.times.seconds += 1;
         this.state.times.milliseconds = 0;
      }
      if (this.state.times.seconds >= 60) {
         this.state.times.minutes += 1;
         this.state.times.seconds = 0;
      }
      this.setState({
         times: this.state.times
      });
   }

   stop() {
      clearInterval(this.state.watch);
      this.setState({
         running: false
      });
   }

   save(times) {
      let results = document.querySelector('.results');
      let itemLi = document.createElement('li');
      itemLi.innerText = this.format(this.state.times);
      results.appendChild(itemLi);
   }
   erase() {
      document.querySelector('.results').innerText = '';
   }

   render() {
      return (
         <div className={'app'}>
            <nav className={'controls'}>
               <a href={'#'} className={'button'} id={'start'} onClick={() => this.start()}>
                  start
               </a>
               <a href={'#'} className={'button'} id={'stop'} onClick={() => this.stop()}>
                  stop
               </a>
               <a href={'#'} className={'button'} id={'reset'} onClick={() => this.reset()}>
                  reset
               </a>
               <a href={'#'} className={'button'} id={'save'} onClick={() => this.save()}>
                  save
               </a>
               <a href={'#'} className={'button'} id={'erase'} onClick={() => this.erase()}>
                  erase
               </a>

               <div className={'stopwatch'}>{this.format(this.state.times)}</div>
               <ul className={'results'} />
            </nav>
         </div>
      );
   }
}

function pad0(value) {
   let result = value.toString();
   if (result.length < 2) {
      result = '0' + result;
   }
   return result;
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
