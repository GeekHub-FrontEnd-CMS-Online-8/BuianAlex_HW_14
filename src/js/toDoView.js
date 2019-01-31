import EventEmitter from './EventEmitter';

export default class View extends EventEmitter { 
  constructor(model, elements) {
    super();
    this.model = model;
    this.wraper = elements.wraper;
    this.btnAddNew = elements.btnAddNew;
    this.btnSave = elements.btnSave;
    this.btnLoadMore = elements.btnLoadMore;
    this.btnShowAll = elements.btnShowAll;
    this.btnShowComleted = elements.btnShowComleted;
    this.btnshowNotCompled = elements.btnshowNotCompled;
    this.btnOrderTasks = elements.btnOrderTasks;
    this.autorSelect = elements.autorSelect;
  }
  
  rebuildTable(){
    this.wraper.innerHTML = " ";
    //set button state 
    this.filterBtnClassToggle();
    this.orderDirectionToggle(); 
    this.createAutorSelector();

    let warningMsg = document.querySelector('.text-msg');
    if (warningMsg){
      warningMsg.remove();
    } 

    this.showTaskList();
  }

  showTaskList(){
    let toShow = this.model.taskList.slice();
    
    //filter by autor
    toShow = this.autorFilter(this.model.autorsFilter, toShow);
    console.log(toShow);
    
    if(toShow.length === 0){
      if(this.model.autorsFilter==="all"){
        this.showMsg("no tasks at all");
      }
      else{
        this.showMsg(this.model.getAutor(this.model.autorsFilter)+ " doesn't have a tasks");
      }
    }


    //filter new-old
    if (this.model.oderTask==="up"){
      toShow.reverse(); 
    }
    
    for (let index = 0; index < toShow.length; index++) {
      
      //filter task state
      switch (this.model.taskFilter) {
        case "completed":
          if (toShow[index].completed){
            this.createTableRow(toShow[index]);
          }
          break;
        case "notCompleted":
          if (!toShow[index].completed) {
            this.createTableRow(toShow[index]);
          }
          break;
        case "all":
          this.createTableRow(toShow[index]);
          break;  
        default: 
          break;
      }     
    }
  }

  autorFilter(autor, taskList){
    if(autor !== "all"){
      let filteredTasks = taskList.filter(function(item) {
        return item.userId == autor;
      });
      return filteredTasks;
    }
    return taskList;
  }

  filterBtnClassToggle(){
    this.btnShowAll.classList.remove("active-filter");
    this.btnShowComleted.classList.remove("active-filter");
    this.btnshowNotCompled.classList.remove("active-filter");
    switch (this.model.taskFilter) {
      case "completed":
        this.btnShowComleted.classList.add("active-filter");
        break;
      case "notCompleted":
        this.btnshowNotCompled.classList.add("active-filter");
        break;
      case "all":
        this.btnShowAll.classList.add("active-filter");
        break;  
      default: 
        break;
    }     
  }

  orderDirectionToggle(){
    if (this.model.oderTask === "down"){
      this.btnOrderTasks.innerHTML = `<i class="fas fa-sort-amount-down"></i>`;
      this.btnOrderTasks.setAttribute('data-title', "Old to new");
    }
    else{
      this.btnOrderTasks.innerHTML = `<i class="fas  fa-sort-amount-up"></i>`;
      this.btnOrderTasks.setAttribute('data-title', "New to old");
    }
  }

  createTableRow(task){
    let taskRow = document.createElement("tr");
    if(task.completed){
      taskRow.classList.add("table-success");
    }

      let taskId = document.createElement("td");
      taskId.innerHTML = task.id;
      taskId.classList.add('task-id');
      taskRow.appendChild(taskId);

      let autor = document.createElement("td");
      autor.classList.add('task-autor');
      autor.innerHTML = this.model.getAutor(task.userId);
      taskRow.appendChild(autor);

      let title = document.createElement("td");
      title.innerHTML = task.title;
      title.classList.add('task-title');
      taskRow.appendChild(title);
      
      let actions = document.createElement("td");
      actions.classList.add('task-action');
      this.createActionBar(actions, task.id,  task.completed);
      taskRow.appendChild(actions);

      this.wraper.appendChild(taskRow);
  }

  createAutorSelector(){

    this.autorSelect.innerHTML=" ";
    let all = document.createElement("option");
    all.innerHTML = "All autors";
    all.setAttribute('value', "all");
    if("all"===this.model.autorsFilter){
        all.setAttribute('selected', " ");
      }
    this.autorSelect.appendChild(all);  
    for(let key in this.model.autorsList ){
      let option = document.createElement("option");
      option.innerHTML = this.model.autorsList[key];
      option.setAttribute('value', key);
      if(key===this.model.autorsFilter){
        option.setAttribute('selected', " ");
      }
      this.autorSelect.appendChild(option);  
    }    
  }

  showMsg(text){
    let textWraper = document.createElement("div");
    textWraper.classList.add("text-msg");
    textWraper.textContent = text;
    document.querySelector("body").prepend(textWraper);
  }
  
  createActionBar(taskRow, idTask, status) {
    let del = `<i class="fas fa-trash-alt"></i>`;
    let edit = `<i class="fas fa-edit fa-sm"></i>`;
    let wait = `<i class="far fa-square"></i>`;
    let done = `<i class="fas fa-check"></i>`;
    let taskStatus = 0;

    let donBtn = document.createElement("button");
    donBtn.classList.add("btn");
    donBtn.classList.add("btn-outline-success");
    donBtn.setAttribute("data-index", idTask);
    switch (status) {
      case true:
          taskStatus =  done;
          donBtn.setAttribute('data-title',"Set uncomplete");
          break;
  
      default:
        donBtn.setAttribute('data-title',"Set complete");
        taskStatus =  wait;
        break;
    }
    donBtn.innerHTML  = taskStatus;
    
    donBtn.addEventListener('click',
    (e) => this.emit('completed',e.currentTarget));      
    
    taskRow.appendChild(donBtn);

    let showBtn = document.createElement("button");
    showBtn.classList.add("btn");
    showBtn.classList.add("btn-outline-primary");
    showBtn.setAttribute("data-index", idTask);
    showBtn.setAttribute('data-title',"Edit task");
    showBtn.innerHTML  = edit;
    showBtn.addEventListener("click",
      (e) => this.emit('show', e.currentTarget));
    taskRow.appendChild(showBtn);
    
    let delBtn = document.createElement("button");
    delBtn.classList.add("btn");
    delBtn.classList.add("btn-outline-danger");
    delBtn.setAttribute("data-index", idTask);
    delBtn.setAttribute('data-title',"Delete task");
    delBtn.innerHTML  = del;
    delBtn.addEventListener("click", 
    (e) => this.emit('delete',e.currentTarget));
    taskRow.appendChild(delBtn);       
  }

};
