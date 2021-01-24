import FilmCard from "../view/card-view";
import FilmDetails from "../view/popup-view";
import {render, RenderPosition, onEscKeyDown, replace, remove} from "../util";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class FilmPresenter {
  constructor(filmListElement, changeData, changeMode) {

    this._filmsListElement = filmListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCard = null;
    this._filmDetails = null;

    this._cardHadleClick = this._cardHadleClick.bind(this);
    this._closePopupClick = this._closeButtonHandleClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    const prevFilmDetails = this._filmDetails;

    this._filmCard = new FilmCard(film);
    this._filmDetails = new FilmDetails(film);

    this._filmCard.setClickHandler(this._cardHadleClick());
    this._filmDetails.setCloseHandler(this._closeButtonHandleClick());

    if (prevFilmCard === null || prevFilmDetails === null) {
      render(this._filmsListElement, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmCard, prevFilmCard);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._filmCard, prevFilmDetails);
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

  replaceFilmCardToDetails() {
    replace(this._filmDetails, this._filmCard);
    document.body.style.overflow = `hidden`;
    // this._changeMode();
    this._mode = Mode.EDITING;
  }

  replaceDetailsToFilmCard() {
    replace(this._filmCard, this._filmDetails);
    document.body.style.overflow = `auto`;
    this._mode = Mode.DEFAULT;
  }

  _cardHadleClick() {
    this.replaceFilmCardToDetails();
  }

  _closeButtonHandleClick() {
    this.replaceDetailsToFilmCard();
  }
}
