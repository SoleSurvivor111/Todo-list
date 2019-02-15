/* ########################### notCompletedCases value ########################### */
const todoApp = document.querySelector('.js-todoapp');

export const notCompletedCases = () => {
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

document.addEventListener('change', notCompletedCases);
