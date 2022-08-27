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
        movieByMovieId {
          imgUrl
          movieDirectorId
          releaseDate
          title
        }
        userByUserReviewerId {
          id
          name
        }
      }
    }
  }
`;

export default ALL_MOVIE_REVIEWS;
