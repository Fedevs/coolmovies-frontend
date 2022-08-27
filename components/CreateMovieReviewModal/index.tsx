import { css } from "@emotion/react";
import {
  Modal,
  Box,
  FormControl,
  Typography,
  Rating,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FC, SyntheticEvent, useState } from "react";
import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { reviewsActions, Review, ReviewsState, Movie } from "../../redux";

type ModalProps = {
  open: boolean;
  onClose: () => {};
  dispatch: Dispatch<AnyAction> &
    ThunkDispatch<{ reviews: ReviewsState }, null, AnyAction> &
    ThunkDispatch<{ reviews: ReviewsState }, undefined, AnyAction>;
  movies: Array<Movie>;
};

const initialMovieReviewValues: Review = {
  title: "",
  body: "",
  rating: 5,
  movieId: "",
  userReviewerId: "",
};

const createMovieReviewModal: FC<ModalProps> = ({
  open,
  onClose,
  dispatch,
  movies,
}: ModalProps) => {
  const [movieReview, setMovieReview] = useState(initialMovieReviewValues);

  const onChange = (
    event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target as HTMLInputElement;
    setMovieReview({ ...movieReview, [name]: value });
  };

  const onSubmit = () => {
    dispatch(reviewsActions.createMovieReview(movieReview));
    setMovieReview(initialMovieReviewValues);
    dispatch(reviewsActions.setShowcreateMovieReviewModal(false));
  };

  const autocompleteProps = {
    options: movies,
    getOptionLabel: (option: Movie) => option.title,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-movie-review-modal-title"
      aria-describedby="add-movie-review-modal-description"
    >
      <Box css={styles.box}>
        <Typography variant={"h5"} css={styles.title}>
          Rate the movie 🎬​
        </Typography>
        <FormControl fullWidth css={styles.form}>
          <Autocomplete
            {...autocompleteProps}
            css={styles.formElement}
            autoComplete
            disablePortal
            aria-required
            isOptionEqualToValue={(option: Movie, value: Movie) =>
              option.id === value.id
            }
            id="movieId"
            onChange={(event, value) =>
              setMovieReview({ ...movieReview, movieId: value?.id! })
            }
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />

          <Rating
            name="rating"
            size="large"
            css={styles.rating}
            defaultValue={movieReview.rating}
            precision={1}
            value={+movieReview.rating}
            onChange={(e) => {
              const result = (e.target as HTMLInputElement).value;
              setMovieReview({ ...movieReview, rating: +result });
            }}
          />
          <TextField
            id="review-title"
            type="text"
            label="Title"
            variant="outlined"
            name="title"
            placeholder="It blowed my mind"
            css={styles.formElement}
            value={movieReview.title}
            onChange={onChange}
            required
          />
          <TextField
            id="review-description"
            type="text"
            label="Description"
            variant="outlined"
            name="body"
            placeholder="This movie really made me think about..."
            css={styles.formElement}
            value={movieReview.body}
            onChange={onChange}
            multiline
            minRows={3}
          />
          <div css={styles.buttonWrapper}>
            <Button
              variant="outlined"
              onClick={() =>
                dispatch(reviewsActions.setShowcreateMovieReviewModal(false))
              }
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={onSubmit}
              type="submit"
              loading={false}
              loadingIndicator="Loading…"
              variant="outlined"
            >
              Send
            </LoadingButton>
          </div>
        </FormControl>
      </Box>
    </Modal>
  );
};

const styles = {
  box: css({
    margin: "30px 10px",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  }),
  title: css({
    padding: "10%",
  }),
  form: css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
  }),
  formElement: css({
    margin: "10px 0",
  }),
  rating: css({
    margin: "10px 0",
    alignSelf: "center",
  }),
  buttonWrapper: css({
    display: "flex",
    margin: "10px 0",
    justifyContent: "space-around",
  }),
};

export default createMovieReviewModal;
