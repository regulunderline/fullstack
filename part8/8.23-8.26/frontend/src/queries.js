import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      id
      born
      bookCount
    }
    published
    genres
    id
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      id
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_GENRES = gql`
  query {
    allGenres {
      name
    }
  }
`

export const ALL_BOOKS_WITH_GENRE = gql`
  query allBooksWithGenre($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CHANGE_BIRTHYEAR = gql`
  mutation changeBirthear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`