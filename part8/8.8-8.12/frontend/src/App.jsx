import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './queries'
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Birthyear from './components/Birthyear'

const App = () => {
  const [page, setPage] = useState("authors");
  const result = useQuery(ALL_AUTHORS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors authors={authors} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Birthyear authors={authors} show={page === "authors"} />
    </div>
  );
};

export default App;
