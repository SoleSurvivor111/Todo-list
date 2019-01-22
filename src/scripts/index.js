import '../styles/index.scss';
const todoApp = document.querySelector('.todoapp');

/* ########################### Add li to todo-list ########################### */
const newTodo = document.getElementById('new-todo');
const ul = document.getElementsByTagName('ul')[0];

const createElement = () => {
  if (newTodo.value == false) return;
  const li = document.createElement('li');
  const createId = Math.random().toString(36).substr(2, 16);
  li.setAttribute('data-id', createId);
  li.className = 'le';
  ul.appendChild(li);

  const div = document.createElement('div');
  div.className = 'view';
  li.appendChild(div);

  const input = document.createElement('input');
  input.className = 'view__toggle';
  input.type = 'checkbox';
  div.appendChild(input);

  const label = document.createElement('label');
  label.innerHTML = newTodo.value;
  newTodo.value = '';
  label.className = 'view__lable';
  div.appendChild(label);


  const button = document.createElement('button');
  button.className = 'view__destroy';
  div.appendChild(button);
};

const addElement = (event) => {
  if (event.which === 13 || event.keyCode === 13) {
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
  const checkboxes = document.querySelectorAll('.todoapp');

  Array.prototype.forEach.call(checkboxes, (item) => {
    const count = item.getElementsByClassName('view__toggle').length;
    let currentCount = 0;

    item.addEventListener('change', (evt) => {
      if (evt.target.classList.contains('header__toggle-all')) {
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
            item.getElementsByClassName('header__toggle-all')[0].checked = false;
          }
        }
      }
    }, false);
  });

  const setAllCheckboxes = (where, value) => {
    const checkboxes = where.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(checkboxes, (item) => {
      item.checked = !!value;
    });
  };
};

activateCheckbox();

/* ########################### Remove li in todo-list ########################### */
const removeElement = (e) => {
  const target = e.target;

  if (target.className !== 'view__destroy') return;

  ul.removeChild(target.closest('li'));
  notCompletedCases();
};
ul.addEventListener('click', removeElement);

/* ########################### notCompletedCases value ########################### */
const notCompletedCases = () => {
  const elements = document.getElementsByClassName('view__toggle');
  const todoCount = document.querySelector('.footer__todo-count');
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
  const clearСompleted = document.querySelector('.footer__clear-completed');
  if (elements.length - result !== 0) {
    clearСompleted.classList.remove('invisible');
  } else {
    clearСompleted.classList.add('invisible');
  }
};
notCompletedCases();
todoApp.addEventListener('change', notCompletedCases);

/* ########################### clean-up button ########################### */
const clearCompletedBtn = (e) => {
  const target = e.target;

  if (target.className !== 'footer__clear-completed') return;

  const elements = ul.getElementsByTagName('input');
  let i = elements.length - 1;


  for (i; i >= 0; i -= 1) {
    const element = elements[i];
    if (element.checked) {
      element.closest('li').remove();
    }
  }
  document.querySelector('.header__toggle-all').checked = false;
};
todoApp.addEventListener('click', clearCompletedBtn);

const hideBtn = () => {
  const clearCompletedBtn = document.querySelector('.footer__clear-completed');
  const ulLength = ul.getElementsByTagName('li').length;
  if (ulLength === 0) {
    clearCompletedBtn.classList.add('invisible');
  } else {
    clearCompletedBtn.classList.remove('invisible');
  }
};
ul.addEventListener('change', hideBtn);

/* ########################### activatedBtn style ########################### */
let selectedTd;

const activatedBtn = (e) => {
  const target = e.target;

  if (target.tagName !== 'A') return;
  document.querySelector('.all').classList.remove('highlight');
  highlight(target);
};

const highlight = (node) => {
  if (selectedTd) {
    selectedTd.classList.remove('highlight');
  }
  selectedTd = node;
  selectedTd.classList.add('highlight');
};
todoApp.addEventListener('click', activatedBtn);

/* ####################################   filter  allBtn ########################### */

const filterAll = () => {
  const elements = document.getElementsByClassName('view__toggle');

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    element.closest('li').classList.remove('hidden');
  }
};

const allBtn = (e) => {
const target = e.target;
if (!target.classList.contains('all')) return;
filterAll();
};
todoApp.addEventListener('click', allBtn);

/* ###########################   filter  activeBtn  ########################### */

const filterActive = () => {
  const elements = document.getElementsByClassName('view__toggle');
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    if (element.checked === false) {
      element.closest('li').classList.remove('hidden');
    } else {
      element.closest('li').classList.add('hidden');
    }
  }
};

const activeBtn = (e) => {
  const target = e.target;

  if (target.className !== 'active') return;
  filterActive();
};
todoApp.addEventListener('click', activeBtn);

const autoFilterActive = (e) => {
  const activeBtn = document.querySelector('.active');

  if (activeBtn.classList.contains('highlight')) filterActive();

};

todoApp.addEventListener('click', autoFilterActive);
/* ###########################   filter completedBtn  ########################### */

const filterCompleted = () => {
  const elements = document.getElementsByClassName('view__toggle');

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    if (element.checked === true) {
      element.closest('li').classList.remove('hidden');
    } else {
      element.closest('li').classList.add('hidden');
    }
  }
};

const completedBtn = (e) => {
  const target = e.target;

  if (target.className !== 'completed') return;
  filterCompleted();
};
todoApp.addEventListener('click', completedBtn);

const autoFilterCompleted = (e) => {
  const completedBtn = document.querySelector('.completed');

  if (completedBtn.classList.contains('highlight')) filterCompleted();

};

todoApp.addEventListener('click', autoFilterCompleted);

/* ########################### hide list ########################### */
const hideFooter = () => {
  const visibility = ul.getElementsByTagName('li').length;
  const footer = document.querySelector('.footer');
  const toggleAll = document.querySelector('.header__toggle-all');
  const headerLabel = document.querySelector('.header__label');
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
  if (!target.closest('.view__lable')) return;

  const input = document.createElement('input');
  input.className = 'le__edit';
  input.type = 'text';
  input.value = target.closest('li').querySelector('.view__lable').innerHTML;
  target.closest('li').appendChild(input);
  input.focus();
};
todoApp.addEventListener('dblclick', createEditInput);


const removeEditInput = (e) => {
  const target = e.target;
  const li = target.closest('li');
  if (target.className !== 'le__edit') return;
  li.querySelector('.view__lable').innerHTML = li.querySelector('.le__edit').value;
  target.remove();
};

document.addEventListener('blur', removeEditInput, true);

const keysRemoveEditInput = (e) => {
  const liEdit = document.activeElement;
  if (liEdit.className !== 'le__edit') return;
  if (e.which === 13 || e.keyCode === 13 || e.which === 27) {
    liEdit.blur();
  }
};
document.addEventListener('keydown', keysRemoveEditInput);
