export { actions as reviewsActions } from "./slice";
export { default as reviewsReducer } from "./slice";
import { combineEpics } from "redux-observable";
import { reviewsEpic, fetchAllReviewsEpic, addMovieReviewEpic } from "./epics";

export const reviewsEpics = combineEpics(
  reviewsEpic,
  fetchAllReviewsEpic,
  addMovieReviewEpic
);
