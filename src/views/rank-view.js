import {createElement} from '../util';

const rankView = () => {

  const getRankTemplate = () =>{
    return `
    <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  };

  return createElement(getRankTemplate());
};

export {rankView};
