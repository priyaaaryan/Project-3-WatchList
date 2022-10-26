import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation($email: String!, $password: String!){
  login(email: $email, password: $password) {
    token
	user {
        _id
        username
      }
  }
}
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
//First we are declaring a mutation, in the mutation we will define the mutation that will receive the book information to save.
export const SAVE_BOOK = gql`
mutation saveBook($input: SaveBookInput) {
saveBook(input: $input) {
      _id
      username
      email
      savedBooks {
          bookId
          authors
          image
          description
          title
          link
      }
  }
}
`

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      password
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;
