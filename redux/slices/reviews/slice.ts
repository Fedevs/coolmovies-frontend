import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ReviewsState {
  value: number;
  sideEffectCount: number;
  fetchData?: unknown[];
}

const initialState: ReviewsState = {
  value: 0,
  sideEffectCount: 0,
};

export const slice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    fetch: () => {},
    clearData: (state) => {
      state.fetchData = undefined;
    },
    loaded: (state, action: PayloadAction<{ data: unknown[] }>) => {
      state.fetchData = action.payload.data;
    },
    loadError: (state) => {
      state.fetchData = ['Error Fetching :('];
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
