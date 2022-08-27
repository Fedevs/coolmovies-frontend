import { gql } from "@apollo/client";

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      name
    }
  }
`;

export default CURRENT_USER;
