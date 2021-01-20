import LoadMoreButton from "../view/load-more-button";
import Sorting from "../view/sort-view";
import FilmCards from "../view/film-cards";
import FilmPresenter from "../presenter/film";
import {remove, render, RenderPosition} from "../util";
import FilmsMarkup from "../view/films-view";
import SiteProfile from "../view/profile-view";

const TOTAL_NUMBER_OF_CARDS = 5;

export default class FilmsPresenter {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedCardsCount = TOTAL_NUMBER_OF_CARDS;
    this._filmPresenter = {};

    this._filmsComponent = new FilmsMarkup();
    this._sortComponent = new Sorting();
    this._loadMoreButtonComponent = new LoadMoreButton();
    this._profileComponent = new SiteProfile();
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();

    this._sourcedFilmCards = filmCards.slice();

    render(this._filmsContainer, this._filmsComponent, RenderPosition.BEFOREEND);

    this.renderBasicMarkup();
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  renderBasicMarkup(basicMarkup) {
    const filmWrapper = document.querySelector(`.films-list`);
    render(filmWrapper, new FilmCards().getElement(), RenderPosition.BEFOREEND);

    render(basicMarkup, new Sorting().getElement(), RenderPosition.BEFOREEND);

  }

  renderloadMoreButton() {
    render(this._filmsComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _handleLoadMoreButton() {
    this._renderTasks(this._renderedTaskCount, this._renderedTaskCount + TOTAL_NUMBER_OF_CARDS);
    this._renderedTaskCount += TOTAL_NUMBER_OF_CARDS;

    if (this._renderedFilmCount >= this._filmCards.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  renderFilmCard(film) {
    const filmElement = new FilmPresenter(this._filmsComponent);
    filmElement.init(film);
    this._filmPresenter[film.id] = filmElement;
  }

  renderCards(from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((filmCard) => this.renderFilmCard(filmCard));
  }
}


