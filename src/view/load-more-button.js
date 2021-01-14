import AbstractComponent from "./abstract-view.js";


export default class LoadMoreButton extends AbstractComponent {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }
}
