import React, { useContext } from "react";
import PropTypes from "prop-types";
import BookContext from "../../context/book/bookContext";

const BookItem = ({ book }) => {
  const bookContext = useContext(BookContext);
  const { deleteBook, setCurrent, clearCurrent } = bookContext;

  const { _id, name, author, description, pages, dateStarted, dateFinished } =
    book;

  const onDelete = () => {
    deleteBook(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{name}</h3>
      <ul className="list">
        {author && <li>Author:{author}</li>}
        {description && <li>description:{description}</li>}
        {pages && <li>Pages:{pages}</li>}
        {dateStarted && <li>Date Started:{dateStarted}</li>}
        {dateFinished && <li>Date Finished:{dateFinished}</li>}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(book)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookItem;
