import {
    image_base_url,
    movieGenres,
    ratingStar
} from './common-functions.js'

// single movie card 
export function createCard(movieData, elemId) {
    const template = document.getElementById("movies-listing");
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

    var hearts = document.getElementsByClassName('movie__fav--heart');
    
    for (var i = 0; i < hearts.length; i++) {
        console.log(hearts[i]);
        hearts[i].addEventListener('click', function () {
            this.setAttribute("class", 'red movie__fav--heart');
        });
    }
}