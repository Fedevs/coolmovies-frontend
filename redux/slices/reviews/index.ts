export { actions as reviewsActions } from "./slice";
export { default as reviewsReducer } from "./slice";
export type { ReviewsState, Review, Movie } from "./slice";
import { combineEpics } from "redux-observable";
import {
  getAllReviewsEpic,
  createMovieReviewEpic,
  getCurrentUserEpic,
  getAllMoviesEpic,
  updateMovieReviewEpic,
} from "./epics";

export const reviewsEpics = combineEpics(
  getAllReviewsEpic,
  createMovieReviewEpic,
  getCurrentUserEpic,
  getAllMoviesEpic,
  updateMovieReviewEpic
);
