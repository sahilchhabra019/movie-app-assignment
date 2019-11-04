import {
  getLatestMovieDetails,
  getMovieGenres
} from './api.js';

const image_base_url = 'https://image.tmdb.org/t/p/w500/';

async function populateLatestData() {
  const movieGenres = await getMovieGenres();
  const movieData = await getLatestMovieDetails();
  const template = document.getElementById("latest-movies");
  const movieList = document.getElementById('movies__listing');
  const movieCard = template.content.querySelector("article");
  
  movieData.results.slice(0, 4).map(movieResults => {
    var movieTitle = movieResults.original_title;
    const node = document.importNode(movieCard, true);

    // for movie image
    const figure = node.querySelector('.movie__image img');
    figure.setAttribute("src", image_base_url + movieResults.poster_path);
    figure.setAttribute("alt", movieTitle);
    figure.setAttribute("title", movieTitle);

    // for movie title
    const title = node.querySelector('.movie__title h2');
    title.appendChild(document.createTextNode(movieTitle));

    //for movie generes
    const currentGenres = movieGenres.genres.filter(genre => movieResults.genre_ids.includes(genre.id) )
    let finalGenres = '';
    currentGenres.map(item => finalGenres += item.name + ', ');
    finalGenres = finalGenres.slice(0, -2); 
    //for movie rating

    //for show more
    const showMore = node.querySelector('.movie__showMore');
    showMore.setAttribute('href', '/movie-details.html?id=' + movieResults.id);

    movieList.append(node);
  });
}

populateLatestData();