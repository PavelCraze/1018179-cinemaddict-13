const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

const rankView = () => () => {
  let element = null;

  // {title, isActive, link,counter} -- параметры для пунктов меню
  const getRankTemplate = () =>{
    return`
    <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  };

  const getElement = (item) => {
    if (!element) {
      element = createElement(getRankTemplate(item));
    }

    return element;
  };

  return {
    getElement
  };
};

export {rankView, createElement};
