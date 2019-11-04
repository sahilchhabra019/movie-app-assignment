import {
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

    if(id){
        const movieDetails = await getMovieDetails(id);
        console.log('movieDetails', movieDetails);

        const template = document.getElementById("details");
        const details = template.content.querySelector("div");

        const node = document.importNode(details, true);
        const description = node.querySelector('.para-text');
        description.append(document.createTextNode(movieDetails.overview))

        document.getElementById('main-details').append(node);
    }
}

populateLatestData();