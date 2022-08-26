import {
  Modal,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, reviewsActions } from "/redux";

type ModalProps = {
  open: boolean;
  onClose: () => {};
  styles: object;
};

const initialMovieReviewValues = {
  title: "",
  body: "",
  rating: 0,
  movieId: "",
  userReviewerId: "",
};

const AddMovieReviewModal: FC<ModalProps> = ({
  open,
  onClose,
  styles,
}: ModalProps) => {
  const dispatch = useAppDispatch();
  const [movieReview, setMovieReview] = useState(initialMovieReviewValues);
  useEffect(() => {
    console.log(movieReview);
    // dispatch(reviewsActions.fetchAllMovies());
  }, []);

  const onMovieChange = (e: SelectChangeEvent<string>): void => {
    setMovieReview({ ...movieReview, movieId: e.target.value });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-movie-review-modal-title"
      aria-describedby="add-movie-review-modal-description"
    >
      <Box sx={styles}>
        <h2 id="add-movie-review-modal-title">Add a review</h2>
        <p id="add-movie-review-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
        {movieReview.movieId}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={movieReview.movieId}
            label="Age"
            onChange={onMovieChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default AddMovieReviewModal;
