import {
  createCard
} from './app-common-functions/movie-card.js'

import {
  header,
} from './app-common-functions/header.js'

var latestDataFrom = localStorage.getItem('latestDatalocal');
var parsedObjectlLastest = JSON.parse(latestDataFrom);

var trendingDataFrom = localStorage.getItem('trendingDatalocal');
var parsedObjectTrending = JSON.parse(trendingDataFrom);

var popularDataFrom = localStorage.getItem('popularDatalocal');
var parsedObjectPopular = JSON.parse(popularDataFrom);

var allData = parsedObjectlLastest.results.concat(parsedObjectTrending.results, parsedObjectPopular.results);

var uniqueData = [];
allData.forEach(function (item) {
  var i = uniqueData.findIndex(x => x.id === item.id);
  if (i <= -1) {
    uniqueData.push(item);
  }

});

var range1 = document.getElementById('rangeslider');

range1.addEventListener("change", event => {
  let searchRnage1 = event.target.value;
  let searchRnage = uniqueData.filter(item => {
    if (Math.round((item.vote_average / 2)) === parseInt(searchRnage1)) {
      console.log(searchRnage1, item.vote_average, Math.round((item.vote_average / 2)));
    }
    return Math.round((item.vote_average / 2)) === parseInt(searchRnage1);
  })
  createCard(searchRnage, listing);
});

//for search
var searchInput = document.getElementById('search');

function getMovieSearchData(searchValue = '') {
  let searchResult = uniqueData.filter(item => {
    return item.title.toLowerCase().includes(searchValue.toLowerCase());
  })
  createCard(searchResult, listing);
}

searchInput.addEventListener("keyup", event => {
  let searchValue = event.target.value;
  getMovieSearchData(searchValue);
});

getMovieSearchData();
header();