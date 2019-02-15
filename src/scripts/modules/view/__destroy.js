/* ########################### Remove li in todo-list ########################### */
const ul = document.getElementsByClassName('js-todo-list')[0];
import {toLocal} from '../LocalStage.js';
import {notCompletedCases} from '../footer/__todo-count.js';

const removeElement = (e) => {
  const target = e.target;
  if (!target.classList.contains('js-destroy')) return;
  ul.removeChild(target.closest('.js-le'));
  notCompletedCases();
  toLocal();
};
ul.addEventListener('click', removeElement);
