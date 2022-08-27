import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewsState, Review } from "./types";

const initialState: ReviewsState = {
  value: 0,
  sideEffectCount: 0,
  showcreateMovieReviewModal: false,
  createMovieReviewLoading: false,
  allMovieReviews: [],
};

export const slice = createSlice({
  initialState,
  name: "reviews",
  reducers: {
    fetchAllReviews: () => {},
    createMovieReview: (state, action: PayloadAction<Review>) => {},
    createMovieReviewLoading: (state, action: PayloadAction<boolean>) => {
      state.createMovieReviewLoading = action.payload;
    },
    setShowcreateMovieReviewModal: (state, action: PayloadAction<boolean>) => {
      state.showcreateMovieReviewModal = action.payload;
    },
    movieReviewsloaded: (state, action: PayloadAction<Array<Review>>) => {
      state.allMovieReviews = action.payload;
    },
    updateReviews: (state, action: PayloadAction<Review>) => {
      state.allMovieReviews.unshift(action.payload);
    },
    loadError: (state) => {
      state.fetchData = ["Error Fetching :("];
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export type { ReviewsState, Review };
export default slice.reducer;
