export interface ReviewsState {
  value: number;
  sideEffectCount: number;
  showcreateMovieReviewModal: boolean;
  createMovieReviewLoading: boolean;
  allMovieReviews: any;
  fetchData?: any;
}

export interface Review {
  rating: number;
  body?: string;
  title: string;
  movieId: string;
  userReviewerId: string;
}
