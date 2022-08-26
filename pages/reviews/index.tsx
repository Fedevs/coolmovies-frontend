import { css } from "@emotion/react";
import {
  Button,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import type { NextPage } from "next";
import {
  reviewsActions,
  useAppDispatch,
  useAppSelector,
  ReviewsState,
} from "/redux";

const Reviews: NextPage = () => {
  const dispatch = useAppDispatch();
  const reviewsState = useAppSelector((state: ReviewsState) => state.reviews);
  dispatch(reviewsActions.fetchAllReviews()); // find out if it's the right way to get initial data

  return (
    <div css={styles.root}>
      <h1>Reviews</h1>
      {reviewsState.fetchData?.allMovieReviews?.nodes.length ? (
        reviewsState.fetchData?.allMovieReviews?.nodes.map((review, index) => (
          <div key={review.id}>
            <h2>Review {index + 1}</h2>
            <ul>
              <li>{review.id}</li>
              <li>{review.rating}</li>
              <li>{review.body}</li>
              <li>{review.title}</li>
            </ul>
          </div>
        ))
      ) : (
        <div>Nada por aquí...</div>
      )}
    </div>
  );
};

const styles = {
  root: css({
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
};

export default Reviews;
