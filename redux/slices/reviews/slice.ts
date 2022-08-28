import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewsState, Review, User, Movie, ModalStep } from "./types";

const initialState: ReviewsState = {
  showcreateMovieReviewModal: { open: false },
  createMovieReviewLoading: false,
  allMovieReviews: [],
  movies: [],
  user: { id: "", name: "" },
};

export const slice = createSlice({
  initialState,
  name: "reviews",
  reducers: {
    getAllMovies: () => {},
    moviesLoaded: (state, action: PayloadAction<Array<Movie>>) => {
      state.movies = action.payload;
    },
    getAllReviews: () => {},
    getCurrentUser: () => {},
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    createMovieReview: (state, action: PayloadAction<Review>) => {},
    createMovieReviewLoading: (state, action: PayloadAction<ModalStep>) => {
      state.createMovieReviewLoading = action.payload;
    },
    setShowcreateMovieReviewModal: (
      state,
      action: PayloadAction<ModalStep>
    ) => {
      state.showcreateMovieReviewModal = action.payload;
    },
    movieReviewsloaded: (state, action: PayloadAction<Array<Review>>) => {
      state.allMovieReviews = action.payload;
    },
    updateReviews: (state, action: PayloadAction<Review>) => {
      const { payload } = action;
      const { id, name } = state.user;
      const newReview = { ...payload, userByUserReviewerId: { id, name } };
      state.allMovieReviews.unshift(newReview);
    },
    loadError: (state) => {
      // state.fetchData = ["Error Fetching :("];
      alert("error");
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export type { ReviewsState, Review, Movie };
export default slice.reducer;
