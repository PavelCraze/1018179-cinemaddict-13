const render = (element, itemView) => {
  const newFragment = document.createDocumentFragment();
  const newElement = itemView;
  newFragment.appendChild(newElement);
  element.appendChild(newFragment);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

const getRandomNumber = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));
const getRandomElement = (array) => {
  const rand = Math.floor(Math.random() * array.length);
  return array[rand];
};
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const getShuffledSubarray = (array, numberOfElements) => {
  const shuffledArr = shuffleArray(array);
  return shuffledArr.slice(0, numberOfElements);
};

export {render, createElement, getRandomNumber, getRandomElement, getShuffledSubarray};
