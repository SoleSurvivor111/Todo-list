/* ########################### clean-up button ########################### */
const todoApp = document.querySelector('.js-todoapp');
import {notCompletedCases} from '../footer/__todo-count.js';
import {toLocal} from '../LocalStage.js';
const ul = document.getElementsByClassName('js-todo-list')[0];

const clearCompletedBtn = (e) => {
  const target = e.target;
  if (!target.classList.contains('js-clear-completed')) return;
  const elements = ul.getElementsByClassName('js-toggle');
  let i = elements.length - 1;

  for (i; i >= 0; i -= 1) {
    const element = elements[i];
    if (element.checked) {
      element.closest('.js-le').remove();
    }
  }
  document.querySelector('.js-toggle-all').checked = false;
  notCompletedCases();
  toLocal();
};
todoApp.addEventListener('click', clearCompletedBtn);

const hideBtn = () => {
  const footerCompleted = document.querySelector('.js-clear-completed');
  const ulLength = ul.getElementsByClassName('js-le').length;
  if (ulLength === 0) {
    footerCompleted.classList.add('invisible');
  } else {
    footerCompleted.classList.remove('invisible');
  }
};
ul.addEventListener('change', hideBtn);
