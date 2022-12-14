export interface ModalStep {
  open: boolean;
  review?: Review;
}

export interface ReviewsState {
  allMovieReviews: Array<Review>;
  movieReviewModalStatus: ModalStep;
  createMovieReviewLoading: boolean;
  user: User;
  error: boolean;
  movies: Array<Movie>;
}

export interface Review extends movieReviewPatch {
  nodeId?: string;
  id?: string;
  rating: number;
  body?: string;
  title: string;
  movieId: string;
  userReviewerId: string;
  movieByMovieId?: Movie;
  userByUserReviewerId?: User;
  movieReviewPatch?: movieReviewPatch;
}

export interface movieReviewPatch {
  rating: number;
  body?: string;
  title: string;
  movieId: string;
  userReviewerId: string;
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
