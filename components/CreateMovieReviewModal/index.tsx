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
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch, reviewsActions, Review } from "../../redux";

type ModalProps = {
  open: boolean;
  onClose: () => {};
};

const initialMovieReviewValues: Review = {
  title: "",
  body: "",
  rating: 5,
  movieId: "",
  userReviewerId: "5f1e6707-7c3a-4acd-b11f-fd96096abd5a",
};

const createMovieReviewModal: FC<ModalProps> = ({
  open,
  onClose,
}: ModalProps) => {
  const dispatch = useAppDispatch();
  const [movieReview, setMovieReview] = useState(initialMovieReviewValues);
  useEffect(() => {
    // dispatch(reviewsActions.fetchAllMovies());
    // dispatch(reviewsActions.fetchCurrentUser());
  }, []);

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

  const movies: Array<Movie> = [
    {
      title: "Star Wars: A New Hope",
      id: "b8d93229-e02a-4060-9370-3e073ada86c3",
    },
    {
      title: "Rogue One: A Star Wars Story",
      id: "70351289-8756-4101-bf9a-37fc8c7a82cd",
    },
  ];

  const defaultProps = {
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
          <Autocomplete
            {...defaultProps}
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
    justifyContent: "space-around",
    height: "80%",
    width: "100%",
  }),
  buttonWrapper: css({
    display: "flex",
    justifyContent: "space-around",
  }),
};

export default createMovieReviewModal;
