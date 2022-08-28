import { gql } from "@apollo/client";

const UPDATE_MOVIE_REVIEW = gql`
  mutation MyMutation($input: UpdateMovieReviewInput!) {
    updateMovieReview(input: $input) {
      movieReview {
        body
        id
        movieId
        rating
        title
        userReviewerId
      }
    }
  }
`;

/*
{
  "input": {
    "nodeId": "",
    "movieReviewPatch": {
      "id": "",
      "body":"",
      "movieId": "",
      "rating": "",
      "title": "",
      "userReviewerId": ""
    }
   }
} */

export default UPDATE_MOVIE_REVIEW;
