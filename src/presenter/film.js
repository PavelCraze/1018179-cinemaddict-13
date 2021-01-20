import FilmCard from "../view/film-cards";
import FilmDetails from "../view/popup-view";
import {render, RenderPosition, onEscKeyDown, replace, remove} from "../util";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class FilmPresenter {
  constructor(filmListElement) {

    this._filmsListElement = filmListElement;
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    const prevFilmDetails = this._filmDetails;

    this._filmCard = new FilmCard(film);
    this._filmDetail = new FilmDetails(film);

    if (prevFilmCard === null || prevFilmDetails === null) {
      render(this._taskListContainer, this._taskComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._taskComponent, prevFilmCard);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._taskComponent, prevFilmDetails);
      this._mode = Mode.DEFAULT;
    }

    remove(prevFilmCard);
    remove(prevFilmDetails);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._prevFilmDetails);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceDetailsToFilmCard();
    }
  }


  init(film) {
    const filmCard = new FilmCard(film);
    const filmDetails = new FilmDetails(film);
    const replaceFilmCardToDetails = () => {
      this.replaceChild(filmDetails.getElement(), filmCard.getElement());
      document.body.style.overflow = `hidden`;
    };

    const replaceDetailsToFilmCard = () => {
      this._filmsListElemnt.replaceChild(filmCard.getElement(), filmDetails.getElement());
      document.body.style.overflow = `auto`;
    };

    render(this._filmListElement, filmCard.getElement(), RenderPosition.BEFOREEND);

    filmCard.setOnClickHandler(() => {
      replaceFilmCardToDetails();
    });

    filmDetails.setCloseHandler(onEscKeyDown.bind(null, replaceDetailsToFilmCard));

    const detailsClose = filmDetails.getElement().querySelector(`.film-details__close-btn`);
    detailsClose.setOnClickHandler(() => {
      replaceDetailsToFilmCard();
    });
  }
}
