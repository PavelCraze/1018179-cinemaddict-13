
import AbstractComponent from "./abstract-view.js";

export default class FilmCard extends AbstractComponent {
  constructor({movieTitle, rating, date, duration, genreNames, poster, description, comments, id}) {
    super();
    this._element = null;
    this._movieTitle = movieTitle;
    this._rating = rating;
    this._date = date;
    this._duration = duration;
    this._genreNames = genreNames;
    this._poster = poster;
    this._description = description;
    this._comments = comments;
    this._id = id;
    this._callback = {};

    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
    this._watchedButtonClickHandler = this._watchedButtonClickHandler.bind(this);
    this._watchlistButtonClickHandler = this._watchlistButtonClickHandler.bind(this);
  }
  getTemplate() {


    return (
      `<article class="film-card">
            <h3 class="film-card__title">${this._movieTitle}</h3>
            <p class="film-card__rating">${this._rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${this._date.getFullYear()}</span>
              <span class="film-card__duration">${this._duration}</span>
              <span class="film-card__genre">${this._genreNames[0]}</span>
            </p>
            <img src="./images/posters/${this._poster}" alt="${this._movieTitle}" class="film-card__poster">
            <p class="film-card__description">${this._description}</p>
            <a class="film-card__comments">${this._comments.length} comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
            </form>
          </article>`
    );
  }
  _clickHandler(evt) {
    if (evt.target.className !== `film-card__poster`
      && evt.target.className !== `film-card__title`
      && evt.target.className !== `film-card__comments`) {
      return;
    }

    evt.preventDefault();
    this._callback.click(this._id);
  }

  _favoriteButtonClickHandler(evt) {
    evt.preventDefault();

    this._callback.clickFavorite(this._id);
  }

  _watchedButtonClickHandler(evt) {
    evt.preventDefault();

    this._callback.clickWatched(this._id);
  }

  _watchlistButtonClickHandler(evt) {
    evt.preventDefault();

    this._callback.clickWatchlist(this._id);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement()
      .addEventListener(`click`, this._clickHandler);
  }

  setFavoriteButtonClickHandler(callback) {
    this._callback.clickFavorite = callback;

    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favoriteButtonClickHandler);
  }

  setWatchedButtonClickHandler(callback) {
    this._callback.clickWatched = callback;

    this.getElement()
      .querySelector(`.film-card__controls-item--watched`)
      .addEventListener(`click`, this._watchedButtonClickHandler);
  }

  setWatchlistButtonClickHandler(callback) {
    this._callback.clickWatchlist = callback;

    this.getElement()
      .querySelector(`.film-card__controls-item--watchlist`)
      .addEventListener(`click`, this._watchlistButtonClickHandler);
  }
}
