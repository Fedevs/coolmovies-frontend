import { css } from "@emotion/react";
import { Button } from "@mui/material";
import type { NextPage } from "next";
import {
  reviewsActions,
  useAppDispatch,
  useAppSelector,
  ReviewsState,
} from "../../redux";
import { useEffect } from "react";
import CreateMovieReviewModal from "../../components/CreateMovieReviewModal";

const Reviews: NextPage = () => {
  const dispatch = useAppDispatch();
  const reviewsState = useAppSelector((state: ReviewsState) => state.reviews);
  useEffect(() => {
    dispatch(reviewsActions.fetchAllReviews());
  }, []);

  return (
    <div css={styles.root}>
      <h1>Reviews</h1>
      <Button
        variant={"contained"}
        onClick={() =>
          dispatch(reviewsActions.setShowcreateMovieReviewModal(true))
        }
      >
        Add a review
      </Button>
      {reviewsState.allMovieReviews.length ? (
        reviewsState.allMovieReviews.map((review, index) => (
          <div key={review.id}>
            {reviewsState.allMovieReviews.length}
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
        <div>There's nothing here...</div>
      )}

      <CreateMovieReviewModal
        open={reviewsState.showcreateMovieReviewModal}
        onClose={() =>
          dispatch(reviewsActions.setShowcreateMovieReviewModal(false))
        }
        css={styles.modal}
      ></CreateMovieReviewModal>
    </div>
  );
};

const styles = {
  root: css({
    padding: "30px",
  }),
  modal: css({
    backgroundColor: "white",
  }),
};

export default Reviews;
