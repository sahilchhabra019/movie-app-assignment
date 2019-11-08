import {
    getMovieDetails,
    getRelatedMovies
} from './api.js';

import {
    ratingStar,
    findGetParameter,
    image_base_url,
    createCard,
    addListeners,
} from './common.js';

// single movie details function
async function singleMovieDetails() { 
    const id = findGetParameter('id');

    if (id) {
        const movieDetails = await getMovieDetails(id);
        // console.log('movieDetails', movieDetails);

        // get template tag content and import it
        const template = document.getElementById("details");
        const details = template.content.querySelector("div");
        const node = document.importNode(details, true);

        // find description of movie and append api overview into html
        const description = node.querySelector('.para-text');
        description.append(document.createTextNode(movieDetails.overview))

        // find title of movie and append api title into html
        const movieTitle = node.querySelector('.primary-text')
        movieTitle.append(document.createTextNode(movieDetails.original_title))

        // find image of movie and append api image,img title,img alt into html
        const moviePoster = node.querySelector('.full__banner figure img');
        moviePoster.setAttribute("src", image_base_url + movieDetails.poster_path);
        moviePoster.setAttribute("alt", movieDetails.original_title);
        moviePoster.setAttribute("title", movieDetails.original_title);

        // find generes of movie and append api generes into html
        let genre = '';
        movieDetails.genres.map(genreItem => genre += genreItem.name + ', ');
        const genredata = node.querySelector('.genre__data td');
        genredata.append(document.createTextNode(genre));

        // find cast of movie and append api cast names into html
        let cast = '';
        movieDetails.credits.cast.slice(0, 8).map(item => cast += item.name + ', ');
        cast = cast.slice(0, -2);
        const castData = node.querySelector('.cast__data td');
        castData.append(document.createTextNode(cast))

        //for movie rating
        let ratingMovies = Math.round((movieDetails.vote_average / 2));
        const rating = node.querySelector('.movie__ratingStars span')
        rating.innerHTML = ratingStar(ratingMovies);

        document.getElementById('main-details').append(node);
    }
}


async function populateRelatedMovies() {
    const id = findGetParameter('id');
    // console.log(id);
    if(id){
    const movieData = await getRelatedMovies();
    const movieList = document.getElementById('related-listing');
    createCard(movieData, movieList);
    addListeners(movieData, movieList);
  }
}

singleMovieDetails();
populateRelatedMovies();