export let loadApiData = {
    
    API_KEY = '9534ef382ae85c9a187075719f8e1961';
    BASE_URL = 'https://api.themoviedb.org/3';

    loadLatestMovieDetails = async function () {
        const latest_url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
        return fetch(latest_url).then(response => response.json());
    },

    loadMostWatchedDetails = async function () {
        const mostWatched_url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        return fetch(mostWatched_url).then(response => response.json());
    },

    loadTrendingMovieDetails = async function () {
        const trending_url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY} `;
        return fetch(trending_url).then(response => response.json());
    },

    loadMovieGenres = async function () {
        const genres_url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
        return fetch(genres_url).then(response => response.json());
    },

    loadMovieDetails = async function (movieId) {
        const movieDetailsUrl = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
        return fetch(movieDetailsUrl).then(response => response.json());
    },

    loadRelatedMovies = async function (movieId) {
        const RelatedMovieUrl = `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`;
        return fetch(RelatedMovieUrl).then(response => response.json());
    },

    loadActorDetails = async function (ACTOR_ID) {
        const actorDetailsUrl = `${BASE_URL}/person/${ACTOR_ID}?api_key=${API_KEY}&language=en-US`;
        return fetch(actorDetailsUrl).then(response => response.json());
    },
}