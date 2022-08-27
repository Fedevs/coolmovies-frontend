import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewsState, Review, User } from "./types";

const initialState: ReviewsState = {
  value: 0,
  sideEffectCount: 0,
  showcreateMovieReviewModal: false,
  createMovieReviewLoading: false,
  allMovieReviews: [],
  user: { id: "", name: "" },
};

export const slice = createSlice({
  initialState,
  name: "reviews",
  reducers: {
    fetchAllReviews: () => {},
    getCurrentUser: () => {},
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
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
      // state.fetchData = ["Error Fetching :("];
      alert("error");
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export type { ReviewsState, Review };
export default slice.reducer;
