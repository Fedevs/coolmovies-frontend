import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReviewsState {
  value: number;
  sideEffectCount: number;
  showAddMovieReviewModal: boolean;
  fetchData?: unknown[];
}

const initialState: ReviewsState = {
  value: 0,
  sideEffectCount: 0,
  showAddMovieReviewModal: false,
};

export const slice = createSlice({
  initialState,
  name: "reviews",
  reducers: {
    fetchAllReviews: () => {},
    setShowAddMovieReviewModal: (state, action: PayloadAction<boolean>) => {
      state.showAddMovieReviewModal = action.payload;
    },
    fetch: () => {},
    clearData: (state) => {
      state.fetchData = undefined;
    },
    loaded: (state, action: PayloadAction<{ data: unknown[] }>) => {
      state.fetchData = action.payload.data;
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
