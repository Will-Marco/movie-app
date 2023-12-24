import { apiRequest } from "./axios";
import { API_KEY } from "@env";

const base_url = "https://api.themoviedb.org/3";

const trendingMovie = `${base_url}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMovie = `${base_url}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMovie = `${base_url}/movie/top_rated?api_key=${API_KEY}`;
const popularMovie = `${base_url}/movie/popular?api_key=${API_KEY}`;

const movieDetails = (id) => `${base_url}/movie/${id}?api_key=${API_KEY}`;
const movieCredits = (id) =>
  `${base_url}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMovies = (id) =>
  `${base_url}/movie/${id}/similar?api_key=${API_KEY}`;
const personalDetails = (id) => `${base_url}/person/${id}?api_key=${API_KEY}`;
const personalMovies = (id) =>
  `${base_url}/person/${id}/movie_credits?api_key=${API_KEY}`;
const searchMovies = `${base_url}/search/movie?api_key=${API_KEY}`;

export const fetchingTrendingMovie = () => {
  return apiRequest(trendingMovie);
};

export const fetchingUpcomingMovie = () => {
  return apiRequest(upcomingMovie);
};

export const fetchingTopRatedMovie = () => {
  return apiRequest(topRatedMovie);
};

export const fetchingPopularMovie = () => {
  return apiRequest(popularMovie);
};

export const fetchingMovieDetail = (id) => {
  return apiRequest(movieDetails(id));
};

export const fetchingMovieCredits = (id) => {
  return apiRequest(movieCredits(id));
};

export const fetchingSimilarMovie = (id) => {
  return apiRequest(similarMovies(id));
};

export const fetchingPersonalDetails = (id) => {
  return apiRequest(personalDetails(id));
};

export const fetchingPersonalMovies = (id) => {
  return apiRequest(personalMovies(id));
};

export const fetchingSearchMovies = params => {
  return apiRequest(searchMovies, params);
}

export const fetchingImage500 = (posterPath) => {
  return posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null;
};

export const fetchingImage342 = (posterPath) => {
  return posterPath ? "https://image.tmdb.org/t/p/w342" + posterPath : null;
};

export const fetchingImage185 = (posterPath) => {
  return posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null;
};
