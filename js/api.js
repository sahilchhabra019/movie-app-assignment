const API_KEY = '9534ef382ae85c9a187075719f8e1961';
const BASE_URL = 'https://api.themoviedb.org/3';

// latest movies data api
export const getLatestMovieDetails = async () => {
    const latest_url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
    return fetch(latest_url).then(response => response.json());
}

// most watched movies data api
export const getMostWatchedMovieDetails = async () => {
    const mostWatched_url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    return fetch(mostWatched_url).then(response => response.json());
}

// trending movies data api
export const getTrendingMovieDetails = async () => {
    const trending_url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY} `;
    return fetch(trending_url).then(response => response.json());
}

// movies generes data api
export const getMovieGenres = async () => {
    const genres_url =  `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return fetch(genres_url).then(response => response.json());
}

// single movie details data api
export const getMovieDetails = async (movieId) => {
    const movieDetailsUrl =  `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
    return fetch(movieDetailsUrl).then(response => response.json());
}

// related movies data api
export const getRelatedMovies = async (movieId) => {
    const RelatedMovieUrl =  `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`;
    return fetch(RelatedMovieUrl).then(response => response.json());
}
