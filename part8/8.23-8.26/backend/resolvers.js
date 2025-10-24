const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const Genre = require('./models/genre')
const User = require('./models/user')

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const genreFilter = args.genre || null
      const books = await Book.find({}).populate('author')
      if (!args.author){
        return genreFilter ? books.filter(book => book.genres.some(genre => genre === genreFilter)) : books
      } 
      return books.filter(book => book.author.name === args.author && (!genreFilter || book.genres.some(genre => genre === genreFilter)))
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => Genre.find({})
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = await Author.findOne({ name: args.author }) || { _id: null }
      if(!author._id){
        const newAuthor = new Author({ name: args.author, bookCount: 1 })
        await newAuthor.save()
          .catch(error => {
            throw new GraphQLError('Creating the author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          })
        author._id = newAuthor._id
      } else {
        author.bookCount = await Book.countDocuments({ author: author._id })
        await author.save()
      }
      await Genre.bulkWrite(args.genres.map(genre => 
        ({ updateOne: {
          filter: { name: genre },
          update: { $setOnInsert: { name: genre } },
          upsert: true
        }  
        })
      ))
      const book = new Book({ ...args, author: author._id })
      await book.save()
        .catch(error => {
          throw new GraphQLError('Creating the book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        })
      
      const fullBook = book.populate('author') 
      pubsub.publish('BOOK_ADDED', { bookAdded: fullBook })

      return fullBook
    },
    addGenre: async (root, { name }) => {
      const genre = new Genre({ name })
      await genre.save()
        .catch(error => {
          throw new GraphQLError('Creating the genre failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: name,
              error
            }
          })
        })
      return genre
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = await Author
        .findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { returnDocument: 'after' })
      if(!author) { 
        throw new GraphQLError('Could not find author', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          }
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers