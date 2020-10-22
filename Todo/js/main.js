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

    listTasks.innerHTML += `
    <li>
      <a href="#" class="done" onclick="checkTask(${id})">O</a>
      <span>${task}</span>
      <a href="#" class="del" onclick="deleteTask(${id})">X</a>
    </li>
    `;
  }
  getRemaining();
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
    } else {
      console.log("error task not found!");
    }
  }
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  getTasks();
}

function getRemaining(){
  const leftTasks = JSON.parse(localStorage.getItem('toDoList')).filter(x => x.completed == false);
  remainingTasks.innerHTML = `${leftTasks.length} tasks left`;
}

