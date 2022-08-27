import { css } from "@emotion/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Fab } from "@mui/material";
import {
  reviewsActions,
  useAppDispatch,
  useAppSelector,
  Review,
} from "../../redux";
import CreateMovieReviewModal from "../../components/CreateMovieReviewModal";
import MovieReviewCard from "../../components/MovieReviewCard";
import addIcon from "../../public/add.svg";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9C27B0",
    },
  },
});

const Reviews: NextPage = () => {
  const dispatch = useAppDispatch();
  const reviewsState = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(reviewsActions.getAllReviews());
    dispatch(reviewsActions.getCurrentUser());
    dispatch(reviewsActions.getAllMovies());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container css={styles.root}>
        {reviewsState.allMovieReviews.length ? (
          reviewsState.allMovieReviews.map((review: Review) => (
            <MovieReviewCard review={review} key={review.id}></MovieReviewCard>
          ))
        ) : (
          <div>There's nothing here...</div>
        )}

        {reviewsState.showcreateMovieReviewModal && (
          <CreateMovieReviewModal
            open={reviewsState.showcreateMovieReviewModal}
            onClose={() =>
              dispatch(reviewsActions.setShowcreateMovieReviewModal(false))
            }
            movies={reviewsState.movies}
            dispatch={dispatch}
          ></CreateMovieReviewModal>
        )}

        <Fab
          color="primary"
          size="large"
          css={styles.addReviewButton}
          onClick={() =>
            dispatch(reviewsActions.setShowcreateMovieReviewModal(true))
          }
        >
          <Image src={addIcon}></Image>
        </Fab>
      </Container>
    </ThemeProvider>
  );
};

const styles = {
  root: css({
    backgroundColor: "#C5CAE9",
    paddingBottom: "10px",
    paddingTop: "10px",
  }),
  addReviewButton: css({
    bottom: "10px",
    position: "fixed",
    right: "10px",
    zIndex: "1000",
  }),
};

export default Reviews;
