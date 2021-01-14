import AbstractComponent from "./abstract-view.js";

export default class FilmCards extends AbstractComponent {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return (
      `<div class="films-list__container"></div>`
    );
  }

}
