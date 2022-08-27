import { css } from "@emotion/react";
import {
  Modal,
  Box,
  FormControl,
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

  interface Movie {
    title: string;
    id: string;
  }

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
      <Box css={styles.modal}>
        <h2 id="add-movie-review-modal-title">Add your review</h2>
        <FormControl fullWidth css={styles.form}>
          {movies?.length && <div>{movies[0].title}</div>}
          <Autocomplete
            {...autocompleteProps}
            autoComplete
            disablePortal
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
  modal: css({
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "1rem",
  }),
  form: css({
    display: "flex",
    flexDirection: "column",
    height: "80%",
    justifyContent: "space-around",
    width: "100%",
  }),
  buttonWrapper: css({
    display: "flex",
    justifyContent: "space-around",
  }),
};

export default createMovieReviewModal;
