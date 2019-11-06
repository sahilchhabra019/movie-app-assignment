import {
    ratingStar,
    getMovieDetails
} from './api.js';

const image_base_url = 'https://image.tmdb.org/t/p/w500/';

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

async function populateLatestData() {
    const id = findGetParameter('id');

    if (id) {
        const movieDetails = await getMovieDetails(id);
        console.log('movieDetails', movieDetails);

        const template = document.getElementById("details");
        const details = template.content.querySelector("div");

        const node = document.importNode(details, true);
        const description = node.querySelector('.para-text');
        description.append(document.createTextNode(movieDetails.overview))

        const movieTitle = node.querySelector('.primary-text')
        movieTitle.append(document.createTextNode(movieDetails.original_title))

        const moviePoster = node.querySelector('.full__banner figure img');
        moviePoster.setAttribute("src", image_base_url + movieDetails.poster_path);
        moviePoster.setAttribute("alt", movieDetails.original_title);
        moviePoster.setAttribute("title", movieDetails.original_title);

        let genre = '';
        movieDetails.genres.map(genreItem => genre += genreItem.name + ', ');
        const genredata = node.querySelector('.genre__data td');
        genredata.append(document.createTextNode(genre));

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

populateLatestData();