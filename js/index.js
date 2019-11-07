/* this file contain all js code for home page in movie app */

import {
  getLatestMovieDetails,
  getMostWatchedMovieDetails,
  getTrendingMovieDetails,
} from './api.js';

import{
  addListeners,
  createCard,
  getMovieGenresData,
} from './common.js';

// for latest movies section
async function populateLatestData() {
  const movieData = await getLatestMovieDetails();
  const movieList = document.getElementById('latest__listing');
  createCard(movieData, movieList);
  addListeners(movieData, movieList);
}

// for trending movies section
async function populateTrendingData() {
  const movieData = await getTrendingMovieDetails();
  const movieList = document.getElementById('trending_listing');
  createCard(movieData, movieList);
  addListeners(movieData, movieList);
}

// for most viewed movie section
async function populateMostWachedData() {
  const movieData = await getMostWatchedMovieDetails();
  const movieList = document.getElementById('mostwatched__listing');
  createCard(movieData, movieList);
  addListeners(movieData, movieList);
}

// function calling
getMovieGenresData();
populateLatestData();
populateTrendingData();
populateMostWachedData();