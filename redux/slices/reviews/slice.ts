import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewsState, Review, User, Movie, ModalStep } from "./types";

const initialState: ReviewsState = {
  createMovieReviewLoading: false,
  movieReviewModalStatus: { open: false },
  allMovieReviews: [],
  movies: [],
  user: { id: "", name: "" },
  error: false,
};

export const slice = createSlice({
  initialState,
  name: "reviews",
  reducers: {
    createMovieReview: (state, action: PayloadAction<Review>) => {},
    getAllMovies: () => {},
    getAllReviews: () => {},
    getCurrentUser: () => {},
    movieReviewsloaded: (state, action: PayloadAction<Array<Review>>) => {
      state.allMovieReviews = action.payload;
    },
    moviesLoaded: (state, action: PayloadAction<Array<Movie>>) => {
      state.movies = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setMovieReviewModalStatus: (state, action: PayloadAction<ModalStep>) => {
      state.movieReviewModalStatus = action.payload;
    },
    updateMovieReview: (state, action: PayloadAction<Review>) => {},
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export type { ReviewsState, Review, Movie };
export default slice.reducer;
