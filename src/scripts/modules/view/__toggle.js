/* ########################### checkbox ########################### */
const todoApp = document.querySelector('.js-todoapp');
const toggleCheckbox = (e) => {
  const target = e.target;
  if (!target.classList.contains('js-toggle')) return;
  target.toggleAttribute('checked');
};
todoApp.addEventListener('click', toggleCheckbox);
