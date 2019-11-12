import{
    image_base_url,
    movieGenres,
    ratingStar,
    getDirector,
} from './common-functions.js'

import{
    LoadData,
} from '../load-data/load-api-data.js'

var singleMovie = new LoadData();

// single movie popup function
export function addListeners(movieData, movieList) {
    var movieCards = movieList.getElementsByClassName('movie-image');

    var clickFunction = async function () {
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

        // for movie cast
        
        let singleMovieData = await singleMovie.loadMovieDetails(currentMovie.id);
        let cast = '';
        singleMovieData.credits.cast.slice(0, 8).map(movieCast => cast += movieCast.name + ', ');
        cast = cast.slice(0, -2);
        const castMovie = modalNode.querySelector('.cast__data td')
        castMovie.appendChild(document.createTextNode(cast));
      

        const directorMovie = modalNode.querySelector('.dir__data td')
        directorMovie.appendChild(document.createTextNode(getDirector(singleMovieData)));



        modalNode.style.display = "block";
        document.body.append(modalNode);

        var span = document.getElementsByClassName("modal__close")[0];
        var spanBottom = document.getElementsByClassName("modal__close--bottom")[0];
        spanBottom.onclick = function(){
            document.querySelector('.modal').remove();
        }
        span.onclick = function () {
            document.querySelector('.modal').remove();
        }
    };

    for (var i = 0; i < movieCards.length; i++) {
        movieCards[i].addEventListener('click', clickFunction, false);
    }
}