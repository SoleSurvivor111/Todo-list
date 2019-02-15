/* ########################### activatedBtn style ########################### */
const todoApp = document.querySelector('.js-todoapp');
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
