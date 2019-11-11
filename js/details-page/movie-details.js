import {
    loadApiData,
} from './api.js';

import {
    ratingStar,
    getUrlParameter,
    image_base_url,
    createCard,
    addListeners,
} from './common.js';

// single movie details function
async function singleMovieDetails() {
    const id = getUrlParameter('id');

    if (id) {
        const movieDetails = await loadApiData.loadMovieDetails(id);

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

        const castData = node.querySelector('.cast__data td');
        movieDetails.credits.cast.slice(0, 8).map(item => {

            var aTag = document.createElement('a');
            aTag.setAttribute('href', "hello.html?id=" + item.id);
            aTag.innerText = item.name;
            castData.appendChild(aTag);

            castData.append()
        });

        //for movie rating
        let ratingMovies = Math.round((movieDetails.vote_average / 2));
        const rating = node.querySelector('.movie__ratingStars span')
        rating.innerHTML = ratingStar(ratingMovies);

        document.getElementById('main-details').append(node);
    }
}

singleMovieDetails();
populateActorDetails();
populateRelatedMovies();