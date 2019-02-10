import '../styles/index.scss';
const todoApp = document.querySelector('.js-todoapp');
const newTodo = document.querySelector('.js-new-todo');
const ul = document.getElementsByClassName('js-todo-list')[0];
const enterKey = 13;
const escapeKey = 27;
/* ########################### LocalStorage ########################### */
let todos;
const toLocal = () => {
  todos = ul.innerHTML;
  localStorage.setItem('js-todos', todos);
};
document.addEventListener('click', toLocal);
/* ########################### checkbox ########################### */
const toggleCheckbox = (e) => {
  const target = e.target;
  if (!target.classList.contains('js-toggle')) return;
  target.toggleAttribute('checked');
};
todoApp.addEventListener('click', toggleCheckbox);
/* ########################### Add li to todo-list ########################### */
const createElement = () => {
  if (newTodo.value.trim() === '') return;
  const li = document.createElement('li');
  const createId = Math.random().toString(36).substr(2, 16);
  li.setAttribute('data-id', createId);
  li.className = 'le js-le';
  ul.appendChild(li);

  const div = document.createElement('div');
  div.className = 'view';
  li.appendChild(div);

  const input = document.createElement('input');
  input.className = 'view__toggle js-toggle';
  input.type = 'checkbox';
  div.appendChild(input);

  const checkbox = document.createElement('label');
  checkbox.className = 'view__checkbox js-checkbox';
  div.appendChild(checkbox);

  const label = document.createElement('label');
  label.innerHTML = newTodo.value.trim();
  newTodo.value = '';
  label.className = 'view__lable js-lable';
  div.appendChild(label);


  const button = document.createElement('button');
  button.className = 'view__destroy js-destroy';
  div.appendChild(button);
  toLocal();
};

const addElement = (event) => {
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

/* ########################### activate checkbox ########################### */
const activateCheckbox = () => {
  const setAllCheckboxes = (where, value) => {
    const checkboxes = where.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(checkboxes, (item) => {
      item.checked = !!value;
    });
  };
  const checkboxes = document.querySelectorAll('.js-todoapp');
  Array.prototype.forEach.call(checkboxes, (item) => {
    const count = item.getElementsByClassName('js-toggle').length;
    let currentCount = 0;

    item.addEventListener('change', (evt) => {
      if (evt.target.classList.contains('js-toggle-all')) {
        if (evt.target.checked) {
          setAllCheckboxes(item, true);
          currentCount = count;
        } else {
          setAllCheckboxes(item, false);
          currentCount = 0;
        }
      } else {
        if (evt.target.checked) {
          currentCount += 1;
        } else {
          currentCount -= 1;
        }

        if (currentCount === count - 1) {
          if (!evt.target.checked) {
            item.getElementsByClassName('js-toggle-all')[0].checked = false;
          }
        }
      }
    }, false);
  });
};

activateCheckbox();

/* ########################### notCompletedCases value ########################### */
const notCompletedCases = () => {
  const elements = document.getElementsByClassName('js-toggle');
  const todoCount = document.querySelector('.js-todo-count');
  let result = 0;
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    if (!element.checked) {
      result += 1;
    }
  }
  if (result !== 1) {
    todoCount.innerHTML = `${result} items left`;
  } else {
    todoCount.innerHTML = `${result} item left`;
  }
  const clearСompleted = document.querySelector('.js-clear-completed');
  if (elements.length - result !== 0) {
    clearСompleted.classList.remove('invisible');
  } else {
    clearСompleted.classList.add('invisible');
  }
};

todoApp.addEventListener('change', notCompletedCases);
/* ########################### Remove li in todo-list ########################### */
const removeElement = (e) => {
  const target = e.target;

  if (!target.classList.contains('js-destroy')) return;

  ul.removeChild(target.closest('.js-le'));
  notCompletedCases();
  toLocal();
};
ul.addEventListener('click', removeElement);

/* ########################### clean-up button ########################### */
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

/* ########################### activatedBtn style ########################### */
let selectedTd;
const highlight = (node) => {
  if (selectedTd) {
    selectedTd.classList.remove('highlight');
  }
  selectedTd = node;
  selectedTd.classList.add('highlight');
};

const activatedBtn = (e) => {
  const target = e.target;

  if (target.tagName !== 'A') return;
  document.querySelector('.js-all').classList.remove('highlight');
  highlight(target);
};


todoApp.addEventListener('click', activatedBtn);

/* ####################################   filter  allBtn ########################### */

const filterAll = () => {
  const elements = document.getElementsByClassName('js-toggle');

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    element.closest('.js-le').classList.remove('hidden');
  }
};

const allBtn = (e) => {
  const target = e.target;
  if (!target.classList.contains('js-all')) return;
  filterAll();
};
todoApp.addEventListener('click', allBtn);

/* ###########################   filter  activeBtn  ########################### */

const filterActive = () => {
  const elements = document.getElementsByClassName('js-toggle');
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    if (element.checked === false) {
      element.closest('.js-le').classList.remove('hidden');
    } else {
      element.closest('.js-le').classList.add('hidden');
    }
  }
};

const activeBtn = (e) => {
  const target = e.target;

  if (!target.classList.contains('js-active')) return;
  filterActive();
};
todoApp.addEventListener('click', activeBtn);

const autoFilterActive = () => {
  const active = document.querySelector('.js-active');
  if (active.classList.contains('highlight')) filterActive();
};

todoApp.addEventListener('click', autoFilterActive);
/* ###########################   filter completedBtn  ########################### */

const filterCompleted = () => {
  const elements = document.getElementsByClassName('js-toggle');

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    if (element.checked === true) {
      element.closest('.js-le').classList.remove('hidden');
    } else {
      element.closest('.js-le').classList.add('hidden');
    }
  }
};

const completedBtn = (e) => {
  const target = e.target;

  if (!target.classList.contains('js-completed')) return;
  filterCompleted();
};
todoApp.addEventListener('click', completedBtn);

const autoFilterCompleted = () => {
  const completed = document.querySelector('.js-completed');
  if (completed.classList.contains('highlight')) filterCompleted();
};

todoApp.addEventListener('click', autoFilterCompleted);

/* ########################### hide list ########################### */
const hideFooter = () => {
  const visibility = ul.getElementsByClassName('js-le').length;
  const footer = document.querySelector('.js-footer');
  const toggleAll = document.querySelector('.js-toggle-all');
  const headerLabel = document.querySelector('.js-label');
  if (visibility !== 0) {
    headerLabel.classList.remove('invisible');
    toggleAll.classList.remove('invisible');
    footer.classList.remove('hidden');
  } else {
    headerLabel.classList.add('invisible');
    toggleAll.classList.add('invisible');
    footer.classList.add('hidden');
  }
};
todoApp.addEventListener('click', hideFooter);
todoApp.addEventListener('keydown', hideFooter);

/* ########################### EditInput ########################### */
const createEditInput = (e) => {
  const target = e.target;
  if (!target.closest('.js-lable')) return;
  target.closest('.js-le').querySelector('.js-toggle').classList.add('invisible');
  target.closest('.js-le').querySelector('.js-checkbox').classList.add('invisible');
  const input = document.createElement('textarea');
  input.className = 'le__edit js-edit';
  input.value = target.closest('.js-le').querySelector('.js-lable').innerHTML;
  target.closest('.js-le').appendChild(input);
  input.focus();
};
todoApp.addEventListener('dblclick', createEditInput);


const removeEditInput = (e) => {
  const target = e.target;
  const li = target.closest('.js-le');
  if (!target.classList.contains('js-edit')) return;
  target.closest('.js-le').querySelector('.js-toggle').classList.remove('invisible');
  target.closest('.js-le').querySelector('.js-checkbox').classList.remove('invisible');
  li.querySelector('.js-lable').innerHTML = li.querySelector('.js-edit').value.trim();
  if (li.querySelector('.js-lable').innerHTML === '') {
    li.querySelector('.js-lable').closest('.js-le').remove();
  }
  target.remove();
  hideFooter();
  notCompletedCases();
  toLocal();
};

document.addEventListener('blur', removeEditInput, true);

const keysRemoveEditInput = (e) => {
  const liEdit = document.activeElement;
  if (!liEdit.classList.contains('.js-edit')) return;
  if (e.which === enterKey || e.keyCode === enterKey || e.which === escapeKey) {
    liEdit.blur();
  }
};
document.addEventListener('keydown', keysRemoveEditInput);
if (localStorage.getItem('js-todos')) {
  ul.innerHTML = localStorage.getItem('js-todos');
}
notCompletedCases();
hideFooter();
filterAll();
