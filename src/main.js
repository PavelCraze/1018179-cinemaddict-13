import {menuView} from './views/menu-view';
import {rankView} from './views/rank-view';
import {cardView} from './views/films-view';
import {popupView} from './views/popup-view';
import {render} from './util';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, rankView());
render(mainElement, menuView());
render(mainElement, cardView());
render(mainElement, popupView());
