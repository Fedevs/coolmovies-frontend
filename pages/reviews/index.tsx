import { css } from "@emotion/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, Fab, Typography } from "@mui/material";
import {
  reviewsActions,
  useAppDispatch,
  useAppSelector,
  Review,
} from "../../redux";
import MovieReviewModal from "../../src/components/MovieReviewModal";
import MovieReviewCard from "../../src/components/MovieReviewCard";
import EmptyState from "../../src/components/EmptyState";
import addIcon from "../../public/add.svg";
import { colors, fonts } from "../../src/assets/styles/customStyles";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
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

  const openModal = () => {
    dispatch(reviewsActions.setMovieReviewModalStatus({ open: true }));
  };

  return (
    <ThemeProvider theme={theme}>
      <div css={styles.root}>
        <Box css={styles.header}>
          <Typography variant={"h1"} css={styles.headerTitle}>
            Here are our reviews 🎬​
          </Typography>
          <Typography variant={"h6"}>
            Pst! Don't forget to leave yours
          </Typography>
        </Box>
        <Container css={styles.container}>
          {reviewsState.allMovieReviews.length ? (
            reviewsState.allMovieReviews.map((review: Review) => (
              <MovieReviewCard
                review={review}
                key={review.id}
              ></MovieReviewCard>
            ))
          ) : (
            <EmptyState
              text="No reviews added"
              buttonText="Be the first!"
              onClick={openModal}
            ></EmptyState>
          )}

          {reviewsState.movieReviewModalStatus && (
            <MovieReviewModal
              open={reviewsState.movieReviewModalStatus.open}
            ></MovieReviewModal>
          )}

          <Fab
            color="primary"
            size="large"
            css={styles.addReviewButton}
            onClick={openModal}
          >
            <Image src={addIcon}></Image>
          </Fab>
        </Container>
      </div>
    </ThemeProvider>
  );
};

const styles = {
  root: css({
    backgroundColor: `${colors.black}`,
    height: "100%",
    minHeight: "100vh",
  }),
  header: css({
    alignItems: "center",
    borderBottom: `1px solid ${colors.grey}`,
    color: `${colors.white}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "25px",
    textShadow: "-7px 7px 10px rgba(0,0,0,0.29)",
    "@media(min-width: 1200px)": {
      margin: "0px auto 40px auto",
    },
  }),
  headerTitle: css({
    fontFamily: `${fonts.bigShoulders}`,
    fontSize: "30px",
    letterSpacing: "3px",
    marginBottom: "10px",
    "@media(min-width: 768px)": {
      fontSize: "60px",
    },
  }),
  container: css({
    backgroundColor: `${colors.black}`,
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    margin: "auto",
    padding: "10px auto",
    paddingTop: "30px",
  }),
  addReviewButton: css({
    bottom: "10px",
    position: "fixed",
    right: "10px",
    zIndex: "1000",
    "@media(min-width: 1200px)": {
      bottom: "5%",
      right: "5%",
    },
  }),
};

export default Reviews;
