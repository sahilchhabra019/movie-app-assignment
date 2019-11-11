// single movie popup function
export function addListeners(movieData, movieList) {
    var movieCards = movieList.getElementsByClassName('movie-image');

    var clickFunction = function () {
        var id = this.getAttribute("data-id");
        var currentMovie = movieData.results.filter(movie => id == movie.id)[0];
        const template = document.getElementById("modal-template");
        const modal = template.content.querySelector(".modal");
        const modalNode = document.importNode(modal, true);

        // MOVIES POPUP CONTENT START

        //Movie Title
        var moviePopupData = modalNode.querySelector(".primary-text");
        moviePopupData.append(document.createTextNode(currentMovie.original_title));

        //movie description
        var moviePopupDescription = modalNode.querySelector(".movie__content p");
        moviePopupDescription.append(document.createTextNode(currentMovie.overview));

        //movie image
        const popupFigure = modalNode.querySelector('.movie__image img');
        popupFigure.setAttribute("src", image_base_url + currentMovie.poster_path);
        popupFigure.setAttribute("alt", currentMovie.original_title);
        popupFigure.setAttribute("title", currentMovie.original_title);

        //movie generes
        const popupGenres = movieGenres.genres.filter(genre => currentMovie.genre_ids.includes(genre.id))
        let finalPopupGenres = '';
        popupGenres.map(item => finalPopupGenres += item.name + ', ');
        finalPopupGenres = finalPopupGenres.slice(0, -2);
        const genres = modalNode.querySelector('.genre__data td')
        genres.appendChild(document.createTextNode(finalPopupGenres));

        //movie rating
        let ratingMovies = Math.round((currentMovie.vote_average / 2));
        const rating = modalNode.querySelector('.movie__ratingStars span')
        rating.innerHTML = ratingStar(ratingMovies);
        //MOVIE POPUP CONTENT END 

        modalNode.style.display = "block";
        document.body.append(modalNode);

        var span = document.getElementsByClassName("modal__close")[0];
        span.onclick = function () {
            document.querySelector('.modal').remove();
        }
    };

    for (var i = 0; i < movieCards.length; i++) {
        movieCards[i].addEventListener('click', clickFunction, false);
    }
}
