import {filmsElementTemplate} from "./view/films-view";
import {profileElementTemplate} from "./view/profile-view";
import {createFilterTemplate} from "./view/filter-view";
import {createSortingTemplate} from "./view/sort-view";
import {createFilmCardTemplate} from "./view/card-view";
import {createLoadMoreButtonTemplate} from "./view/load-more-button";
import {createFilmDetailsTemplate} from "./view/popup-view";
import {generateFilmCards} from "./mock/film-data.js";

const NUMBER_OF_FILMS = 20;
const TOTAL_NUMBER_OF_CARDS = 5;
const NUMBER_OF_CARDS = 2;
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const basementSite = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const films = generateFilmCards(NUMBER_OF_FILMS);

render(siteHeader, profileElementTemplate(), `beforeend`);
render(siteMain, createFilterTemplate(films), `beforeend`);
render(siteMain, createSortingTemplate(), `beforeend`);
render(siteMain, filmsElementTemplate(), `beforeend`);

const cardWrapper = document.querySelector(`.films-list .films-list__container`);

let showingCards = TOTAL_NUMBER_OF_CARDS;

films.slice(0, showingCards)
  .forEach((film) => render(cardWrapper, createFilmCardTemplate(film), `beforeend`));

const filmWrapper = document.querySelector(`.films-list`);

render(filmWrapper, createLoadMoreButtonTemplate(), `beforeend`);

const cardTopRatedWrappers = document.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < NUMBER_OF_CARDS; i++) {
  render(cardTopRatedWrappers[0], createFilmCardTemplate(films[i]), `beforeend`);
  render(cardTopRatedWrappers[1], createFilmCardTemplate(films[i]), `beforeend`);
}


const loadMoreButton = siteMain.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevCards = showingCards;
  showingCards = showingCards + TOTAL_NUMBER_OF_CARDS;

  films.slice(prevCards, showingCards)
    .forEach((film) => render(cardWrapper, createFilmCardTemplate(film), `beforeend`));

  if (showingCards >= films.length) {
    loadMoreButton.remove();
  }
});

render(basementSite, createFilmDetailsTemplate(films[0]), `afterend`);
