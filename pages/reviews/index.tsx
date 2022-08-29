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
import sadIcon from "../../public/sad.svg";
import { colors, fonts } from "../../styles/customStyles";
import EmptyState from "../../components/EmptyState";

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
              imageProps={{ src: sadIcon, width: 100, height: 100 }}
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
  root: css({ backgroundColor: `${colors.black}` }),
  header: css({
    padding: "25px",
    borderBottom: `1px solid ${colors.grey}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    color: `${colors.white}`,
    textShadow: "-7px 7px 10px rgba(0,0,0,0.29)",
    "@media(min-width: 1200px)": {
      margin: "0px auto 40px auto",
    },
  }),
  headerTitle: css({
    fontSize: "30px",
    letterSpacing: "3px",
    marginBottom: "10px",
    fontFamily: `${fonts.bigShoulders}`,
    "@media(min-width: 768px)": {
      fontSize: "60px",
    },
  }),
  container: css({
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "10px auto",
    paddingTop: "30px",

    backgroundColor: `${colors.black}`,
  }),
  addReviewButton: css({
    position: "fixed",
    bottom: "10px",
    right: "10px",
    zIndex: "1000",
    "@media(min-width: 1200px)": {
      bottom: "5%",
      right: "5%",
    },
  }),
};

export default Reviews;
