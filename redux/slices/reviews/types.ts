export interface ReviewsState {
  value: number;
  sideEffectCount: number;
  showcreateMovieReviewModal: boolean;
  createMovieReviewLoading: boolean;
  allMovieReviews: Array<Review>;
  user: User;
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
