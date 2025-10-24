import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ME, BOOK_ADDED, ALL_BOOKS_WITH_GENRE } from './queries'
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Birthyear from './components/Birthyear'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

export const updateCache = (cache, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  addedBook.genres.concat(null).map(genre => {
    const result = cache.readQuery({
      query: ALL_BOOKS_WITH_GENRE,
      variables: { genre }
    })
    result && cache.writeQuery({
      query: ALL_BOOKS_WITH_GENRE,
      data: { allBooks: uniqByTitle(result.allBooks.concat(addedBook))},
      variables: { genre }
    })
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors");
  const result = useQuery(ALL_AUTHORS)
  const meResult = useQuery(ME)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded
      window.alert(`${bookAdded.title} by ${bookAdded.author.name} added`)
      updateCache(client.cache, bookAdded)
    }
  })

  if (result.loading || meResult.loading )  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  const me=meResult.data.me

  const handleLogout = () => {
    setToken(null)
    setPage("login")
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token 
          ? <>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={() => setPage("recommend")}>recommend</button>
              <button onClick={handleLogout}>logout</button>
            </>
          : <button onClick={() => setPage("login")}>login</button>
        }
      </div>

      <Authors authors={authors} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      {me && <Recommendations show={page === "recommend"} genre={me.favoriteGenre} />}

      <LoginForm show={page === "login"} setToken={setToken} setPage={setPage}/>

      {token && <Birthyear authors={authors} show={page === "authors"} />}
    </div>
  );
};

export default App;
