import {menuView} from './views/menu-view';
import {rankView} from './views/rank-view';
import {cardView} from './views/films-view';
import {popupView} from './views/popup-view';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


const render = (element, itemView) => {
  const newFragment = document.createDocumentFragment();
  // element.innerHTML = ``;
    const newItemView = itemView();
    const newElement = newItemView.getElement();
    newFragment.appendChild(newElement);
  element.appendChild(newFragment);
};



render(headerElement, rankView());
render(mainElement, menuView());
render(mainElement, cardView());
render(mainElement, popupView());
