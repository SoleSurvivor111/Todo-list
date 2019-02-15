/* ###########################   filter completedBtn  ########################### */
const todoApp = document.querySelector('.js-todoapp');

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

export const autoFilterCompleted = () => {
  const completed = document.querySelector('.js-completed');
  if (completed.classList.contains('highlight')) filterCompleted();
};

todoApp.addEventListener('click', autoFilterCompleted);
