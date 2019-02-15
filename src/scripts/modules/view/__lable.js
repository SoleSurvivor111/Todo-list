/* ########################### EditInput ########################### */
import {newElement} from '../header/__new-todo.js';
import {hideFooter} from '../footer/footer.js';
import {notCompletedCases} from '../footer/__todo-count.js';
import {toLocal} from '../LocalStage.js';
const todoApp = document.querySelector('.js-todoapp');

const createEditInput = (e) => {
  const target = e.target;
  const le = target.closest('.js-le');
  if (!target.closest('.js-lable')) return;
  le.querySelector('.js-toggle').classList.add('invisible');
  le.querySelector('.js-checkbox').classList.add('invisible');
  const input = newElement('textarea', 'le__edit js-edit', le);
  input.value = le.querySelector('.js-lable').innerHTML;
  input.focus();
};
todoApp.addEventListener('dblclick', createEditInput);


const removeEditInput = (e) => {
  const target = e.target;
  const le = target.closest('.js-le');
  if (!target.classList.contains('js-edit')) return;
  le.querySelector('.js-toggle').classList.remove('invisible');
  le.querySelector('.js-checkbox').classList.remove('invisible');
  le.querySelector('.js-lable').innerHTML = le.querySelector('.js-edit').value.trim();
  if (le.querySelector('.js-lable').innerHTML === '') {
    le.querySelector('.js-lable').closest('.js-le').remove();
  }
  target.remove();
  hideFooter();
  notCompletedCases();
  toLocal();
};

document.addEventListener('blur', removeEditInput, true);

const keysRemoveEditInput = (e) => {
  const liEdit = document.activeElement;
  if (!liEdit.classList.contains('js-edit')) return;
  const enterKey = 13;
  const escapeKey = 27;
  if (e.which === enterKey || e.keyCode === enterKey || e.which === escapeKey) {
    liEdit.blur();
  }
};
document.addEventListener('keydown', keysRemoveEditInput);
