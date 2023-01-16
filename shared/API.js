import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

export const searchMovies = (query) => {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US`;
  return axios.get(URL);
};

export const getpopularMovies = (page) => {
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
  return axios.get(URL);
};

export const getUpcommingMovies = (page) => {
  const URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`;
  return axios.get(URL);
};

export const getTopRatedMovies = (page) => {
  const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`;
  return axios.get(URL);
};

export const getLatestMovies = (page) => {
  const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
  return axios.get(URL);
};

export const getRecomandationsMovies = (movie_id, page) => {
  const URL = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${apiKey}&language=en-US&page=${page}`;
  return axios.get(URL);
};

export const getSimilarMovies = (movie_id, page) => {
  const URL = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${apiKey}&language=en-US&page=${page}`;
  return axios.get(URL);
};

export const getVideoMovies = async (movie_id) => {
  const URL = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiKey}&language=en-US`;
  return await axios.get(URL);
};

export const getDetailesMovies = (movie_id) => {
  const URL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`;
  return axios.get(URL);
};
