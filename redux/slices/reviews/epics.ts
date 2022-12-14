import { Epic, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { RootState } from "../../store";
import { EpicDependencies } from "../../types";
import { actions, SliceAction } from "./slice";
import {
  ALL_MOVIE_REVIEWS,
  ALL_MOVIES,
  CREATE_MOVIE_REVIEW,
  CURRENT_USER,
  UPDATE_MOVIE_REVIEW,
} from "../../../src/assets/graphql";

export const getAllMoviesEpic: Epic = (
  action$: Observable<SliceAction["getAllMovies"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.getAllMovies.match),
    switchMap(async () => {
      try {
        const { data } = await client.query({
          query: ALL_MOVIES,
        });
        return actions.moviesLoaded(data.allMovies.nodes);
      } catch (err) {
        return actions.setError(true);
      }
    })
  );

export const getCurrentUserEpic: Epic = (
  action$: Observable<SliceAction["getCurrentUser"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.getCurrentUser.match),
    switchMap(async () => {
      try {
        const { data } = await client.query({
          query: CURRENT_USER,
        });
        return actions.updateUser(data.currentUser);
      } catch (err) {
        return actions.setError(true);
      }
    })
  );

export const getAllReviewsEpic: Epic = (
  action$: Observable<SliceAction["getAllReviews"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.getAllReviews.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: ALL_MOVIE_REVIEWS,
          fetchPolicy: "network-only",
        });
        return actions.movieReviewsloaded(result.data.allMovieReviews.nodes);
      } catch (err) {
        return actions.setError(true);
      }
    })
  );

export const createMovieReviewEpic: Epic = (
  action$: Observable<SliceAction["createMovieReview"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) => {
  return action$.pipe(
    filter(actions.createMovieReview.match),
    switchMap(async (action) => {
      try {
        const result = await client.mutate({
          mutation: CREATE_MOVIE_REVIEW,
          variables: {
            input: {
              movieReview: {
                ...action.payload,
                userReviewerId: state$.value.reviews.user.id,
              },
            },
          },
        });
        return actions.getAllReviews();
      } catch (err) {
        return actions.setError(true);
      }
    })
  );
};

export const updateMovieReviewEpic: Epic = (
  action$: Observable<SliceAction["updateMovieReview"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) => {
  return action$.pipe(
    filter(actions.updateMovieReview.match),
    switchMap(async (action) => {
      try {
        const result = await client.mutate({
          mutation: UPDATE_MOVIE_REVIEW,
          variables: {
            input: { ...action.payload },
          },
        });
        return actions.getAllReviews();
      } catch (err) {
        return actions.setError(true);
      }
    })
  );
};
