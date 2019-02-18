/* ########################### LocalStorage ########################### */
import {newElement} from './header/__new-todo.js';



export const toLocal = () => {
  const ul = document.getElementsByClassName('js-todo-list')[0];
  const elements = ul.getElementsByClassName('js-le');
  if (elements.length === 0) return;
  const content = [];

  for (let i = 0; i < elements.length; i += 1) {

    let box = {
      dataId : elements[i].dataset.id,
      checked : elements[i].querySelector('.js-toggle').checked,
      title : elements[i].querySelector('.js-lable').innerHTML
    };
    content.push(box);
    localStorage.setItem('js-todos', JSON.stringify(content));
  };
};
document.addEventListener('click', toLocal);


export const createList = (array) => {
  const ul = document.getElementsByClassName('js-todo-list')[0];
  for (let i = 0; i < array.length; i += 1) {

    const li = newElement('li', 'le js-le', ul);

    li.setAttribute('data-id', array[i].title);

    const div = newElement('div', 'view', li);

    const input = newElement('input', 'view__toggle js-toggle', div);
    input.type = 'checkbox';

    if (array[i].checked) input.setAttribute('checked', '');

    const checkbox = newElement('label', 'view__checkbox js-checkbox', div);

    const label = newElement('label', 'view__lable js-lable', div);
    label.innerHTML = array[i].title;

    const button = newElement('button', 'view__destroy js-destroy', div);
    button.type = 'button';
  }
};
