import { gql } from "@apollo/client";

const CREATE_MOVIE_REVIEW = gql`
  mutation ($input: CreateMovieReviewInput!) {
    createMovieReview(input: $input) {
      movieReview {
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

export default CREATE_MOVIE_REVIEW;
