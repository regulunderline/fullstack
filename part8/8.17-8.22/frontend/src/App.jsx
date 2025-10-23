import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ME } from './queries'
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Birthyear from './components/Birthyear'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors");
  const result = useQuery(ALL_AUTHORS)
  const meResult = useQuery(ME)
  const client = useApolloClient()

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
