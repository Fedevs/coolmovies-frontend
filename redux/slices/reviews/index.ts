export { actions as reviewsActions } from "./slice";
export { default as reviewsReducer } from "./slice";
export type { ReviewsState, Review } from "./slice";
import { combineEpics } from "redux-observable";
import {
  fetchAllReviewsEpic,
  createMovieReviewEpic,
  getCurrentUser,
} from "./epics";

export const reviewsEpics = combineEpics(
  fetchAllReviewsEpic,
  createMovieReviewEpic,
  getCurrentUser
);
