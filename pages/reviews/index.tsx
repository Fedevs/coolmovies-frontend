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
import MovieReviewModal from "../../components/MovieReviewModal";
import MovieReviewCard from "../../components/MovieReviewCard";
import addIcon from "../../public/add.svg";
import { colors, media } from "../../styles/customStyles";

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
            <b>Here are our reviews</b>
          </Typography>
          <Typography variant={"body2"}>
            <b>Pst! Don't forget to leave yours</b>
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
            <div>There's nothing here...</div>
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
  root: css({}),
  header: css({
    margin: "10px 10px 40px 10px",
    border: `1px solid ${colors.black}`,
    maxWidth: "1200px",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "30px 0px 30px 0px",
    backgroundColor: `${colors.lightPink}`,
    color: `${colors.white}`,
    textShadow: "-7px 7px 10px rgba(0,0,0,0.29)",
    "@media(min-width: 1200px)": {
      margin: "10px auto 40px auto",
    },
  }),
  headerTitle: css({
    fontSize: "30px",
    "@media(min-width: 768px)": {
      fontSize: "40px",
    },
  }),
  container: css({
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "10px auto",
  }),
  addReviewButton: css({
    bottom: "10px",
    position: "fixed",
    right: "10px",
    zIndex: "1000",
  }),
};

export default Reviews;
