import { apiRequest } from "./axios";
import { API_KEY } from "@env";

const base_url = "https://api.themoviedb.org/3";

const trendingMovie = `${base_url}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMovie = `${base_url}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMovie = `${base_url}/movie/top_rated?api_key=${API_KEY}`;

export const fetchingTrendingMovie = () => {
  return apiRequest(trendingMovie);
};

export const fetchingUpcomingMovie = () => {
  return apiRequest(upcomingMovie);
};

export const fetchingTopRatedMovie = () => {
  return apiRequest(topRatedMovie);
};
