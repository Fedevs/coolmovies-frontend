type Step = "create" | "edit";

export interface ModalStep {
  open: boolean;
  step?: Step;
}

export interface ReviewsState {
  allMovieReviews: Array<Review>;
  showcreateMovieReviewModal: ModalStep;
  createMovieReviewLoading: boolean;
  user: User;
  movies: Array<Movie>;
}

export interface Review {
  id?: string;
  rating: number;
  body?: string;
  title: string;
  movieId: string;
  userReviewerId: string;
  movieByMovieId?: Movie;
  userByUserReviewerId?: User;
}

export interface User {
  id: string;
  name: string;
}

export interface Movie {
  id: string;
  imgUrl: string;
  title: string;
}
