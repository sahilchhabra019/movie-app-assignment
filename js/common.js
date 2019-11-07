/* all common functions which are used in movie ap project */

import {
    getMovieGenres,
} from './api.js';


const image_base_url = 'https://image.tmdb.org/t/p/w500/';

// movie generes function 
let movieGenres = [];
export async function getMovieGenresData() {
    movieGenres = await getMovieGenres();
}

// movie rating function
export function ratingStar(rating) {
    let ratingData = ''
    for (let i = 0; i <= 4; i++) {
        ratingData = `${ratingData} <i class= "fa ${rating >= i ?'fa-star' : 'fa-star-o'}"></i>`
    }
    return ratingData;
}

// single movie card 
export function createCard(movieData, elemId) {
    const template = document.getElementById("latest-movies");
    const movieCard = template.content.querySelector("article");
    movieData.results.slice(0, 4).map(movieResults => {
        // console.log(movieResults);
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

// single movie popup function
export function addListeners(movieData, movieList) {
    var movieCards = movieList.getElementsByClassName('movie-image');

    var clickFunction = function () {
        var id = this.getAttribute("data-id");
        // console.log(id);
        var currentMovie = movieData.results.filter(movie => id == movie.id)[0];

        const template = document.getElementById("modal-template");
        const modal = template.content.querySelector(".modal");

        const modalNode = document.importNode(modal, true);
        // POPUP CONTENT START

        //for Movie Title
        var moviePopupData = modalNode.querySelector(".primary-text");
        moviePopupData.append(document.createTextNode(currentMovie.original_title));

        // for movie description
        var moviePopupDescription = modalNode.querySelector(".movie__content p");
        moviePopupDescription.append(document.createTextNode(currentMovie.overview));

        // for movie image
        const popupFigure = modalNode.querySelector('.movie__image img');
        popupFigure.setAttribute("src", image_base_url + currentMovie.poster_path);
        popupFigure.setAttribute("alt", currentMovie.original_title);
        popupFigure.setAttribute("title", currentMovie.original_title);

        // for movie generes
        const popupGenres = movieGenres.genres.filter(genre => currentMovie.genre_ids.includes(genre.id))
        let finalPopupGenres = '';
        popupGenres.map(item => finalPopupGenres += item.name + ', ');
        finalPopupGenres = finalPopupGenres.slice(0, -2);
        const genres = modalNode.querySelector('.genre__data td')
        genres.appendChild(document.createTextNode(finalPopupGenres));

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

    for (var i = 0; i < movieCards.length; i++) {
        movieCards[i].addEventListener('click', clickFunction, false);
    }
}

getMovieGenresData();