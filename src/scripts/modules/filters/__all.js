/* ####################################   filter  allBtn ########################### */

export const filterAll = () => {
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
document.addEventListener('click', allBtn);
