import {
    findGetParameter,
    getDirector,
} from './common-functions.js'
import {addListeners} from './card-popup.js'
import {LoadData} from '../load-data/load-api-data.js'
import {createCard} from './movie-card.js'

var relatedData = new LoadData();

export async function populateRelatedMovies() {
    const id = findGetParameter('id');
    if (id) {
        var RelatedData = new LoadData();
        const movieData = await relatedData.loadRelatedMovies(id);
        const movieList = document.getElementById('related-listing');
        createCard(movieData, movieList);
        addListeners(movieData, movieList);
    }
}