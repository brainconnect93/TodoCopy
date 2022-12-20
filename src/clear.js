import { taskList } from './crudop';

export const markCompleted = (e) => {
  const clicked = e.target.closest('.check');
  if (!clicked) return;
  const listNum = +clicked.dataset.btn;
  const taskList = document.querySelector(`.list-${listNum}`);
  console.log(listNum);
  taskList.querySelector('.empty-check').classList.toggle('active');
  taskList.querySelector('.checked').classList.toggle('active');
  taskList.querySelector('.task').classList.toggle('cross');

  // local storage

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const compTask = tasks.find((task) => task.index === listNum);
  compTask.completed = !compTask.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const clearAll = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const remTasks = tasks.filter((task) => task.completed === false);

  let tasksModIndex = [];
  remTasks.forEach((task, ind) => {
    task.index = ind + 1;
    tasksModIndex = [...tasksModIndex, task];
  });
  localStorage.setItem('tasks', JSON.stringify(tasksModIndex));

  const removedTasks = tasks.filter((task) => task.completed === true);

  for (let i = 0; i < removedTasks.length; i += 1) {
    const taskToRemove = document.getElementById(removedTasks[i].index);
    taskToRemove.parentNode.removeChild(taskToRemove);
  }

  // lab
  const uiUpdate = document.querySelectorAll('.taskList li');
  for (let i = 0; i < uiUpdate.length; i += 1) {
    uiUpdate[i].parentNode.removeChild(uiUpdate[i]);
  }
  const stored = JSON.parse(localStorage.getItem('tasks'));
  console.log(stored);
  let dyclass = '';
  let classdy = '';
  let cross = '';
  for (let i = 0; i < stored.length; i += 1) {
    if (stored[i].completed) {
      dyclass = '';
      classdy = 'active';
      cross = 'cross';
    } else {
      dyclass = 'active';
      classdy = '';
      cross = '';
    }
    const createList = `
   <li id=${stored[i].index} class="list list-${stored[i].index}">
 
   <button class="check" data-btn="${stored[i].index}">
   <span class="empty-check ${dyclass}"><i class="fa-regular fa-square"></i></span>
   <span class="checked  ${classdy}"><i class="fa-solid fa-check"></i></span>
   </button>
 
   <input id=${stored[i].index}  type="text" data-desc="${stored[i].index}" class="task ${cross}" value="${stored[i].tasktitle}"/>
   <a id=${stored[i].index} class="btn btn-delete"><i class="fa-solid fa-trash-can"></i></a></li>
   
   `;
    taskList.insertAdjacentHTML('beforeend', createList);
  }
};