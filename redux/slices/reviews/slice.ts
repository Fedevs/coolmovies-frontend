import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewsState, Review, User, Movie, ModalStep } from "./types";

const initialState: ReviewsState = {
  createMovieReviewLoading: false,
  showMovieReviewModal: { open: false },
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
    getCurrentUser: () => {},
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    getAllReviews: () => {},
    createMovieReview: (state, action: PayloadAction<Review>) => {},
    movieReviewsloaded: (state, action: PayloadAction<Array<Review>>) => {
      state.allMovieReviews = action.payload;
    },
    updateMovieReview: (state, action: PayloadAction<Review>) => {},
    setShowMovieReviewModal: (state, action: PayloadAction<ModalStep>) => {
      state.showMovieReviewModal = action.payload;
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
