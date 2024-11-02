import React, { useContext, useState, useEffect } from "react";
import BookContext from "../../context/book/bookContext";

const BookForm = () => {
  const bookContext = useContext(BookContext);

  const { addBook, updateBook, current, clearCurrent } = bookContext;

  useEffect(() => {
    if (current !== null) {
      setBook(current);
    } else {
      setBook({
        name: "",
        author: "",
        description: "",
        pages: "",
        dateStarted: "",
        dateFinished: "",
      });
    }
  }, [bookContext, current]);

  const [book, setBook] = useState({
    name: "",
    author: "",
    description: "",
    pages: "",
    dateStarted: "",
    dateFinished: "",
  });

  const { name, author, description, pages, dateStarted, dateFinished } = book;

  const onChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      addBook(book);
    } else {
      updateBook(book);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Edit Book" : "Add Book"}</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={description}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Author"
        name="author"
        value={author}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Pages"
        name="pages"
        value={pages}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Date Started"
        name="dateStarted"
        value={dateStarted}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Date Finished"
        name="dateFinished"
        value={dateFinished ? dateFinished : ""}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value={current ? "Update Book" : "Add Book"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default BookForm;
