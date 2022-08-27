import { Epic, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { RootState } from "../../store";
import { EpicDependencies } from "../../types";
import { actions, SliceAction } from "./slice";
import ALL_MOVIE_REVIEWS from "../../../assets/graphql/queries/AllMovieReviews";
import CREATE_MOVIE_REVIEW from "../../../assets/graphql/mutations/CreateMovieReview";
import CURRENT_USER from "../../../assets/graphql/queries/CurrentUser";

export const getCurrentUser: Epic = (
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
        return actions.loadError();
      }
    })
  );

export const fetchAllReviewsEpic: Epic = (
  action$: Observable<SliceAction["fetchAllReviews"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetchAllReviews.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: ALL_MOVIE_REVIEWS,
        });
        return actions.movieReviewsloaded(result.data.allMovieReviews.nodes);
      } catch (err) {
        return actions.loadError();
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

        return actions.updateReviews(result.data.createMovieReview.movieReview);
      } catch (err) {
        return actions.loadError();
      }
    })
  );
};
