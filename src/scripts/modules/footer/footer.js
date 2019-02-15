/* ########################### hide list ########################### */
const todoApp = document.querySelector('.js-todoapp');
const ul = document.getElementsByClassName('js-todo-list')[0];
export const hideFooter = () => {
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
document.addEventListener('click', hideFooter);
todoApp.addEventListener('keydown', hideFooter);
