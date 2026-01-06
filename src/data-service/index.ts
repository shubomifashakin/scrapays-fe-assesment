import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      description
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($name: String!, $description: String!) {
    createBook(createBookInput: { name: $name, description: $description }) {
      name
      id
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($name: String!, $description: String!, $id: Int!) {
    updateBook(
      updateBookInput: { name: $name, description: $description, id: $id }
    ) {
      name
      id
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: Int!) {
    deleteBook(id: $id) {
      id
    }
  }
`;
