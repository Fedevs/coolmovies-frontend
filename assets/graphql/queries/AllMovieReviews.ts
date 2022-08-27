import { gql } from "@apollo/client";

const ALL_MOVIE_REVIEWS = gql`
  query AllMovieReviews {
    allMovieReviews {
      nodes {
        id
        rating
        body
        title
        movieId
        nodeId
        userReviewerId
      }
    }
  }
`;

export default ALL_MOVIE_REVIEWS;
