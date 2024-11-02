import React, { Fragment, useContext, useEffect } from "react";
import BookContext from "../../context/book/bookContext";
import BookItem from "./BookItem";

const Books = () => {
  const bookContext = useContext(BookContext);

  const { books, filtered, getBooks, loading } = bookContext;

  useEffect(() => {
    getBooks();
  }, []);

  if (books !== null && books.length === 0 && !loading) {
    return <h4>Please add a book</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((book) => <BookItem key={book._id} book={book} />)
        : books && books.map((book) => <BookItem key={book._id} book={book} />)}
    </Fragment>
  );
};

export default Books;
