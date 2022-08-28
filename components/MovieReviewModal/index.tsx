import { css } from "@emotion/react";
import {
  Modal,
  Box,
  Alert,
  Typography,
  Rating,
  TextField,
  Button,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import {
  reviewsActions,
  useAppDispatch,
  Review,
  useAppSelector,
  Movie,
} from "../../redux";

type ModalProps = {
  open: boolean;
};

const initialMovieReviewValues: Review = {
  title: "",
  body: "",
  rating: 5,
  movieId: "",
  userReviewerId: "",
};

const MovieReviewModal: FC<ModalProps> = ({ open }: ModalProps) => {
  const dispatch = useAppDispatch();
  const reviewsState = useAppSelector((state) => state.reviews);
  const [movieReview, setMovieReview] = useState(initialMovieReviewValues);
  const [isEdition, setIsEdition] = useState(false);

  useEffect(() => {
    setIsEdition(Boolean(reviewsState.showMovieReviewModal.review));
    if (Boolean(reviewsState.showMovieReviewModal.review)) {
      const {
        title,
        body = "",
        rating,
        movieId,
        userReviewerId,
      } = reviewsState.showMovieReviewModal.review;
      setMovieReview({ title, body, rating, movieId, userReviewerId });
    }
  }, [reviewsState.showMovieReviewModal.open]);

  const onChange = (
    event:
      | SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ): void => {
    const { name, value } = event.target as HTMLInputElement;
    setMovieReview({ ...movieReview, [name]: value });
  };

  const onSubmit = async () => {
    const { action, payloadReview } = getCreateOrEdit();
    const { payload } = await dispatch(reviewsActions[action](payloadReview));
    if (Object.keys(payload).length) {
      closeModal();
    } else {
      console.log("error");
    }
  };

  const getCreateOrEdit = () => {
    let dispatchAction, payload;
    if (isEdition) {
      dispatchAction = "updateMovieReview";
      payload = {
        nodeId: reviewsState.showMovieReviewModal.review.nodeId,
        movieReviewPatch: { ...movieReview },
      };
    } else {
      dispatchAction = "createMovieReview";
      payload = movieReview;
    }

    return { action: dispatchAction, payloadReview: payload };
  };

  const onClose = () => {
    closeModal();
  };

  const closeModal = () => {
    resetForm();
    dispatch(reviewsActions.setShowMovieReviewModal({ open: false }));
  };

  const resetForm = () => {
    setMovieReview(initialMovieReviewValues);
  };

  const formError: boolean = false; //take it from state later
  return (
    <Modal
      open={open}
      onClose={onClose}
      css={{ overflow: "scroll" }}
      aria-labelledby="add-movie-review-modal-title"
      aria-describedby="add-movie-review-modal-description"
    >
      <Box css={styles.box}>
        <Typography variant={"h5"} css={styles.title}>
          <b>{isEdition ? "Edit your review 🖊️​" : "Rate the movie 🎬​"}</b>
        </Typography>
        <form onSubmit={onSubmit} css={styles.form}>
          {formError && (
            <Alert
              variant="filled"
              severity="error"
              closeText="close"
              role="alert"
              sx={{ paddingTop: 0, paddingBottom: 0 }}
            >
              Ups! Something's broken, try again!
            </Alert>
          )}
          <Grid container css={styles.formGrid}>
            <FormControl fullWidth>
              <InputLabel id="select-movie-label">Movie</InputLabel>
              <Select
                labelId="select-movie-label"
                id="select-movie-labelt"
                value={movieReview.movieId}
                label="Movie"
                name="movieId"
                onChange={onChange}
                required
              >
                {reviewsState.movies.map((movie) => {
                  return (
                    <MenuItem key={movie.id} value={movie.id}>
                      {movie.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                loading={false}
                loadingIndicator="Loading…"
                variant="outlined"
              >
                Send
              </LoadingButton>
            </div>
          </Grid>
        </form>
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
    width: "100%",
  }),
  formGrid: css({
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

export default MovieReviewModal;
