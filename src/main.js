import {menuView} from './views/menu-view';
import {rankView} from './views/rank-view';
import {filmsView} from './views/films-view';
import {film} from './views/card-view';
// import {popupView} from './views/popup-view';
import {render} from './util';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, rankView());
render(mainElement, menuView());
render(mainElement, filmsView());
// render(mainElement, popupView());

const filmsElement = document.querySelector(`.films-list__container`);
const filmsCommentedElements = document.querySelectorAll(`.films-list--commented`);
for (let i = 0; i < 3; i++) {
  render(filmsElement, film());
}

const filmsRatedElements = document.querySelectorAll(`.films-list--rated`);
for (let i = 0; i < 3; i++) {
  render(filmsElement, film());
}


filmsCommentedElements.forEach((el) => {
  render(el.querySelector(`.films-list__container`), film());
});

filmsRatedElements.forEach((el) => {
  render(el.querySelector(`.films-list__container`), film());
});

