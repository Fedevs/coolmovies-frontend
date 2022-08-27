export interface ReviewsState {
  allMovieReviews: Array<Review>;
  showcreateMovieReviewModal: boolean;
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
}

export interface User {
  id: string;
  name: string;
}

export interface Movie {
  id: string;
  imgUrl: string;
  movieDirectorId: string;
  releaseDate: string;
  title: string;
}
