!function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t){function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.wraper=document.getElementById("app"),this.calcMoves=0,this.gameTime=0,this.gameDifficut=3,this.gameStatistics=JSON.parse(window.localStorage.getItem("gameStatistics"))||[{difficut:3,moves:0,time:0},{difficut:4,moves:0,time:0},{difficut:5,moves:0,time:0},{difficut:6,moves:0,time:0},{difficut:7,moves:0,time:0},{difficut:8,moves:0,time:0}],this.winingRow,this.rings=[{name:8,class:"ring-8"},{name:7,class:"ring-7"},{name:6,class:"ring-6"},{name:5,class:"ring-5"},{name:4,class:"ring-4"},{name:3,class:"ring-3"},{name:2,class:"ring-2"},{name:1,class:"ring-1"}],this.spindles=[{name:1,items:[]},{name:2,items:[]},{name:3,items:[]}],this.startScreen()}var t,n,a;return t=e,(n=[{key:"render",value:function(){this.wraper.innerHTML=" ",this.createGameStatBar();var e=!0,t=!1,i=void 0;try{for(var n,a=this.spindles[Symbol.iterator]();!(e=(n=a.next()).done);e=!0){var r=n.value,s=document.createElement("div");if(s.className="spindle",s.setAttribute("spin",r.name),s.addEventListener("dragover",function(e){e.preventDefault()}),s.addEventListener("dragenter",function(e){e.preventDefault()}),s.addEventListener("dragleave",function(){}),s.addEventListener("drop",function(e){e.preventDefault(),this.dragDrop(e)}.bind(this),!1),r.items.length){var l=!0,o=!1,c=void 0;try{for(var u,d=r.items[Symbol.iterator]();!(l=(u=d.next()).done);l=!0){var m=u.value,f=!1;r.items.indexOf(m)+1===r.items.length&&(f=!0),s.prepend(this.createRing(m,r.name,f))}}catch(e){o=!0,c=e}finally{try{l||null==d.return||d.return()}finally{if(o)throw c}}}this.wraper.appendChild(s)}}catch(e){t=!0,i=e}finally{try{e||null==a.return||a.return()}finally{if(t)throw i}}}},{key:"createRing",value:function(e,t,i){var n=!0,a=!1,r=void 0;try{for(var s,l=this.rings[Symbol.iterator]();!(n=(s=l.next()).done);n=!0){var o=s.value;if(e===o.name){var c=document.createElement("div");return c.className="ring "+o.class,c.setAttribute("data",o.name),c.setAttribute("spindleNumb",t),i&&this.ringDrag(c),c}}}catch(e){a=!0,r=e}finally{try{n||null==l.return||l.return()}finally{if(a)throw r}}}},{key:"createGameStatBar",value:function(){var e=document.createElement("div");e.className="game-bar";var t=document.createElement("div");t.className="bar-moves",t.textContent="Total moves: "+this.calcMoves,e.appendChild(t);var i=document.createElement("div");i.className="bar-timer",i.textContent=this.gameTime.toHHMMSS(),i.setAttribute("id","timer"),e.appendChild(i),this.wraper.appendChild(e)}},{key:"gameTimer",value:function(){var e=0;setTimeout(function t(){e++,this.gameTime=e;var i=document.getElementById("timer");i&&(i.innerHTML=this.gameTime.toHHMMSS(),setTimeout(t.bind(this),1e3))}.bind(this),1e3)}},{key:"ringDrag",value:function(e){e.setAttribute("draggable","true"),e.addEventListener("dragstart",this.dragStart),e.addEventListener("dragend",this.dragEnd)}},{key:"dragStart",value:function(e){e.dataTransfer.setData("text",this.getAttribute("data")),e.dataTransfer.setData("spindleNumb",this.getAttribute("spindleNumb")),this.style.opacity="0.4"}},{key:"dragEnd",value:function(e){}},{key:"dragDrop",value:function(e){e.preventDefault();var t=parseInt(e.target.getAttribute("spin")),i=parseInt(e.dataTransfer.getData("text"),10),n=!0,a=!1,r=void 0;try{for(var s,l=this.spindles[Symbol.iterator]();!(n=(s=l.next()).done);n=!0){var o=s.value;if(o.name===t&&(o.items[o.items.length-1]<i||0===o.items.length)){o.items.push(i);var c=!0,u=!1,d=void 0;try{for(var m,f=this.spindles[Symbol.iterator]();!(c=(m=f.next()).done);c=!0){var v=m.value;v.name===parseInt(e.dataTransfer.getData("spindleNumb"),10)&&(v.items.pop(),this.calcMoves++)}}catch(e){u=!0,d=e}finally{try{c||null==f.return||f.return()}finally{if(u)throw d}}}}}catch(e){a=!0,r=e}finally{try{n||null==l.return||l.return()}finally{if(a)throw r}}this.ifWin()||this.render(),e.dataTransfer.clearData()}},{key:"startScreen",value:function(){var e=document.createElement("div");e.className="startWraper";var t=document.createElement("h1");t.textContent="New Game",e.appendChild(t);var i=document.createElement("label");i.innerHTML='Select difficulty<p id="diffic">'.concat(this.gameDifficut,"</p>"),e.appendChild(i);var n=document.createElement("input");n.setAttribute("class","range-slider"),n.setAttribute("type","range"),n.setAttribute("value","3"),n.setAttribute("min","3"),n.setAttribute("max","8"),n.addEventListener("input",function(e){this.gameDifficut=parseInt(e.target.value),document.getElementById("diffic").innerHTML=this.gameDifficut}.bind(this)),e.appendChild(n);var a=document.createElement("button");a.textContent="Start",a.addEventListener("click",function(e){for(var t=0;t<this.gameDifficut;t++)this.spindles[0].items.push(t+1),this.spindles[1].items=[],this.spindles[2].items=[],this.winingRow=this.spindles[0].items.join(""),this.calcMoves=0,this.gameTime=0;this.gameTimer(),this.render()}.bind(this)),e.appendChild(a),this.wraper.appendChild(e)}},{key:"ifWin",value:function(){if(this.spindles[2].items.join("")===this.winingRow){clearTimeout(),this.wraper.innerHTML=" ";var e=document.createElement("div");e.className="startWraper";var t=document.createElement("h1");t.textContent="Game Over",e.appendChild(t);var i=document.createElement("p");i.textContent="Total moves ".concat(this.calcMoves),e.appendChild(i);var n=document.createElement("ul"),a=!0,r=!1,s=void 0;try{for(var l,o=this.gameStatistics[Symbol.iterator]();!(a=(l=o.next()).done);a=!0){var c=l.value,u=document.createElement("li");c.difficut===this.gameDifficut&&(c.moves>this.calcMoves||0===c.moves||c.time>this.gameTime||0===c.time)&&(u.className="bestVal",c.moves=this.calcMoves,c.time=this.gameTime,t.textContent="You Win!!!",window.localStorage.setItem("gameStatistics",JSON.stringify(this.gameStatistics))),u.textContent="Difficut game: "+c.difficut+" Moves: "+c.moves+" Time: "+c.time.toHHMMSS(),n.appendChild(u)}}catch(e){r=!0,s=e}finally{try{a||null==o.return||o.return()}finally{if(r)throw s}}e.appendChild(n);var d=document.createElement("button");return d.textContent="Start again",d.addEventListener("click",function(t){e.remove(),this.startScreen()}.bind(this)),e.appendChild(d),this.wraper.appendChild(e),!0}}}])&&i(t.prototype,n),a&&i(t,a),e}());Number.prototype.toHHMMSS=function(){var e=Math.floor(this/3600),t=Math.floor((this-3600*e)/60),i=this-3600*e-60*t;return e<10&&(e="0"+e),t<10&&(t="0"+t),i<10&&(i="0"+i),e+":"+t+":"+i}}]);