/* ###########################   filter  activeBtn  ########################### */
const todoApp = document.querySelector('.js-todoapp');

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
