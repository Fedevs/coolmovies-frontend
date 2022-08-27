import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReviewsState {
  value: number;
  sideEffectCount: number;
  showAddMovieReviewModal: boolean;
  createMovieReviewLoading: boolean;
  allMovieReviews: any;
  fetchData?: any;
}

const initialState: ReviewsState = {
  value: 0,
  sideEffectCount: 0,
  showAddMovieReviewModal: false,
  createMovieReviewLoading: false,
  allMovieReviews: [],
};

export const slice = createSlice({
  initialState,
  name: "reviews",
  reducers: {
    fetchAllReviews: () => {},
    addMovieReview: (state, action: PayloadAction<object>) => {},
    createMovieReviewLoading: (state, action: PayloadAction<boolean>) => {
      state.createMovieReviewLoading = action.payload;
    },
    setShowAddMovieReviewModal: (state, action: PayloadAction<boolean>) => {
      state.showAddMovieReviewModal = action.payload;
    },
    fetch: () => {},
    clearData: (state) => {
      state.fetchData = undefined;
    },
    loaded: (state, action: PayloadAction<any>) => {
      state.allMovieReviews = action.payload;
    },
    updateReviews: (state, action: PayloadAction<any>) => {
      state.allMovieReviews.unshift(action.payload);
    },
    loadError: (state) => {
      state.fetchData = ["Error Fetching :("];
    },
    increment: (state) => {
      state.value += 1;
    },
    epicSideEffect: (state) => {
      state.sideEffectCount += 1;
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
