/* ########################### LocalStorage ########################### */

let todos;
export const toLocal = () => {
  const ul = document.getElementsByClassName('js-todo-list')[0];
  todos = ul.innerHTML;
  localStorage.setItem('js-todos', todos);
};
document.addEventListener('click', toLocal);
