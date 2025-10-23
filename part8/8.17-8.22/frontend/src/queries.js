import { gql } from '@apollo/client'

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
  }
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
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      genres
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
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
  }
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