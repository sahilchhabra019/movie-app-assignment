/* all common functions which are used in movie ap project */

import {
    loadMovieGenres,
} from './api.js';

export const image_base_url = 'https://image.tmdb.org/t/p/w500/';

// movie generes function 
var movieGenres = [];
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

export function getUrlParameter(movieURL) {
    var result = null,
        tmpMovieURL = [];
    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmpMovieURL = item.split("=");
            if (tmpMovieURL[0] === movieURL) result = decodeURIComponent(tmpMovieURL[1]);
        });
    return result;
}

getMovieGenresData();