import SiteProfile from "./view/profile-view";
import Filter from "./view/filter-view";
import {generateFilmCard} from "./mock/film-data";
import {generateFilter} from "./mock/filter";
import {render, RenderPosition} from "./util";
import FilmsPresenter from "./presenter/films";

const NUMBER_OF_FILMS = 20;

const films = new Array(NUMBER_OF_FILMS).fill().map(generateFilmCard);
const filters = generateFilter(films);
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const boardPresenter = new FilmsPresenter(siteMain);

render(siteHeader, new SiteProfile().getElement(), RenderPosition.BEFOREEND);
render(siteMain, new Filter(filters).getElement(), RenderPosition.AFTERBEGIN);

boardPresenter.init(films);
