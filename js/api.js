const API_KEY = '9534ef382ae85c9a187075719f8e1961';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getLatestMovieDetails = async () => {
    const latest_url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
    return fetch(latest_url).then(response => response.json());
}

export const getMovieGenres = async () => {
    const genres_url =  `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return fetch(genres_url).then(response => response.json());
}



export const getMovieDetails = async (movieId) => {
    const movieDetailsUrl =  `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
    return fetch(movieDetailsUrl).then(response => response.json());
}