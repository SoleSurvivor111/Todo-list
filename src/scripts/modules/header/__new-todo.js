/* ########################### Add li to todo-list ########################### */
import {notCompletedCases} from '../footer/__todo-count.js';
import {toLocal} from '../LocalStage.js';
import {autoFilterCompleted} from '../filters/__completed.js';
const todoApp = document.querySelector('.js-todoapp');
const newTodo = document.querySelector('.js-new-todo');
const ul = document.getElementsByClassName('js-todo-list')[0];

export const newElement = (tag, nameClass, parent) => {
	const el = document.createElement(tag);
  el.className = nameClass;
  parent.appendChild(el);
  return el;
};
const createElement = () => {
  if (newTodo.value.trim() === '') return;
  const li = newElement('li', 'le js-le', ul);
  const createId = Math.random().toString(36).substr(2, 16);
  li.setAttribute('data-id', createId);

  const div = newElement('div', 'view', li);

  const input = newElement('input', 'view__toggle js-toggle', div);
  input.type = 'checkbox';

  const checkbox = newElement('label', 'view__checkbox js-checkbox', div);

  const label = newElement('label', 'view__lable js-lable', div);
  label.innerHTML = newTodo.value.trim();
  newTodo.value = '';

  const button = newElement('button', 'view__destroy js-destroy', div);
  button.type = 'button';
  toLocal();
};

const addElement = (event) => {
  const enterKey = 13;
  if (event.which === enterKey || event.keyCode === enterKey) {
    createElement();
    notCompletedCases();
    autoFilterCompleted();
    return false;
  }
  return true;
};

newTodo.addEventListener('keydown', addElement);
window.addEventListener('resize', createElement);
