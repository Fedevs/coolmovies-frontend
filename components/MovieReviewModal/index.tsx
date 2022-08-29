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
} from "../../redux";
import { colors } from "../../styles/customStyles";

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
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setIsEdition(Boolean(reviewsState.movieReviewModalStatus.review));
    if (Boolean(reviewsState.movieReviewModalStatus.review)) {
      const {
        title,
        body = "",
        rating,
        movieId,
        userReviewerId,
      } = reviewsState.movieReviewModalStatus.review;
      setMovieReview({ title, body, rating, movieId, userReviewerId });
    }
  }, [reviewsState.movieReviewModalStatus.open]);

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
      setShowError(true);
    }
  };

  const getCreateOrEdit = () => {
    let dispatchAction, payload;
    if (isEdition) {
      dispatchAction = "updateMovieReview";
      payload = {
        nodeId: reviewsState.movieReviewModalStatus.review!.nodeId,
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
    setShowError(false);
    dispatch(reviewsActions.setMovieReviewModalStatus({ open: false }));
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
          {showError && (
            <Alert
              variant="filled"
              severity="error"
              closeText="close"
              role="alert"
              sx={{ paddingTop: 0, paddingBottom: 0, marginBottom: "15px" }}
            >
              Ups! Something's broken. Try again!
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
              inputProps={{ maxLength: 35 }}
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
                variant="contained"
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
    backgroundColor: `${colors.white}`,
    borderRadius: "30px 0px 30px 0px",
    boxShadow: `-1px 1px 10px ${colors.primary}`,
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    maxWidth: "480px",
    "@media(min-width: 480px)": {
      margin: "30px auto",
    },
  }),
  title: css({
    color: `${colors.primary}`,
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
