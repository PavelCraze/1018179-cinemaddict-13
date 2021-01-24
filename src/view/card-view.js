
import AbstractComponent from "./abstract-view.js";

export default class FilmCard extends AbstractComponent {
  constructor({movieTitle, rating, date, duration, genreNames, poster, description, comments}) {
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
  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
  }
}
