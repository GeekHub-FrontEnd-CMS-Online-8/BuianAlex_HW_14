
export default class Model {
  constructor(view) {
    this.view = view;
    this.taskList = JSON.parse(window.localStorage.getItem('data'))|| [];
    this.lastId = JSON.parse(window.localStorage.getItem('lastID'))|| 1;
    this.loadStep = JSON.parse(window.localStorage.getItem('loadStep')) || 0;
    this.taskFilter = JSON.parse(window.localStorage.getItem('taskFilter')) || "all";
    this.oderTask = JSON.parse(window.localStorage.getItem('oderTask'))|| "up" ;
    this.autorsFilter = JSON.parse(window.localStorage.getItem('autorsFilter'))|| "all";
    this.activeUser = 11;
    this.autorsList = {1:"James",2:"Robert",3:"Michael",4:"William",5:"Linda",6:"Thomas",7:"Nancy",8:"Lisa",9:"Donald",10:"Sandra",11:"Alexx"};
  }

  toStorage(userId, title, fullText, completed = false){
    this.taskList.push({
    "id": this.lastId,
    "userId": userId,    
    "title": title,
    "fullText": fullText,
    "completed": completed});
    this.lastId++;
    this.setLastID(this.lastId); 
    window.localStorage.setItem('data', JSON.stringify(this.taskList));   
  }
  
  findTaskById(id){
    for (let index = 0; index < this.taskList.length; index++) {
      if(this.taskList[index].id==id){
        return {index:index, data: this.taskList[index]}
      }         
    }
  }

  filterTask(filterType){
    this.taskFilter = filterType;
    window.localStorage.setItem('taskFilter', JSON.stringify(this.taskFilter));
  }

  OrderDirection(){
    this.oderTask ==="up"?this.oderTask ="down":this.oderTask ="up";
    window.localStorage.setItem('oderTask', JSON.stringify(this.oderTask));
  }

  autorsFilterState(autor){
    this.autorsFilter = autor;
    window.localStorage.setItem('autorsFilter', JSON.stringify(this.autorsFilter));
  }
  
  setComplited(id){
    let task = this.findTaskById(id);
    task.data.completed = !task.data.completed;
    this.taskList[task.index] =task.data;
    this.updateStorage();
  }

  updateTask(id, title, fullText){
    let task = this.findTaskById(id);    
    task.data.title = title;
    task.data.fullText = fullText;
    this.taskList[task.index] =task.data;
    this.updateStorage();
  }

  deleteTask(id){
    let task = this.findTaskById(id);
    this.taskList.splice(task.index, 1);
    this.updateStorage();
  }
  
  updateStorage(){ 
    window.localStorage.setItem('data', JSON.stringify(this.taskList));
  }

  setLastID(lastId){
    window.localStorage.setItem('lastID', JSON.stringify(lastId)); 
  }

  getAutor(id){
    if( this.autorsList[id]!== undefined){
      return this.autorsList[id];
    }
    else{
      return "no name"
    }   
  }

  loadMore(json ){
    let maxItem = 5;
    if (this.loadStep < json.length){
      
      for (let index = this.loadStep; index < json.length; index++) {
         let stopLoad = this.loadStep +maxItem; 
        if (stopLoad !==   index) {
          this.toStorage(json[index].userId, json[index].title, " ", json[index].completed);         
        }
        else{
          break;
        }
      }
      this.loadStep += maxItem;
      window.localStorage.setItem('loadStep', JSON.stringify(this.loadStep));
    }
    else{
      return false;
    }
  }
    
}