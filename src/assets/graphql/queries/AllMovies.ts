import { gql } from "@apollo/client";

const ALL_MOVIES = gql`
  query AllMovieReviews {
    allMovies {
      nodes {
        id
        imgUrl
        title
      }
    }
  }
`;

export default ALL_MOVIES;
