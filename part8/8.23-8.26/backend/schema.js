const typeDefs = `
type Author {
  name: String!
  id: ID!
  born: Int
  bookCount: Int
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Genre {
  name: String!
}

type Query {
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
  allGenres: [Genre!]!
  me: User
}

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book
  addGenre(
    name: String!
  ): Genre
  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}

type Subscription {
  bookAdded: Book!
}    
`
module.exports = typeDefs