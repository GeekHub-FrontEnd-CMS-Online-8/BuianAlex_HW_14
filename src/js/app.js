
class Game {
  constructor(){
    this.wraper = document.getElementById('app');
    this.calcMoves = 0;
    this.gameTime=0;
    this.gameDifficut = 3;
    this.gameStatistics = JSON.parse(window.localStorage.getItem('gameStatistics')) || 
      [{ difficut: 3, moves: 0, time: 0 }, 
      { difficut: 4, moves: 0, time: 0 }, 
      { difficut: 5, moves: 0, time: 0 }, 
      { difficut: 6, moves: 0, time: 0 }, 
      { difficut: 7, moves: 0, time: 0 }, 
      { difficut: 8, moves: 0, time: 0}];
    this.winingRow;  //if win 
    this.rings = [
      { name: 8, class: 'ring-8'},
      { name: 7, class: 'ring-7'},
      { name: 6, class: 'ring-6'},
      { name: 5, class: 'ring-5'},
      {name: 4, class: 'ring-4'},

      {name: 3, class: 'ring-3'},
      {name: 2, class: 'ring-2'},
      {name: 1, class: 'ring-1'},
    ]

    this.spindles=[
      {
        name: 1,
        items: []
      },
      { 
        name: 2,
        items:[]
      },
      { 
        name: 3,
        items:[]
      }
    ]
    this.startScreen();
  }

  render(){
    this.wraper.innerHTML = " ";
    this.createGameStatBar();
    
    for (let spindle of this.spindles ){
      let element = document.createElement("div");
      element.className = 'spindle';

      element.setAttribute("spin", spindle.name);
      element.addEventListener('dragover', function (e) {
        e.preventDefault();
      });
      element.addEventListener('dragenter', function (e) {
        e.preventDefault();       
      });
      element.addEventListener('dragleave', function () {
      });
      element.addEventListener('drop', function (e) {
        e.preventDefault();
          this.dragDrop(e);
      }.bind(this), false);
       
    
      if(spindle.items.length){
        for(let item of spindle.items){
          let canMove = false;
          if(spindle.items.indexOf(item)+1===spindle.items.length){
            canMove = true;
          } 
          element.prepend(this.createRing(item,spindle.name, canMove));
        } 
        
      }
      
      this.wraper.appendChild(element);
    }
    
  }

  createRing(index, spindle, canMove){

    for (let item of this.rings) {
      
      if (index === item.name){
        let ring = document.createElement("div");
        ring.className = "ring "+item.class;
        ring.setAttribute("data", item.name);
        ring.setAttribute("spindleNumb", spindle);
        if (canMove){
          this.ringDrag(ring);
        }
        return ring;
      }

    } 
  }

  createGameStatBar(){
    let bar = document.createElement("div");
    bar.className = "game-bar"
    
    let moves = document.createElement("div");
    moves.className = "bar-moves";
    moves.textContent = 'Total moves: '+ this.calcMoves;
    bar.appendChild(moves);

    let timer = document.createElement("div");
    timer.className = "bar-timer";
    timer.textContent = this.gameTime.toHHMMSS();
    timer.setAttribute("id", "timer")
    bar.appendChild(timer);

    this.wraper.appendChild(bar);

  }

  gameTimer() {
    let sec=0;
    function timer() {
      sec++;
      this.gameTime=sec;
      
      let timerView = document.getElementById(`timer`);
      if (timerView) {
        timerView.innerHTML = this.gameTime.toHHMMSS();
        setTimeout(timer.bind(this), 1000);
      }
    }
    setTimeout(timer.bind(this), 1000);
  }
  
  ringDrag(element) {
    element.setAttribute("draggable", "true");
    element.addEventListener('dragstart', this.dragStart);
    element.addEventListener('dragend', this.dragEnd);
  }
  dragStart(e) {
    e.dataTransfer.setData('text', this.getAttribute('data')); 
    e.dataTransfer.setData('spindleNumb', this.getAttribute('spindleNumb'));
  }
  dragEnd(e) {

  }
  ///
  dragDrop(e) {
    e.preventDefault();
    let spindleNumber = parseInt(e.target.getAttribute("spin"));
    let ringData = parseInt(e.dataTransfer.getData("text"),10)

    for(let spindelTarget of this.spindles){

      if(spindelTarget.name === spindleNumber){
         
        if(spindelTarget.items[spindelTarget.items.length-1]<ringData||spindelTarget.items.length===0){
         
          spindelTarget.items.push(ringData);
          for(let spindleStart of this.spindles){
            if(spindleStart.name === parseInt(e.dataTransfer.getData("spindleNumb"),10)){
              spindleStart.items.pop();
              this.calcMoves++;
              
            }
          }
        }
      }
    }
    if(!this.ifWin()){
      this.render();
    }
    
    
    e.dataTransfer.clearData();
  }
  
  startScreen(){
    let startWraper = document.createElement("div");
    startWraper.className = "startWraper";

    let newGameText = document.createElement("h1");
    newGameText.textContent = "New Game";
    startWraper.appendChild(newGameText);
    

    let lable = document.createElement("label");
    lable.innerHTML = `Select difficulty<p id="diffic">${this.gameDifficut}</p>`
    startWraper.appendChild(lable);

    let rengeDiff = document.createElement("input");
    rengeDiff.setAttribute("class", 'range-slider');
    rengeDiff.setAttribute("type", 'range');
    rengeDiff.setAttribute("value",  "3");
    rengeDiff.setAttribute("min", "3"); 
    rengeDiff.setAttribute("max", "8");
    rengeDiff.addEventListener('input', function (e) {
      this.gameDifficut = parseInt(e.target.value);
      document.getElementById("diffic").innerHTML = this.gameDifficut;
    }.bind(this));
    startWraper.appendChild(rengeDiff);
    
    let btnStart = document.createElement("button");
    btnStart.textContent = "Start";
    btnStart.addEventListener('click', function (e) {
      for (let i = 0; i<this.gameDifficut; i++ ){
        this.spindles[0].items.push(i+1);
        this.spindles[1].items = [];
        this.spindles[2].items = [];
        this.winingRow = this.spindles[0].items.join('');
        this.calcMoves = 0;
        this.gameTime = 0;
      }
     
      this.gameTimer();
        this.render();
    }.bind(this));

    startWraper.appendChild(btnStart);

    this.wraper.appendChild(startWraper);
  }

  ifWin() {
    if (this.spindles[2].items.join('') === this.winingRow) {
      clearTimeout();
      this.wraper.innerHTML = " ";
      let startWraper = document.createElement("div");
      startWraper.className = "startWraper";

      let newGameText = document.createElement("h1");
      newGameText.textContent = "Game Over";
    startWraper.appendChild(newGameText);

      let moves = document.createElement("p");
      moves.textContent = `Total moves ${this.calcMoves}`;
      startWraper.appendChild(moves);

      let statList = document.createElement("ul");
      for(let key of this.gameStatistics){
        let statRow = document.createElement("li");        
        if (key.difficut === this.gameDifficut && (key.moves > this.calcMoves || key.moves === 0||key.time > this.gameTime || key.time===0 )){
          statRow.className="bestVal";
          key.moves = this.calcMoves;
          key.time = this.gameTime;
          
          newGameText.textContent = "You Win!!!";
          
          window.localStorage.setItem('gameStatistics', JSON.stringify(this.gameStatistics));
        }
        statRow.textContent = "Difficut game: " + key.difficut + " Moves: " + key.moves + " Time: " + key.time.toHHMMSS();
        statList.appendChild(statRow);
      }
      startWraper.appendChild(statList);

      let btnStart = document.createElement("button");
      btnStart.textContent = "Start again";
      btnStart.addEventListener('click', function (e) {
        this.startScreen();
      }.bind(this));
      startWraper.appendChild(btnStart);
      


      this.wraper.appendChild(startWraper);

       
      return true;
    }
  }

}
const newGame = new Game;

Number.prototype.toHHMMSS = function () {
  var sec_num = this;
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds;
}



