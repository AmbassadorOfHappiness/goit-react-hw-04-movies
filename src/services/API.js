import axios from 'axios';

const API_KEY = '282d83538a4b35ac35ff32a17e7c3482';
const BASE_URL = 'https://api.themoviedb.org/3';
const fetchTrendingMovies = () => {
    return axios
        .get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,)
        .then(({data}) => data.results);
}
const fetchSearchMovies = (searchQuery) => {
    return axios
        .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=1`,)
        .then(({data}) => data.results);
}

const fetchMovieDetails = (movieId) => {
    return axios
        .get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,)
        .then(({data}) => data);
}

const fetchMovieCredits = (movieId) => {
    return axios
        .get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,)
        .then(({data}) => data);
}

const fetchMovieReviews = (movieId) => {
    return axios
        .get(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,)
        .then(({data}) => data);
}
// console.log(fetchSearchMovies());
export {
    fetchMovieReviews,
    fetchMovieCredits,
    fetchMovieDetails,
    fetchSearchMovies,
    fetchTrendingMovies
};