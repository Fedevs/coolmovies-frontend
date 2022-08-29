export { actions as reviewsActions } from "./slice";
export { default as reviewsReducer } from "./slice";
export type { ReviewsState, Review, Movie } from "./slice";
import { combineEpics } from "redux-observable";
import {
  createMovieReviewEpic,
  getAllMoviesEpic,
  getAllReviewsEpic,
  getCurrentUserEpic,
  updateMovieReviewEpic,
} from "./epics";

export const reviewsEpics = combineEpics(
  createMovieReviewEpic,
  getAllMoviesEpic,
  getAllReviewsEpic,
  getCurrentUserEpic,
  updateMovieReviewEpic
);
