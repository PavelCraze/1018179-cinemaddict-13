import LoadMoreButton from "../view/load-more-button";
import Sorting from "../view/sort-view";
import FilmPresenter from "../presenter/film";
import {remove, render, RenderPosition} from "../util";
import FilmsMarkup from "../view/films-view";
import SiteProfile from "../view/profile-view";
import FilmCardsContainer from "../view/film-cards";

const TOTAL_NUMBER_OF_CARDS = 5;

export default class FilmsPresenter {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedCardsCount = TOTAL_NUMBER_OF_CARDS;
    this._filmPresenter = {};

    this._filmsComponent = new FilmsMarkup();
    this._filmCardsContainer = new FilmCardsContainer();
    this._sortComponent = new Sorting();
    this._loadMoreButtonComponent = new LoadMoreButton();
    this._profileComponent = new SiteProfile();
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();

    this._sourcedFilmCards = filmCards.slice();

    render(this._filmsContainer, this._filmsComponent, RenderPosition.BEFOREEND);

    render(this._filmsContainer.querySelector(`.films-list`), this._filmCardsContainer, RenderPosition.BEFOREEND);
    this.renderFilms();
  }

  renderSort() {
    render(this._filmsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }


  renderloadMoreButton() {
    render(this._filmCardsContainer, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this.handleLoadMoreButton);
  }

  handleLoadMoreButton() {
    this.renderCards(this._renderedFilmsCount, this._renderedFilmsCount + TOTAL_NUMBER_OF_CARDS);
    this._renderedFilmsCount += TOTAL_NUMBER_OF_CARDS;

    if (this._renderedFilmCount >= this._filmCards.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  renderFilmCard(film) {
    const filmElement = new FilmPresenter(this._filmCardsContainer);
    filmElement.init(film);
    this._filmPresenter[film.id] = filmElement;
  }

  renderCards(from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((filmCard) => this.renderFilmCard(filmCard));
  }


  renderFilmCards() {
    this.renderCards(0, Math.min(this._filmCards.length, TOTAL_NUMBER_OF_CARDS));

    if (this._filmCards.length > TOTAL_NUMBER_OF_CARDS) {
      this.renderloadMoreButton();
    }
  }


  renderFilms() {
    this.renderSort();
    this.renderFilmCards();
  }
}

