import { gql } from "@apollo/client";
import { Epic, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { RootState } from "../../store";
import { EpicDependencies } from "../../types";
import { actions, SliceAction } from "./slice";

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
          query: allMovieReviewsQuery,
        });
        return actions.loaded({ data: result.data });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

const allMovieReviewsQuery = gql`
  query AllMovieReviews {
    allMovieReviews {
      nodes {
        id
        rating
        body
        title
        movieId
        nodeId
        userReviewerId
      }
    }
  }
`;
