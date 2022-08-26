import { css } from "@emotion/react";
import { Button } from "@mui/material";
import type { NextPage } from "next";
import {
  reviewsActions,
  useAppDispatch,
  useAppSelector,
  ReviewsState,
} from "/redux";
import { useEffect } from "react";
import AddMovieReviewModal from "../../components/AddMovieReviewModal";

const Reviews: NextPage = () => {
  const dispatch = useAppDispatch();
  const reviewsState = useAppSelector((state: ReviewsState) => state.reviews);
  useEffect(() => {
    dispatch(reviewsActions.fetchAllReviews());
  }, []);

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
        <div>There's nothing here...</div>
      )}

      <Button
        variant={"contained"}
        onClick={() =>
          dispatch(reviewsActions.setShowAddMovieReviewModal(true))
        }
      >
        Add a review
      </Button>
      <AddMovieReviewModal
        open={reviewsState.showAddMovieReviewModal}
        onClose={() =>
          dispatch(reviewsActions.setShowAddMovieReviewModal(false))
        }
        styles={styles.modal}
      ></AddMovieReviewModal>
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
