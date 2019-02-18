import '../styles/index.scss';
import {notCompletedCases} from './modules/footer/__todo-count.js';
import {hideFooter} from './modules/footer/footer.js';
import {filterAll} from './modules/filters/__all.js';
import {toLocal} from './modules/LocalStage.js';
import {createList} from './modules/LocalStage.js';
const ul = document.getElementsByClassName('js-todo-list')[0];



import './modules/header/__new-todo.js';
import './modules/view/__toggle.js';
import './modules/header/__toggle-all.js';
import './modules/footer/__todo-count.js';
import './modules/view/__destroy.js';
import './modules/footer/__clear-completed.js';
import './modules/filters/filters.js';
import './modules/filters/__all.js';
import './modules/filters/__active.js';
import './modules/filters/__completed.js';
import './modules/footer/footer.js';
import './modules/view/__lable.js';


if (localStorage.getItem('js-todos')) {
  let src = JSON.parse(localStorage.getItem('js-todos'));
  createList(src);
}
notCompletedCases();
hideFooter();
filterAll();
