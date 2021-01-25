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

  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    const prevFilmDetails = this._filmDetails;

    this._filmCard = new FilmCard(film);
    this._filmDetails = new FilmDetails(film);

    this._filmCard.setClickHandler(this.replaceFilmCardToDetails.bind(this));
    this._filmDetails.setCloseButtonClickHandler(this.replaceDetailsToFilmCard.bind(this));
    this._favoriteButtonClickHandler = this._handleFavoriteClick.bind(this);
    this._watchedButtonClickHandler = this._handleWatchedClick.bind(this);
    this._watchlistButtonClickHandler = this._handleWatchlistClick.bind(this);


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
    this._handleWatchlistClick = this._handleWatchlistClick(this);
    this._handleWatchedClick = this._handleWatchedClick(this);
    this._handleFavoriteClick = this._handleFavoriteClick(this);
  }

  replaceDetailsToFilmCard() {
    replace(this._filmCard, this._filmDetails);
    document.body.style.overflow = `auto`;
    this._mode = Mode.DEFAULT;
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isWatched
            }
        )
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isWatchlist
            }
        )
    );
  }

}
