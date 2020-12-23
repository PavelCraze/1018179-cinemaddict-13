import {createElement} from '../util';

const filmsView = () => {

  const getFilmsTemplate = () =>{
    return `
    <section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      <button class="films-list__show-more">Show more</button>
    </section>

    <section class="films-list films-list--extra films-list--rated">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
      </div>
    </section>
    <section class="films-list films-list--extra films-list--commented">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
        <article class="film-card">
        </article>
      </div>
    </section>
  </section>`;
  };

  return createElement(getFilmsTemplate());

};

export {filmsView};
