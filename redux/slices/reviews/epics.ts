import { Epic, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { RootState } from "../../store";
import { EpicDependencies } from "../../types";
import { actions, SliceAction } from "./slice";
import ALL_MOVIE_REVIEWS from "../../../assets/graphql/queries/AllMovieReviews";
import CREATE_MOVIE_REVIEW from "../../../assets/graphql/mutations/CreateMovieReview";

export const reviewsEpic: Epic = (
  action$: Observable<SliceAction["increment"]>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    filter(actions.increment.match),
    filter(() => Boolean(state$.value.reviews.value % 2)),
    map(() => actions.epicSideEffect())
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
        return actions.loaded({ data: result.data });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

export const addMovieReviewEpic: Epic = (
  action$: Observable<SliceAction["addMovieReview"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) => {
  return action$.pipe(
    filter(actions.addMovieReview.match),
    switchMap(async (action) => {
      try {
        const result = await client.mutate({
          mutation: CREATE_MOVIE_REVIEW,
          variables: {
            input: {
              movieReview: action.payload,
            },
          },
        });

        return actions.fetchAllReviews();
      } catch (err) {
        return actions.loadError();
      }
    })
  );
};
