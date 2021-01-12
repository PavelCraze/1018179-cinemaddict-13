import FilmsMarkup from "./view/films-view";
import SiteProfile from "./view/profile-view";
import Filter from "./view/filter-view";
import Sorting from "./view/sort-view";
import FilmCard from "./view/card-view";
import LoadMoreButton from "./view/load-more-button";
import FilmDetails from "./view/popup-view";
import FilmCards from "./view/film-cards";
import {generateFilmCards} from "./mock/film-data";
import {render, RenderPosition, onEscKeyDown} from "./util";


const NUMBER_OF_FILMS = 20;
const TOTAL_NUMBER_OF_CARDS = 5;
const NUMBER_OF_CARDS = 2;

const renderFilmCard = (filmListElement, film) => {
  const filmCard = new FilmCard(film);
  const filmDetails = new FilmDetails(film);
  const replaceFilmCardToDetails = () => {
    filmListElement.replaceChild(filmDetails.getElement(), filmCard.getElement());
    document.body.style.overflow = `hidden`;
  };

  const replaceDetailsToFilmCard = () => {
    filmListElement.replaceChild(filmCard.getElement(), filmDetails.getElement());
    document.body.style.overflow = `auto`;
  };

  render(filmListElement, filmCard.getElement(), RenderPosition.BEFOREEND);

  filmCard._element.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceFilmCardToDetails();
  });

  document.addEventListener(`keydown`, onEscKeyDown.bind(null, replaceDetailsToFilmCard));

  const detailsClose = filmDetails.getElement().querySelector(`.film-details__close-btn`);
  detailsClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceDetailsToFilmCard();
  });
};

const renderBasicMarkup = (basicMarkup, films) => {
  const filmWrapper = document.querySelector(`.films-list`);
  render(filmWrapper, new FilmCards().getElement(), RenderPosition.BEFOREEND);

  const filmListElement = basicMarkup.getElement().querySelector(`.films-list .films-list__container`);
  let showingCards = TOTAL_NUMBER_OF_CARDS;
  films.slice(0, showingCards)
    .forEach((film) => {
      renderFilmCard(filmListElement, film);
    });

  const loadMoreButton = new LoadMoreButton();
  render(filmWrapper, loadMoreButton.getElement(), RenderPosition.BEFOREEND);

  loadMoreButton.getElement().addEventListener(`click`, () => {
    const prevCards = showingCards;
    showingCards = showingCards + TOTAL_NUMBER_OF_CARDS;

    films.slice(prevCards, showingCards)
      .forEach((film) => {
        renderFilmCard(filmListElement, film);
      });

    if (showingCards >= films.length) {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
    }
  });

  const cardTopRatedWrappers = document.querySelectorAll(`.films-list--extra .films-list__container`);

  for (let i = 0; i < NUMBER_OF_CARDS; i++) {
    render(cardTopRatedWrappers[0], new FilmCard(films[i]).getElement(), RenderPosition.BEFOREEND);
    render(cardTopRatedWrappers[1], new FilmCard(films[i]).getElement(), RenderPosition.BEFOREEND);
  }
};

const films = generateFilmCards(NUMBER_OF_FILMS);
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

render(siteHeader, new SiteProfile().getElement(), RenderPosition.BEFOREEND);

render(siteMain, new Filter(films).getElement(), RenderPosition.BEFOREEND);

render(siteMain, new Sorting().getElement(), RenderPosition.BEFOREEND);

const basicMarkup = new FilmsMarkup();
render(siteMain, basicMarkup.getElement(), RenderPosition.BEFOREEND);
renderBasicMarkup(basicMarkup, films);
