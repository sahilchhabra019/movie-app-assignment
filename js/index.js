/* this file contain all js code for home page in movie app */

import {
  LoadData,
} from './load-data/load-api-data.js';

import{
  createCard,
} from './app-common-functions/movie-card.js'
import {
  loadMovieGenresData,
} from './app-common-functions/common-functions.js';
import {
  addListeners
} from './app-common-functions/card-popup.js';


var movieDetails = new LoadData();


// for latest movies section
async function populateLatestData() {
  const movieData = await movieDetails.loadLatestMovieDetails();
  const movieList = document.getElementById('latest__listing');
  createCard(movieData, movieList);
  addListeners(movieData, movieList);
}

// for trending movies section
async function populateTrendingData() {
  const movieData = await movieDetails.loadTrendingMovieDetails();
  const movieList = document.getElementById('trending_listing');
  createCard(movieData, movieList);
  addListeners(movieData, movieList);
}

// for most viewed movie section
async function populateMostWachedData() {
  const movieData = await movieDetails.loadMostWatchedMovieDetails();
  const movieList = document.getElementById('mostwatched__listing');
  createCard(movieData, movieList);
  addListeners(movieData, movieList);
}


// function calling
loadMovieGenresData();
populateLatestData();
populateTrendingData();
populateMostWachedData();

