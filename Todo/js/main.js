/* DOM manipulation helper*/
const listTasks = document.getElementById('listTasks');
const remainingTasks = document.getElementById('remainingTasks');
const allTasks = document.getElementById('allTasks');
const activeTasks = document.getElementById('activeTasks');
const completedTasks = document.getElementById('completedTasks');
const addTaskForm = document.getElementById('addTaskForm');
const newTask = document.getElementById('newTask');

if (localStorage.getItem("toDoList") !== null) {
  getTasks();
}

addTaskForm.addEventListener('submit', saveTask);

function saveTask(e) {
  const todo = {
    id: Date.now(),
    content: newTask.value,
    completed: false
  }

  if (localStorage.getItem("toDoList") === null) {
    let toDoList = [];
    toDoList.push(todo);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  } else {
    let toDoList = JSON.parse(localStorage.getItem('toDoList'));
    toDoList.push(todo);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }
  getTasks();
  addTaskForm.reset();
  e.preventDefault();
}

function getTasks() {
  let toDoList = JSON.parse(localStorage.getItem('toDoList'));

  listTasks.innerHTML = "";

  for (let i = 0; i < toDoList.length; i++) {
    let task = toDoList[i].content;
    let id = toDoList[i].id;
    let status = toDoList[i].completed;
    if(status == true){
      listTasks.innerHTML += `
      <li>
        <a href="#" class = "done" onclick="checkTask(${id})">&#9746</a>
        <span class = "marked" >${task}</span>
        <a href="#" class="del" onclick="deleteTask(${id})"> &#10060;</a>
      </li>
    `;
    }else{
    listTasks.innerHTML += `
      <li>
        <a href="#" class="done" onclick="checkTask(${id})">&#x2610</a>
        <span>${task}</span>
        <a href="#" class = "del" onclick="deleteTask(${id})"> &#10060;</a>
      </li>
    `;
    }
  }
  getRemaining();
  completedTasks.classList.remove("active");
  allTasks.classList.remove("active");
  activeTasks.classList.remove("active");
}

function deleteTask(id) {
  let toDoList = JSON.parse(localStorage.getItem('toDoList'));
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].id == id) {
      toDoList.splice(i, 1);
    } else {
      console.log("error task not found!");
    }
  }

  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  getTasks();
}

function checkTask(id) {
  let toDoList = JSON.parse(localStorage.getItem('toDoList'));
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].id == id) {
      toDoList[i].completed = true;
    }
  }
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  getTasks();
}

function getRemaining(){
  const leftTasks = JSON.parse(localStorage.getItem('toDoList')).filter(x => x.completed == false);
  remainingTasks.innerHTML = `${leftTasks.length} tasks left`;
}

allTasks.addEventListener('click', getAll);

function getAll(){
  getTasks();
  allTasks.classList.add("active");
  activeTasks.classList.remove("active");
  completedTasks.classList.remove("active");
}

activeTasks.addEventListener('click', getActives);

function getActives(){
  let actives = JSON.parse(localStorage.getItem('toDoList')).filter(x => x.completed == false);
  listTasks.innerHTML = "";
  for(let i = 0; i < actives.length ; i++){
    let task = actives[i].content;
    let id = actives[i].id;
      listTasks.innerHTML += `
      <li>
        <a href="#" class="done" onclick="checkTask(${id})">&#x2610</a>
        <span>${task}</span>
        <a href="#" class="del" onclick="deleteTask(${id})" > &#10060;</a>
      </li>
    `;
  }
  activeTasks.classList.add("active");
  allTasks.classList.remove("active");
  completedTasks.classList.remove("active");
}

completedTasks.addEventListener('click', getCompleted);

function getCompleted() {
  let completed = JSON.parse(localStorage.getItem('toDoList')).filter(x => x.completed == true);
  listTasks.innerHTML = "";
  for (let i = 0; i < completed.length; i++) {
    let task = completed[i].content;
    let id =completed[i].id;
    listTasks.innerHTML += `
      <li>
        <a href="#" class="done" onclick="checkTask(${id})">&#9746</a>
        <span class="marked">${task}</span>
        <a a href = "#" class="del" onclick="deleteTask(${id})"> &#10060;</a>
      </li>
    `;
  }
  completedTasks.classList.add("active");
  allTasks.classList.remove("active");
  activeTasks.classList.remove("active");
}