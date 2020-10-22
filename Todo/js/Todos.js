import {
  getTasks,
  saveTask,
  deleteTask
} from './ls.js';
import { delTask } from './utilities.js';


getTasks();
addTaskForm.addEventListener('submit', saveTask);
delTask.addEventListener('click', deleteTask);

