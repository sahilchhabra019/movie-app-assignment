import {
  getLatestMovieDetails,
  getMostWatchedMovieDetails,
  getTrendingMovieDetails,
  getMovieGenres,
  ratingStar
} from './api.js';

const image_base_url = 'https://image.tmdb.org/t/p/w500/';
let movieGenres = [];

async function getMovieGenresData() {
  movieGenres = await getMovieGenres();
}

function addListeners(movieData, movieList) {
  var classname = movieList.getElementsByClassName('movie-image');

  var clickFunction = function () {
    var id = this.getAttribute("data-id");
    var currentMovie = movieData.results.filter(movie => id == movie.id)[0];

    const template = document.getElementById("modal-template");
    const modal = template.content.querySelector(".modal");

    const modalNode = document.importNode(modal, true);
    // POPUP CONTENT START
    var moviePopupData = modalNode.querySelector(".primary-text");
    moviePopupData.append(document.createTextNode(currentMovie.original_title));

    var moviePopupDescription = modalNode.querySelector(".movie__content p");
    moviePopupDescription.append(document.createTextNode(currentMovie.overview));

    const popupFigure = modalNode.querySelector('.movie__image img');
    popupFigure.setAttribute("src", image_base_url + currentMovie.poster_path);
    popupFigure.setAttribute("alt", currentMovie.original_title);
    popupFigure.setAttribute("title", currentMovie.original_title);

    const popupGenres = movieGenres.genres.filter(genre => currentMovie.genre_ids.includes(genre.id))
    let finalPopupGenres = '';
    popupGenres.map(item => finalPopupGenres += item.name + ', ');
    finalPopupGenres = finalPopupGenres.slice(0, -2);
    const genres = modalNode.querySelector('.genre__data td')
    genres.appendChild(document.createTextNode(finalPopupGenres));
    // let genre = '';
    // currentMovie.genres.map(genreItem => genre += genreItem.name + ', ');
    // const genredata = modalNode.querySelector('.genre__data td');
    // genredata.append(document.createTextNode(genre));

    //for movie rating
    let ratingMovies = Math.round((currentMovie.vote_average / 2));
    const rating = modalNode.querySelector('.movie__ratingStars span')
    rating.innerHTML = ratingStar(ratingMovies);
    // POPUP CONTENT END 
    modalNode.style.display = "block";

    document.body.append(modalNode);

    var span = document.getElementsByClassName("modal__close")[0];
    span.onclick = function () {
      document.querySelector('.modal').remove();
    }
  };

  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', clickFunction, false);
  }
}

function createCard(movieData, elemId) {
  const template = document.getElementById("latest-movies");
  const movieCard = template.content.querySelector("article");
  movieData.results.slice(0, 4).map(movieResults => {
    console.log(movieResults);
    var movieTitle = movieResults.original_title;
    const node = document.importNode(movieCard, true);

    // for movie image
    const figure = node.querySelector('.movie__image img');
    figure.setAttribute("src", image_base_url + movieResults.poster_path);
    figure.setAttribute("alt", movieTitle);
    figure.setAttribute("title", movieTitle);
    figure.setAttribute("data-id", movieResults.id);

    // for movie title
    const title = node.querySelector('.movie__title h2');
    title.appendChild(document.createTextNode(movieTitle));

    //for movie generes
    const currentGenres = movieGenres.genres.filter(genre => movieResults.genre_ids.includes(genre.id))
    let finalGenres = '';
    currentGenres.map(item => finalGenres += item.name + ', ');
    finalGenres = finalGenres.slice(0, -2);
    const genres = node.querySelector('.movie__generes ul li')
    genres.appendChild(document.createTextNode(finalGenres));
    // console.log(finalGenres);

    //for movie rating
    let ratingMovies = Math.round((movieResults.vote_average / 2));
    const rating = node.querySelector('.movie__ratingStars span')
    rating.innerHTML = ratingStar(ratingMovies);

    //for show more
    const showMore = node.querySelector('.movie__showMore');
    showMore.setAttribute('href', '/movie-details.html?id=' + movieResults.id);

    elemId.append(node);
  });
}

async function populateLatestData() {
  const movieData = await getLatestMovieDetails();
  const movieList = document.getElementById('movies__listing');

  createCard(movieData, movieList);
  addListeners(movieData, movieList);
}

async function populateTrendingData() {
  const movieData = await getTrendingMovieDetails();
  const movieList = document.getElementById('trending_listing');

  createCard(movieData, movieList);
  addListeners(movieData, movieList);
}

async function populateMostWachedData() {
  const movieData = await getMostWatchedMovieDetails();
  const movieList = document.getElementById('mostwatched__listing');

  createCard(movieData, movieList);
  addListeners(movieData, movieList);
}
populateMostWachedData();
getMovieGenresData();
populateLatestData();
populateTrendingData();